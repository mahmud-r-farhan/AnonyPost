import { Link } from 'react-router-dom';

function CommentButton({ post }) {
  return (
    <Link 
      to={`/post/${post._id}`}
      className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
          clipRule="evenodd"
        />
      </svg>
      <span>{post.comments?.length || 0}</span>
    </Link>
  );
}

export default CommentButton;
