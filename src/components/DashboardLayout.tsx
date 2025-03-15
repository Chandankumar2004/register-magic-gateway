
import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, BookText, Briefcase, DollarSign, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DashboardLayout = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: 'Blog', path: '/dashboard/blog', icon: BookText },
    { name: 'Jobs', path: '/dashboard/jobs', icon: Briefcase },
    { name: 'Pricing', path: '/dashboard/pricing', icon: DollarSign },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col fixed inset-y-0">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-blue-600">Dashboard</h1>
          </div>
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
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">Dashboard</h1>
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
              <h1 className="text-xl font-bold text-blue-600">Dashboard</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
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
      <div className="md:ml-64 flex-1 flex flex-col">
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
