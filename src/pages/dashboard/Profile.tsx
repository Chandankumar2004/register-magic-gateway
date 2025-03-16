import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Loader2, MapPin, GraduationCap, UploadCloud, Camera, Trash2, PenLine } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import ProfileCompletion from '@/components/ProfileCompletion';

// Form schema validation
const profileSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  title: z.string().min(2, {
    message: 'Job title must be at least 2 characters.',
  }),
  education: z.string().min(2, {
    message: 'Education details required.',
  }),
  graduationYear: z.date({
    required_error: 'Graduation year is required.',
  }),
  location: z.string().min(2, {
    message: 'Location is required.',
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeInfo, setResumeInfo] = useState<{name: string, size: number} | null>(null);
  
  useEffect(() => {
    // Load existing profile data
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      try {
        const profileData = JSON.parse(userProfile);
        form.reset({
          fullName: profileData.fullName || '',
          title: profileData.title || '',
          education: profileData.education || '',
          graduationYear: profileData.graduationYear ? new Date(profileData.graduationYear) : undefined,
          location: profileData.location || '',
        });
      } catch (error) {
        console.error('Error parsing stored profile data:', error);
      }
    }

    // Check if we have a stored resume
    const storedResume = localStorage.getItem('userResume');
    if (storedResume) {
      try {
        const resumeData = JSON.parse(storedResume);
        setResumeInfo({
          name: resumeData.name,
          size: resumeData.size
        });
      } catch (error) {
        console.error('Error parsing stored resume data:', error);
      }
    }
    
    // Check if we have a stored profile photo
    const storedPhoto = localStorage.getItem('userProfilePhoto');
    if (storedPhoto) {
      setProfilePhoto(storedPhoto);
    }
  }, []);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      title: '',
      education: '',
      location: '',
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save profile data to localStorage
      localStorage.setItem('userProfile', JSON.stringify(values));
      
      toast.success('Profile updated successfully', {
        description: 'Your profile information has been saved.',
      });
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Update failed', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        toast.error('File too large', {
          description: 'Maximum file size is 10MB.',
        });
        return;
      }
      
      setResumeFile(file);
      setResumeInfo({
        name: file.name,
        size: file.size
      });
      
      // Store resume info in localStorage
      // In a real app, you'd upload this to a server/storage
      const reader = new FileReader();
      reader.onload = (e) => {
        // Store file metadata in localStorage (not the actual binary data for simplicity)
        localStorage.setItem('userResume', JSON.stringify({
          name: file.name,
          size: file.size,
          type: file.type,
          date: new Date().toISOString(),
        }));
      };
      reader.readAsText(file); // Just to trigger onload, we don't actually need the content
      
      toast.success('Resume uploaded', {
        description: `File "${file.name}" has been uploaded.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Your Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and qualifications
          </p>
        </div>
        <ProfileCompletion />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="col-span-2 space-y-6">
          <div className="bg-white/90 shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-blue-600 flex items-center">
                <PenLine className="mr-2 h-4 w-4" />
                Personal Information
              </h2>
              <Button 
                variant="ghost"
                size="sm"
                className="h-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transform hover:scale-105 transition-all"
              >
                Edit
              </Button>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            className="h-11" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Professional Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Frontend Developer" 
                            className="h-11" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Education/Qualification</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Bachelor of Science in Computer Science" 
                            className="h-11" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="graduationYear"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Graduation Year</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full h-11 justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "yyyy")
                                ) : (
                                  <span>Select graduation year</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1950-01-01")
                              }
                              initialFocus
                              captionLayout="dropdown-buttons"
                              fromYear={1950}
                              toYear={new Date().getFullYear()}
                              className="p-3"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Preferred Job Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input 
                              placeholder="New York, Remote, etc." 
                              className="h-11 pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 mt-2 transform hover:scale-105 transition-all"
                  variant="3d"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    'Save Profile'
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div className="bg-white/90 shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm">
            <h2 className="text-lg font-medium mb-4 flex items-center text-blue-600">
              <GraduationCap className="mr-2 h-5 w-5" />
              Resume
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="mb-4">
                {resumeInfo ? (
                  <div className="text-sm">
                    <div className="flex items-center justify-center mb-2">
                      <div className="bg-blue-100 rounded-lg p-3">
                        <UploadCloud className="h-8 w-8 text-blue-500" />
                      </div>
                    </div>
                    <p className="font-medium text-gray-800">{resumeInfo.name}</p>
                    <p className="text-gray-500">{Math.round(resumeInfo.size / 1024)} KB</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <UploadCloud className="mx-auto h-16 w-16 text-gray-400 mb-2" />
                    <p className="text-gray-600">No resume uploaded yet</p>
                    <p className="text-sm text-gray-500 mt-1">
                      You must upload a resume to apply for jobs
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label 
                  htmlFor="resume-upload" 
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors hover:scale-105 transform"
                >
                  {resumeInfo ? 'Replace resume' : 'Upload resume'}
                </Label>
                <Input 
                  id="resume-upload" 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                />
                <p className="text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX (Max 10MB)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/90 shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-blue-600">Profile Photo</h2>
              {profilePhoto && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transform hover:scale-105 transition-all"
                  onClick={handleRemoveProfilePhoto}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 border border-gray-200 group-hover:border-blue-300 transition-all duration-300 shadow-lg">
                  {profilePhoto ? (
                    <img 
                      src={profilePhoto} 
                      alt="Profile Preview" 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <UploadCloud className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                </div>
                <label 
                  htmlFor="profile-photo" 
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-50 transition-colors hover:scale-110 transform duration-200"
                >
                  <Camera className="h-4 w-4 text-blue-600" />
                  <span className="sr-only">Change profile picture</span>
                </label>
              </div>
              <div className="space-y-2 text-center">
                <Label 
                  htmlFor="profile-photo" 
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors hover:scale-105 transform"
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
