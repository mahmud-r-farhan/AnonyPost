import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Heart, Reply, MoreVertical } from 'lucide-react';
import CommentForm from './CommentForm';
import { toast } from 'sonner';
import { useAvatar } from '../contexts/AvatarContext';

function Comment({ comment, postId, onCommentAdded, depth = 0 }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes || 0);
  const { username } = useAvatar();

  useEffect(() => {
    // Check if the current user has liked the comment
    setIsLiked(comment.likedBy?.includes(username));
    setLikesCount(comment.likes || 0);
  }, [comment.likedBy, comment.likes, username]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/posts/${postId}/comments/${comment._id}/like`, {
        username
      });
      
      setIsLiked(response.data.liked);
      setLikesCount(response.data.likes);
      
      // Update the comment's likedBy array
      comment.likedBy = response.data.likedBy;
      comment.likes = response.data.likes;
    } catch (error) {
      console.error('Error liking comment:', error);
      toast.error('Failed to like comment');
    }
  };

  const handleReplySubmit = (newReply) => {
    onCommentAdded({
      ...newReply,
      parentId: comment._id
    });
    setShowReplyForm(false);
  };

  return (
    <div className={`pl-4 border-l-2 border-gray-200 dark:border-gray-700 my-4 ${depth > 0 ? 'ml-4' : ''}`}>
      <div className="flex items-start space-x-3">
        <img
          src={comment.profilePicture}
          alt={comment.author}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{comment.author}</h4>
                <p className="text-sm text-gray-500">
                  {format(new Date(comment.createdAt), 'PPp')}
                </p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={16} />
              </button>
            </div>
            <p className="mt-2">{comment.content}</p>
          </div>

          <div className="flex items-center space-x-4 mt-2">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 text-sm ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              <span>{likesCount}</span>
            </button>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500"
            >
              <Reply size={16} />
              <span>Reply</span>
            </button>
          </div>

          {showReplyForm && depth < 3 && (
            <div className="mt-3">
              <CommentForm
                postId={postId}
                parentId={comment._id}
                onCommentAdded={handleReplySubmit}
                onCancel={() => setShowReplyForm(false)}
              />
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <Comment
                  key={reply._id}
                  comment={reply}
                  postId={postId}
                  onCommentAdded={onCommentAdded}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
