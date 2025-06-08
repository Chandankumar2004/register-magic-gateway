
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Loader2, MapPin, PenLine } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
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

interface PersonalInformationFormProps {
  initialData?: Partial<ProfileFormValues>;
}

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({ initialData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: initialData?.fullName || '',
      title: initialData?.title || '',
      education: initialData?.education || '',
      location: initialData?.location || '',
      graduationYear: initialData?.graduationYear,
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

  return (
    <div className="bg-white/95 shadow-xl rounded-lg p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-purple-600 flex items-center">
          <PenLine className="mr-2 h-4 w-4" />
          Personal Information
        </h2>
        <Button 
          variant="ghost"
          size="sm"
          className="h-8 text-purple-600 hover:bg-purple-50 hover:text-purple-700 transform hover:scale-105 transition-all"
        >
          Edit
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      className="h-11 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all" 
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
                      className="h-11 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Education/Qualification</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Bachelor of Science in Computer Science" 
                    className="h-11 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid gap-4 md:grid-cols-2">
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
                            "w-full h-11 justify-start text-left font-normal hover:bg-purple-50 border-gray-300 hover:border-purple-400",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-purple-500" />
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
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
                      <Input 
                        placeholder="New York, Remote, etc." 
                        className="h-11 pl-10 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all" 
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
            className="w-full h-11 mt-2 transform hover:scale-105 transition-all bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
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
  );
};

export default PersonalInformationForm;
