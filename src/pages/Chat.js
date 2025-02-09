import { MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';

function Chat() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
       <SEO 
          title="Anonymous Chat"
          image="https://res.cloudinary.com/dydnhyxfh/image/upload/v1739117288/image-xy0NfBckGfEhTIDHu8UWn_xgr7r1.webp"
          description="Browse anonymous posts and share your thoughts freely." 
      />
      <div className="animate-bounce mb-4">
        <MessageSquare size={48} className="text-primary" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Anonymous Chat Coming Soon!</h1>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
        We're working on a secure, anonymous chat feature. Stay tuned for updates!
      </p>
      <div className="mt-8 relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-12 w-12 rounded-full bg-primary/10"></div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
