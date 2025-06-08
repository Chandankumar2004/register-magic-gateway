
import React, { useState, useEffect } from 'react';
import { Camera, Trash2, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProfilePhotoUpload: React.FC = () => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if we have a stored profile photo
    const storedPhoto = localStorage.getItem('userProfilePhoto');
    if (storedPhoto) {
      setProfilePhoto(storedPhoto);
    }
  }, []);

  const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePhoto(result);
        // Store the photo in localStorage
        localStorage.setItem('userProfilePhoto', result);
        toast.success('Profile photo updated', {
          description: 'Your profile photo has been updated successfully.',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePhoto = () => {
    setProfilePhoto(null);
    localStorage.removeItem('userProfilePhoto');
    toast.success('Profile photo removed', {
      description: 'Your profile photo has been removed successfully.',
    });
  };

  return (
    <div className="bg-white/95 shadow-xl rounded-lg p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-purple-600">Profile Photo</h2>
        {profilePhoto && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-purple-600 hover:bg-purple-50 hover:text-purple-700 transform hover:scale-105 transition-all"
            onClick={handleRemoveProfilePhoto}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        )}
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative group">
          <div className="h-32 w-32 rounded-full overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 group-hover:border-purple-300 transition-all duration-300 shadow-lg">
            {profilePhoto ? (
              <img 
                src={profilePhoto} 
                alt="Profile Preview" 
                className="h-full w-full object-cover" 
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <UploadCloud className="h-10 w-10 text-purple-300" />
              </div>
            )}
          </div>
          <label 
            htmlFor="profile-photo" 
            className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-purple-50 transition-colors hover:scale-110 transform duration-200"
          >
            <Camera className="h-4 w-4 text-purple-600" />
            <span className="sr-only">Change profile picture</span>
          </label>
        </div>
        <div className="space-y-2 text-center">
          <Label 
            htmlFor="profile-photo" 
            className="cursor-pointer inline-flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition-colors hover:scale-105 transform"
          >
            {profilePhoto ? 'Change photo' : 'Upload photo'}
          </Label>
          <Input 
            id="profile-photo" 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleProfilePhotoChange}
          />
          <p className="text-xs text-gray-500 text-center">Recommended: Square JPG or PNG, at least 300x300px</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
