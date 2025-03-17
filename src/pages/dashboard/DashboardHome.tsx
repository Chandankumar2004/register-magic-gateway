
import React from 'react';
import { ArrowRightCircle, ArrowLeftCircle, UploadCloud, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import ProfileCompletion from '@/components/ProfileCompletion';
import { toast } from 'sonner';
import { hasUploadedResume } from '@/utils/resumeUtils';

const DashboardHome = () => {
  const navigate = useNavigate();
  
  const getUserName = () => {
    const users = localStorage.getItem('registered_users');
    if (users) {
      const parsedUsers = JSON.parse(users);
      if (parsedUsers.length > 0) {
        return parsedUsers[0].fullName || parsedUsers[0].username;
      }
    }
    return 'User';
  };

  const handleReturnToSignup = () => {
    navigate('/');
  };
  
  const handleUploadResume = () => {
    navigate('/dashboard/profile');
    toast.info('Let\'s upload your resume!', {
      description: 'Complete your profile by uploading a resume.',
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent transform hover:scale-105 transition-all">Welcome, {getUserName()}</h1>
        <Button 
          variant="outline" 
          onClick={handleReturnToSignup}
          className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-md"
        >
          <ArrowLeftCircle className="h-4 w-4" />
          Return to Signup
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white/90 shadow-lg rounded-lg p-6 border border-gray-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer hover:bg-blue-50 backdrop-blur-sm">
          <h2 className="text-lg font-medium mb-2 text-blue-600">Dashboard</h2>
          <p className="text-gray-600 mb-4">
            Welcome to your dashboard. Here you can manage your profile, view available jobs, read blog posts, and more.
          </p>
          <div className="flex flex-col space-y-3">
            <Link to="/dashboard/jobs">
              <Button 
                variant="3d" 
                className="w-full justify-between mt-1 group"
              >
                Browse Jobs
                <ArrowRightCircle className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            {!hasUploadedResume() && (
              <Button 
                variant="outline" 
                className="w-full justify-between group hover:bg-blue-50 border-blue-100"
                onClick={handleUploadResume}
              >
                Upload Your Resume
                <UploadCloud className="transition-transform group-hover:translate-y-[-2px]" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="bg-white/90 shadow-lg rounded-lg p-6 border border-gray-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer hover:bg-blue-50 backdrop-blur-sm">
          <h2 className="text-lg font-medium mb-2 text-blue-600">Recent Jobs</h2>
          <p className="text-gray-600 mb-4">
            Check out the latest job postings tailored to your qualifications.
          </p>
          <Link to="/dashboard/jobs">
            <Button 
              variant="outline" 
              className="w-full justify-between mt-2 group hover:bg-blue-50 hover:shadow-md transform transition-all"
            >
              View Latest Jobs
              <ArrowRightCircle className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <ProfileCompletion />
      </div>
    </div>
  );
};

export default DashboardHome;
