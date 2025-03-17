
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookText, Briefcase, User, BriefcaseIcon, LogOut } from 'lucide-react';
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
              ? "bg-blue-100 text-blue-600 shadow-md" 
              : "text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600"
          )}
          onClick={onMobileClose}
        >
          <item.icon className={cn(
            "mr-3 h-5 w-5 transition-colors", 
            location.pathname === item.path 
              ? "text-blue-500" 
              : "text-gray-400 group-hover:text-blue-500"
          )} />
          {item.name}
        </Link>
      ))}
      
      {/* Logout button */}
      <button
        onClick={onLogout}
        className="group flex w-full items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      >
        <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
        Logout
      </button>
    </nav>
  );
};

export default SidebarNavigation;
