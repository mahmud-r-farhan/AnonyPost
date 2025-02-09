import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Info, HelpCircle, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/support', icon: HelpCircle, label: 'Support' },
    { path: '/about', icon: Info, label: 'About' },
  
  ];

  return (
    <div className={`fixed left-0 top-16 h-screen bg-white dark:bg-gray-800
       transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    } ${isMobile ? 'hidden lg:flex' : 'flex'} flex-col`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-5 bg-white dark:bg-gray-800 border border-gray-200 
          dark:border-gray-700 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={25} />}
      </button>
      
      <nav className="space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;
