import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import {ImageIcon, XIcon, LoaderIcon } from 'lucide-react';

function PostForm({ onNewPost }) {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const fileInputRef = useRef(null);

  const validateContent = (text) => {
    if (text.length > 500) {
      return { isValid: false, reason: "Content must be less than 500 characters" };
    }
    if (text.trim().length === 0) {
      return { isValid: false, reason: "Content cannot be empty" };
    }
    return { isValid: true, reason: "" };
  };

  useEffect(() => {
    if (content.trim()) {
      const validation = validateContent(content);
      setIsValid(validation.isValid);
      setValidationMessage(validation.reason);
    }
  }, [content]);

  useEffect(() => {
    const fetchAvatar = async () => {
      const avatar = createAvatar(lorelei, {
        seed: Math.random().toString(),
        size: 128,
      });
      const uri = await avatar.toDataUri();
      setProfilePicture(uri);
    };
    fetchAvatar();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("content", content);
    formData.append("author", author || "Anonymous");
    formData.append("profilePicture", profilePicture);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post("/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      onNewPost({ ...response.data, profilePicture });
      setContent("");
      setAuthor("");
      setImage(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.success("Post created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-slide-up glass-effect p-6 rounded-xl shadow-glow hover:shadow-lg transition-all duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={profilePicture}
          alt="Profile"
          className="w-12 h-12 rounded-full ring-2 ring-primary/20"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Anonymous"
          className="flex-1 p-2 bg-transparent border-b-2 border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
        />
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts anonymously..."
        className="w-full p-4 rounded-xl resize-none bg-white/5 dark:bg-gray-800/5 
          border border-gray-200 dark:border-gray-700
          focus:ring-2 focus:ring-primary focus:border-transparent
          placeholder-gray-400 dark:placeholder-gray-500
          text-gray-800 dark:text-gray-100"
        rows="4"
      />

      <div className="flex flex-wrap items-center gap-4 mt-4">
        <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 
          text-primary cursor-pointer hover:bg-primary/20">
          <ImageIcon className="w-5 h-5" />
          <span>Add Image</span>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
          />
        </label>

        <button
          type="submit"
          disabled={isLoading || !isValid || !content.trim()}
          className="ml-auto px-4 py-2 bg-gradient-to-r from-primary to-primary-hover 
            text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed 
            flex items-center gap-1 transition-all duration-300 transform hover:scale-101"
        >
          {isLoading && <LoaderIcon className="w-5 h-5 animate-spin" />}
          <span>{isLoading ? "Creating..." : "Post Anonymously"}</span>
        </button>
      </div>

      {!isValid && (
        <div className="mt-2 text-red-500 text-sm">
          {validationMessage}
        </div>
      )}

      {preview && (
        <div className="relative mt-4">
          <img 
            src={preview} 
            alt="Preview" 
            className="max-h-96 w-full object-cover rounded-lg" 
          />
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              setImage(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            aria-label="Remove image"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </form>
  );
}

export default PostForm;

