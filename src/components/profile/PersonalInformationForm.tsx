
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, Save, ExternalLink } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface PersonalInformationFormProps {
  initialData?: any;
}

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({ initialData }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    education: '',
    graduationYear: undefined as Date | undefined,
    dateOfBirth: undefined as Date | undefined,
    location: '',
    linkedinUrl: '',
    portfolioUrl: ''
  });

  useEffect(() => {
    // Load existing profile data
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      try {
        const profileData = JSON.parse(userProfile);
        setFormData({
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

  const handleInputChange = (field: string, value: string | Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateAge = (birthDate: Date): boolean => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 16;
    }
    return age >= 16;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate date of birth
    if (formData.dateOfBirth && !validateAge(formData.dateOfBirth)) {
      toast({
        title: "Invalid Date of Birth",
        description: "You must be at least 16 years old.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Get existing profile data
      const existingProfile = localStorage.getItem('userProfile');
      const profileData = existingProfile ? JSON.parse(existingProfile) : {};
      
      // Update with new form data
      const updatedProfile = {
        ...profileData,
        ...formData,
        lastUpdated: new Date().toISOString()
      };
      
      // Save to localStorage
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      
      // Update current user data as well
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const userData = JSON.parse(currentUser);
        const updatedUser = { ...userData, ...formData };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
      
      toast({
        title: "Profile Updated",
        description: "Your personal information has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving profile data:', error);
      toast({
        title: "Error",
        description: "Failed to save your information. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-white/95 shadow-xl backdrop-blur-sm border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-purple-600">Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Software Developer"
                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Select your birthdate"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dateOfBirth}
                    onSelect={(date) => handleInputChange('dateOfBirth', date)}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                placeholder="e.g., Computer Science"
                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label>Graduation Year</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.graduationYear && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.graduationYear ? format(formData.graduationYear, "yyyy") : "Select year"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.graduationYear}
                    onSelect={(date) => handleInputChange('graduationYear', date)}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., New York, NY"
                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedinUrl" className="flex items-center gap-2">
                LinkedIn Profile
                <ExternalLink className="h-3 w-3" />
              </Label>
              <Input
                id="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolioUrl" className="flex items-center gap-2">
                Portfolio Website
                <ExternalLink className="h-3 w-3" />
              </Label>
              <Input
                id="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                placeholder="https://yourportfolio.com"
                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-105"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Personal Information
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInformationForm;
