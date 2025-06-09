import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, ChevronRight, Loader2 } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { saveUserData } from '@/utils/storage';

const formSchema = z.object({
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }).regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter.',
  }).regex(/[0-9]/, {
    message: 'Password must contain at least one number.',
  }),
  fullName: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  dateOfBirth: z.date({
    required_error: 'Please select a date of birth.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => {
    const defaultYear = new Date().getFullYear() - 25;
    return new Date(defaultYear, 0, 1);
  });
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      fullName: '',
      email: '',
    },
  });

  const validateAge = (birthDate: Date): boolean => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 16;
    }
    return age >= 16;
  };

  const onSubmit = async (values: FormValues) => {
    // Validate age before submission
    if (!validateAge(values.dateOfBirth)) {
      form.setError('dateOfBirth', {
        type: 'manual',
        message: 'You must be at least 16 years old to register.',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      saveUserData({
        username: values.username,
        password: values.password,
        fullName: values.fullName,
        email: values.email,
        dateOfBirth: values.dateOfBirth.toISOString(),
      });
      
      toast.success('Registration successful!', {
        description: 'Your account has been created.',
      });
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate years from 1900 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
  
  // Generate months
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthChange = (month: string) => {
    const monthIndex = months.indexOf(month);
    const newDate = new Date(calendarMonth.getFullYear(), monthIndex, 1);
    setCalendarMonth(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = new Date(parseInt(year), calendarMonth.getMonth(), 1);
    setCalendarMonth(newDate);
  };

  return (
    <div className="w-full max-w-md space-y-8 animate-fade-up bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Create an account</h1>
        <p className="text-muted-foreground">
          Fill in the details below to create your account
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="johndoe" 
                      className="h-11 transition-all duration-300 border-gray-300 focus:border-blue-500 hover:border-blue-400" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-11 transition-all duration-300 border-gray-300 focus:border-blue-500 hover:border-blue-400" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Must be at least 8 characters with uppercase & numbers
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      className="h-11 transition-all duration-300 border-gray-300 focus:border-blue-500 hover:border-blue-400" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="john.doe@example.com" 
                      className="h-11 transition-all duration-300 border-gray-300 focus:border-blue-500 hover:border-blue-400" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full h-11 justify-start text-left font-normal transition-all duration-300 border-gray-300 hover:border-blue-400",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Select your date of birth (DD/MM/YYYY)</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="p-3 border-b space-y-2">
                        <div className="flex gap-2">
                          <Select
                            value={months[calendarMonth.getMonth()]}
                            onValueChange={handleMonthChange}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                              {months.map((month) => (
                                <SelectItem key={month} value={month}>
                                  {month}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Select
                            value={calendarMonth.getFullYear().toString()}
                            onValueChange={handleYearChange}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent className="max-h-48">
                              {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        month={calendarMonth}
                        onMonthChange={setCalendarMonth}
                        initialFocus
                        className="p-3 pointer-events-auto"
                        showOutsideDays={false}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="text-xs">
                    Enter your birth date in DD/MM/YYYY format. You must be at least 16 years old to register
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 w-full">
            <Button 
              type="submit" 
              className="flex-1 h-12 text-base font-medium"
              variant="3d"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <>
                  Sign Up
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
            
            <Button 
              type="button"
              variant="outline" 
              className="flex-1 h-12 text-base font-medium transition-all duration-300 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
              onClick={() => navigate('/login')}
            >
              Log In
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;
