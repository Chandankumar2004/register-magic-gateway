
import React, { useEffect, useState } from 'react';
import { CheckCircle2, Circle, PenLine } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { getResume, hasUploadedResume } from '@/utils/resumeUtils';

const ProfileCompletion = () => {
  const [steps, setSteps] = useState([
    { name: 'Basic Info', completed: false },
    { name: 'Profile Photo', completed: false },
    { name: 'Resume', completed: false },
    { name: 'Education', completed: false },
    { name: 'Location', completed: false },
  ]);
  
  const [completionPercentage, setCompletionPercentage] = useState(0);
  
  useEffect(() => {
    // Check for profile data in localStorage
    const userProfile = localStorage.getItem('userProfile');
    const profilePhoto = localStorage.getItem('userProfilePhoto');
    const hasResume = hasUploadedResume();
    
    const updatedSteps = [...steps];
    
    // Check Basic Info
    if (userProfile) {
      const profileData = JSON.parse(userProfile);
      updatedSteps[0].completed = !!(profileData.fullName && profileData.title);
      
      // Check Education
      updatedSteps[3].completed = !!(profileData.education && profileData.graduationYear);
      
      // Check Location
      updatedSteps[4].completed = !!profileData.location;
    }
    
    // Check Profile Photo
    updatedSteps[1].completed = !!profilePhoto;
    
    // Check Resume
    updatedSteps[2].completed = hasResume;
    
    // Calculate completion percentage
    const completedSteps = updatedSteps.filter(step => step.completed).length;
    const percentage = Math.round((completedSteps / updatedSteps.length) * 100);
    
    setSteps(updatedSteps);
    setCompletionPercentage(percentage);
  }, []);

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 w-full max-w-xs transform hover:-translate-y-2 hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-br hover:from-white hover:to-blue-50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Profile Completion</h2>
        <Link to="/dashboard/profile">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-all hover:scale-110"
          >
            <PenLine className="h-4 w-4" />
            <span className="sr-only">Edit Profile</span>
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Progress value={completionPercentage} className="h-2 bg-gray-100" />
        <span className="text-sm font-medium text-blue-600">{completionPercentage}%</span>
      </div>
      <ul className="space-y-2">
        {steps.map((step, index) => (
          <li key={index} className="flex items-center text-sm">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center hover:bg-gray-50 p-1 rounded-md w-full cursor-pointer transition-colors hover:translate-x-1">
                  {step.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-300 mr-2" />
                  )}
                  <span className={step.completed ? 'text-gray-800 font-medium' : 'text-gray-500'}>
                    {step.name}
                  </span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 shadow-lg animate-in fade-in-50 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">{step.name}</h4>
                  <p className="text-sm text-gray-500">
                    {step.completed 
                      ? `Your ${step.name.toLowerCase()} is complete.` 
                      : `Complete your ${step.name.toLowerCase()} to improve your profile.`}
                  </p>
                  <Link to="/dashboard/profile">
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {step.completed ? 'Edit' : 'Complete'} {step.name}
                    </Button>
                  </Link>
                </div>
              </HoverCardContent>
            </HoverCard>
          </li>
        ))}
      </ul>
      
      {completionPercentage === 100 ? (
        <div className="mt-4 bg-green-50 text-green-700 rounded-md p-3 text-sm flex items-center">
          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
          Your profile is complete!
        </div>
      ) : (
        <Link to="/dashboard/profile" className="inline-block w-full mt-4">
          <Button 
            variant="outline" 
            className="w-full justify-center hover:bg-blue-50 hover:text-blue-700 hover:scale-105 transition-transform"
          >
            Complete Your Profile
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProfileCompletion;
