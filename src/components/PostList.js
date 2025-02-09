import { Link } from "react-router-dom";
import { format } from "date-fns";
import { getRandomAvatar } from "../utils/avatarUtils";
import { getOptimizedImageUrl } from "../utils/cloudinaryConfig";
import LikeButton from "./buttons/LikeButton";
import CommentButton from "./buttons/CommentButton";

function PostList({ posts }) {
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="max-w-2xl mx-auto grid gap-6 p-4">
      {sortedPosts.map((post) => (
        <div
          key={post._id}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div className="p-5">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={post.profilePicture || getRandomAvatar(post.author + post._id)}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-primary/30 shadow-sm"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {post.author}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(post.createdAt), "PPP")}
                </p>
              </div>
            </div>
            
            <p className="mb-4 text-gray-800 dark:text-gray-300 text-lg leading-relaxed">
              {post.content}
            </p>
            
            {post.image && (
              <div className="relative w-full h-60 rounded-lg overflow-hidden mb-4">
                <img
                  src={getOptimizedImageUrl(post.image)}
                  alt="Post content"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-4">
                <LikeButton post={post} />
                <CommentButton post={post} />
              </div>
              <Link
                to={`/post/${post._id}`}
                className="text-primary hover:underline text-sm font-medium"
              >
                View Details →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;