
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BackgroundEffect from './dashboard/BackgroundEffect';
import DesktopSidebar from './dashboard/DesktopSidebar';
import MobileSidebar from './dashboard/MobileSidebar';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  
  const handleLogout = () => {
    // Simple logout functionality - redirect to home
    navigate('/');
  };
  
  useEffect(() => {
    // Get all stored users and find the first one as the logged in user
    // This is a simplified approach since we don't have real auth
    const users = localStorage.getItem('registered_users');
    if (users) {
      const parsedUsers = JSON.parse(users);
      if (parsedUsers.length > 0) {
        setUserName(parsedUsers[0].fullName || parsedUsers[0].username);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Background effects */}
      <BackgroundEffect />

      {/* Desktop sidebar */}
      <DesktopSidebar userName={userName} onLogout={handleLogout} />

      {/* Mobile navigation */}
      <MobileSidebar 
        userName={userName} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <div className="md:ml-64 flex-1 flex flex-col z-10">
        <main className="flex-1 pt-16 md:pt-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
