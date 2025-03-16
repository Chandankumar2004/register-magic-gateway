
import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookText, Briefcase, User, Menu, X, BriefcaseIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getUserByUsername } from '@/utils/storage';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: 'Blog', path: '/dashboard/blog', icon: BookText },
    { name: 'Jobs', path: '/dashboard/jobs', icon: Briefcase },
    { name: 'My Jobs', path: '/dashboard/my-jobs', icon: BriefcaseIcon },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];
  
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
      {/* Enhanced background with gradient and overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069')] bg-cover opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/80"></div>
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Sidebar - desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col fixed inset-y-0 z-10">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white/80 backdrop-blur-md pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-blue-600">KodJobs</h1>
          </div>
          
          {userName && (
            <div className="px-4 mt-2">
              <p className="text-sm text-gray-600">Welcome, <span className="font-medium text-blue-600">{userName}</span>!</p>
            </div>
          )}
          
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    location.pathname === item.path 
                      ? "bg-blue-100 text-blue-600" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className={cn(
                    "mr-3 h-5 w-5 transition-colors", 
                    location.pathname === item.path 
                      ? "text-blue-500" 
                      : "text-gray-400 group-hover:text-gray-500"
                  )} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">KodJobs</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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
              <h1 className="text-xl font-bold text-blue-600">KodJobs</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            {userName && (
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm text-gray-600">Welcome, <span className="font-medium text-blue-600">{userName}</span>!</p>
              </div>
            )}
            
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors",
                    location.pathname === item.path 
                      ? "bg-blue-100 text-blue-600" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className={cn(
                    "mr-3 h-5 w-5 transition-colors", 
                    location.pathname === item.path 
                      ? "text-blue-500" 
                      : "text-gray-400 group-hover:text-gray-500"
                  )} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

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
