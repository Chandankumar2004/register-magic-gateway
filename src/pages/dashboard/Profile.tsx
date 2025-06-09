
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PersonalInformationForm from '@/components/profile/PersonalInformationForm';
import SkillsSection from '@/components/profile/SkillsSection';
import ResumeUpload from '@/components/profile/ResumeUpload';
import ProfilePhotoUpload from '@/components/profile/ProfilePhotoUpload';
import ProfileTips from '@/components/profile/ProfileTips';

const Profile: React.FC = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your personal information, skills, and documents
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <ProfilePhotoUpload />
          <PersonalInformationForm />
          <SkillsSection />
          <ResumeUpload />
        </div>

        {/* Right Column - Tips */}
        <div className="lg:col-span-1">
          <ProfileTips />
        </div>
      </div>
    </div>
  );
};

export default Profile;
