import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { format } from "date-fns"
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';
import SEO from '../components/SEO';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';
import Loading from '../components/LoadingSpinner'

function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState("")

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    getPost();
  }, [id]); // Added id as dependency

  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/posts/${id}/like`)
      setPost(response.data)
    } catch (error) {
      console.error("Error liking post:", error)
    }
  }

  const handleCommentAdded = (newComment) => {
    setPost(prev => {
      const updatedPost = { ...prev };
      if (newComment.parentId) {
        // Find parent comment and add reply
        const parentComment = updatedPost.comments.find(c => c._id === newComment.parentId);
        if (parentComment) {
          if (!parentComment.replies) parentComment.replies = [];
          parentComment.replies.push(newComment);
        }
      } else {
        // Add as top-level comment
        updatedPost.comments.push(newComment);
      }
      return updatedPost;
    });
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Post by ${post.author}`,
          text: post.content,
          url: window.location.href,
        });
        toast.success("Post shared successfully!");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        toast.error("Failed to share post");
      }
    }
  };

  if (!post) {
    return <Loading />;
  }

  return (
    <>
      <SEO 
        title={post ? `Post by ${post.author}` : "Post Details"}
        description={post?.content?.slice(0, 160)}
        image={post?.image}
        type="article"
        author={post?.author}
        url={window.location.href}
      />
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <img src={post.profilePicture || "/placeholder.svg"} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
          <div>
            <h3 className="font-bold">{post.author}</h3>
            <p className="text-sm text-gray-500">{format(new Date(post.createdAt), "PPP")}</p>
          </div>
        </div>
        <p className="mb-4">{post.content}</p>
        {post.image && (
          <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-auto rounded-lg mb-4" />
        )}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button onClick={handleLike} className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <span>{post.likes}</span>
            </button>

            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clipRule="evenodd"
              />
            </svg>
            <span>{post.comments.length}</span>
          </button>
          </div>
          <button onClick={handleShare} className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
        </div>

        <div className="mt-8">
          <CommentForm postId={id} onCommentAdded={handleCommentAdded} />
        </div>

        <div className="space-y-4 mt-6">
          {post.comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              postId={id}
              onCommentAdded={handleCommentAdded}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default PostDetail