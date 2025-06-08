
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const ProfileTips: React.FC = () => {
  return (
    <div className="bg-white/95 shadow-xl rounded-lg p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm">
      <h2 className="text-lg font-medium mb-3 text-purple-600">Tips for a Great Profile</h2>
      <ul className="space-y-2 text-sm">
        <li className="flex items-start">
          <div className="bg-purple-100 rounded-full p-1 mr-2 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-purple-600" />
          </div>
          <span>Upload a professional, high-quality photo</span>
        </li>
        <li className="flex items-start">
          <div className="bg-purple-100 rounded-full p-1 mr-2 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-purple-600" />
          </div>
          <span>Use a specific job title that matches your target roles</span>
        </li>
        <li className="flex items-start">
          <div className="bg-purple-100 rounded-full p-1 mr-2 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-purple-600" />
          </div>
          <span>Include your highest education level and graduation year</span>
        </li>
        <li className="flex items-start">
          <div className="bg-purple-100 rounded-full p-1 mr-2 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-purple-600" />
          </div>
          <span>Upload an updated resume tailored to your industry</span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileTips;
