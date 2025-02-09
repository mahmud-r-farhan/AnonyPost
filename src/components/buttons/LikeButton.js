import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

function LikeButton({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    
    try {
      const response = await axios.post(`/api/posts/${post._id}/like`);
      setLikes(response.data.likes);
      toast.success('Post liked!');
    } catch (error) {
      toast.error('Failed to like post');
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <button 
      onClick={handleLike} 
      disabled={isLiking}
      className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
      </svg>
      <span>{likes}</span>
    </button>
  );
}

export default LikeButton;
