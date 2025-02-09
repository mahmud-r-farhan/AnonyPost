import { useState } from 'react';
import { toast } from 'sonner';
import { MessageCircle } from 'lucide-react';
import { useAvatar } from '../contexts/AvatarContext';
import axios from 'axios';

function CommentForm({ postId, parentId = null, onCommentAdded, onCancel }) {
  const [comment, setComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { userAvatar, username, updateUsername } = useAvatar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const loadingToast = toast.loading(parentId ? 'Adding reply...' : 'Adding comment...');
    try {
      const response = await axios.post(`/api/posts/${postId}/comments`, {
        content: comment,
        author: username,
        profilePicture: userAvatar,
        parentId
      });

      onCommentAdded(response.data);
      setComment('');
      setIsExpanded(false);
      if (onCancel) onCancel();
      
      toast.success(parentId ? 'Reply added!' : 'Comment added!');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 transition-all duration-300">
      {!isExpanded ? (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors"
        >
          <MessageCircle size={20} />
          <span>{parentId ? 'Add a reply' : 'Add a comment'}</span>
        </button>
      ) : (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center space-x-4">
            <img src={userAvatar} alt="Profile" className="w-10 h-10 rounded-full ring-2 ring-primary/20" />
            <input
              type="text"
              value={username}
              onChange={(e) => updateUsername(e.target.value)}
              placeholder="Your name (optional)"
              className="flex-1 max-w-40 px-4 py-2 rounded-full text-black border border-gray-200 dark:border-gray-700 
                focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={parentId ? "Write a reply..." : "Write a comment..."}
            className="w-full px-4 py-2 rounded-lg text-black border border-gray-200 dark:border-gray-700 
              focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows="3"
          />
          
          <div className="flex justify-end space-x-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-full text-gray-500 hover:bg-gray-100 
                  dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={!comment.trim()}
              className="px-6 py-2 rounded-full bg-primary text-white hover:bg-primary-hover 
                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {parentId ? 'Reply' : 'Comment'}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default CommentForm;
