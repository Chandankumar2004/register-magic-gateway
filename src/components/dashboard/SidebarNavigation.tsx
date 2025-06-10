
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookText, Briefcase, User, BriefcaseIcon, LogOut, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarNavigationProps {
  onMobileClose?: () => void;
  onLogout: () => void;
}

const SidebarNavigation = ({ onMobileClose, onLogout }: SidebarNavigationProps) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: 'Blog', path: '/dashboard/blog', icon: BookText },
    { name: 'Jobs', path: '/dashboard/jobs', icon: Briefcase },
    { name: 'My Jobs', path: '/dashboard/my-jobs', icon: BriefcaseIcon },
    { name: 'AI Job Assistant', path: '/dashboard/ai-assistant', icon: Bot },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  return (
    <nav className="flex-1 px-2 space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={cn(
            "group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg transform",
            location.pathname === item.path 
              ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shadow-md" 
              : "text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50 hover:text-blue-600 dark:hover:text-blue-400"
          )}
          onClick={onMobileClose}
        >
          <item.icon className={cn(
            "mr-3 h-5 w-5 transition-colors", 
            location.pathname === item.path 
              ? "text-blue-500 dark:text-blue-400" 
              : "text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400"
          )} />
          {item.name}
        </Link>
      ))}
      
      {/* Logout button */}
      <button
        onClick={onLogout}
        className="group flex w-full items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      >
        <LogOut className="mr-3 h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-red-500 dark:group-hover:text-red-400" />
        Logout
      </button>
    </nav>
  );
};

export default SidebarNavigation;
