
import React, { useEffect, useState } from 'react';
import ProfileCompletion from '@/components/ProfileCompletion';
import PersonalInformationForm from '@/components/profile/PersonalInformationForm';
import ProfilePhotoUpload from '@/components/profile/ProfilePhotoUpload';
import ResumeUpload from '@/components/profile/ResumeUpload';
import ProfileTips from '@/components/profile/ProfileTips';
import SkillsSection from '@/components/profile/SkillsSection';
import AIJobAssistant from '@/components/profile/AIJobAssistant';

const Profile = () => {
  const [initialFormData, setInitialFormData] = useState<any>(null);
  
  useEffect(() => {
    // Load existing profile data
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      try {
        const profileData = JSON.parse(userProfile);
        setInitialFormData({
          fullName: profileData.fullName || '',
          title: profileData.title || '',
          education: profileData.education || '',
          graduationYear: profileData.graduationYear ? new Date(profileData.graduationYear) : undefined,
          dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth) : undefined,
          location: profileData.location || '',
          linkedinUrl: profileData.linkedinUrl || '',
          portfolioUrl: profileData.portfolioUrl || ''
        });
      } catch (error) {
        console.error('Error parsing stored profile data:', error);
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent">Your Profile</h1>
          <p className="text-muted-foreground text-sm">
            Manage your personal information and qualifications
          </p>
        </div>
      </div>

      {/* AI Job Assistant Section */}
      <div className="w-full">
        <AIJobAssistant />
      </div>

      {/* Top row with Personal Information and Profile Completion */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Personal Information - Takes 2 columns */}
        <div className="lg:col-span-2">
          <PersonalInformationForm initialData={initialFormData} />
        </div>

        {/* Profile Completion - Takes 1 column */}
        <div className="lg:col-span-1">
          <ProfileCompletion />
        </div>
      </div>

      {/* Second row with Skills and Resume */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Skills section - Takes 1 column */}
        <div className="lg:col-span-1">
          <SkillsSection />
        </div>

        {/* Resume section - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ResumeUpload />
        </div>
      </div>

      {/* Third row with Profile Photo and Tips */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Photo and Tips - Takes full width but in columns */}
        <div className="lg:col-span-2">
          <ProfilePhotoUpload />
        </div>

        <div className="lg:col-span-1">
          <ProfileTips />
        </div>
      </div>
    </div>
  );
};

export default Profile;
