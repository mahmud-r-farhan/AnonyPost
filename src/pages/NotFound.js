import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center space-y-6 p-6">
        <SEO title="404: Page Not Found" 
              image="https://res.cloudinary.com/dydnhyxfh/image/upload/v1739117782/image-lJgSfreN4NNa-FpQNAVhD_adupey.webp"
              description="Oops! The page you're looking for doesn't exist or has been moved."
        />
        <h1 className="text-7xl font-extrabold text-gray-800 dark:text-gray-200 animate-bounce">
          404
        </h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400">
          Oops! Page not found 🚀
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
