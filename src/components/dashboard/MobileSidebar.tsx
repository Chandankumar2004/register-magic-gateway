
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserProfileCard from './UserProfileCard';
import SidebarNavigation from './SidebarNavigation';

interface MobileSidebarProps {
  userName: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onLogout: () => void;
}

const MobileSidebar = ({ 
  userName, 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  onLogout 
}: MobileSidebarProps) => {
  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 py-2 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">KodJobs</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="hover:scale-110 transition-transform"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-600 bg-opacity-75">
          <div className="fixed inset-y-0 left-0 flex flex-col w-full max-w-xs bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">KodJobs</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="hover:scale-110 transition-transform"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            {userName && <UserProfileCard userName={userName} variant="mobile" />}
            
            <SidebarNavigation 
              onMobileClose={() => setMobileMenuOpen(false)} 
              onLogout={onLogout} 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSidebar;
