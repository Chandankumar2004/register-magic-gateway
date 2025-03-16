
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
    <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 w-full max-w-xs backdrop-blur-sm bg-white/80 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium text-blue-600">Profile Completion</h2>
        <Link to="/dashboard/profile">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-all"
          >
            <PenLine className="h-4 w-4" />
            <span className="sr-only">Edit Profile</span>
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Progress value={completionPercentage} className="h-2" />
        <span className="text-sm font-medium">{completionPercentage}%</span>
      </div>
      <ul className="space-y-2">
        {steps.map((step, index) => (
          <li key={index} className="flex items-center text-sm">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex items-center hover:bg-gray-50 p-1 rounded-md w-full cursor-pointer transition-colors">
                  {step.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-300 mr-2" />
                  )}
                  <span className={step.completed ? 'text-gray-800' : 'text-gray-500'}>
                    {step.name}
                  </span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
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
                      className="p-0 h-auto text-blue-600 hover:text-blue-800"
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
    </div>
  );
};

export default ProfileCompletion;
