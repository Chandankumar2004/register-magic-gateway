
import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const ProfileCompletion = () => {
  // This would typically be calculated based on filled profile fields
  const completionPercentage = 40;
  
  const steps = [
    { name: 'Basic Info', completed: true },
    { name: 'Profile Photo', completed: false },
    { name: 'Resume', completed: true },
    { name: 'Education', completed: false },
    { name: 'Location', completed: false },
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200 w-full max-w-xs">
      <h2 className="text-lg font-medium mb-2">Profile Completion</h2>
      <div className="flex items-center gap-2 mb-4">
        <Progress value={completionPercentage} className="h-2" />
        <span className="text-sm font-medium">{completionPercentage}%</span>
      </div>
      <ul className="space-y-2">
        {steps.map((step, index) => (
          <li key={index} className="flex items-center text-sm">
            {step.completed ? (
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <Circle className="h-4 w-4 text-gray-300 mr-2" />
            )}
            <span className={step.completed ? 'text-gray-800' : 'text-gray-500'}>
              {step.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileCompletion;
