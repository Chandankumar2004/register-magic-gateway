
import React from 'react';
import UserProfileCard from './UserProfileCard';
import SidebarNavigation from './SidebarNavigation';

interface DesktopSidebarProps {
  userName: string;
  onLogout: () => void;
}

const DesktopSidebar = ({ userName, onLogout }: DesktopSidebarProps) => {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col fixed inset-y-0 z-10">
      <div className="flex flex-col flex-grow border-r border-gray-200 bg-white/80 backdrop-blur-md pt-5 pb-4 overflow-y-auto shadow-xl">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent hover:-translate-y-2 transition-all duration-300 transform hover:scale-110 cursor-pointer">
            KodJobs
          </h1>
        </div>
        
        {userName && <UserProfileCard userName={userName} />}
        
        <div className="mt-6 flex-grow flex flex-col">
          <SidebarNavigation onLogout={onLogout} />
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
