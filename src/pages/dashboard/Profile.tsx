
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Upload, Loader2, MapPin, GraduationCap } from 'lucide-react';
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
        setProfilePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      toast.success('Resume uploaded', {
        description: `File "${file.name}" has been uploaded.`,
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and qualifications
          </p>
        </div>
        <ProfileCompletion />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="col-span-2 space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  className="w-full h-11"
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

          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-blue-500" />
              Resume
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="mb-4">
                {resumeFile ? (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{resumeFile.name}</span> ({Math.round(resumeFile.size / 1024)} KB)
                  </p>
                ) : (
                  <Upload className="mx-auto h-10 w-10 text-gray-400" />
                )}
              </div>
              <div className="space-y-2">
                <Label 
                  htmlFor="resume-upload" 
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
                >
                  {resumeFile ? 'Replace resume' : 'Upload resume'}
                </Label>
                <Input 
                  id="resume-upload" 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                />
                <p className="text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-medium mb-4">Profile Photo</h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                {profilePhoto ? (
                  <img 
                    src={profilePhoto} 
                    alt="Profile Preview" 
                    className="h-full w-full object-cover" 
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <Upload className="h-10 w-10 text-gray-400" />
                  </div>
                )}
              </div>
              <Label 
                htmlFor="profile-photo" 
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
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
  );
};

export default Profile;
