
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Loader2 } from 'lucide-react';
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
import { getUserByUsername } from '@/utils/storage';
import BlurImage from '@/components/BlurImage';

// Form schema validation
const formSchema = z.object({
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials from local storage
      const user = getUserByUsername(values.username);
      
      if (user && user.password === values.password) {
        toast.success('Login successful!', {
          description: `Welcome back, ${user.fullName}!`,
        });
        
        // Navigate to dashboard (or home for now)
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        toast.error('Login failed', {
          description: 'Invalid username or password.',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image */}
      <div className="w-full md:w-1/2 h-64 md:h-auto relative">
        <BlurImage
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Technology"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay with text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
          <div className="p-8 md:p-16 text-white max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
              Welcome back
            </h2>
            <p className="text-lg text-white/80 animate-fade-up" style={{ animationDelay: '400ms' }}>
              Sign in to access your account and continue your journey.
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 animate-fade-in bg-gradient-to-br from-blue-50/30 to-indigo-50/30">
        <div className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="p-0 h-auto mb-6 hover:bg-transparent hover:text-blue-600 transition-colors"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to registration
            </Button>
            
            <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Sign in</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium"
                variant="3d"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Form>
          
          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto font-semibold underline-offset-4 hover:underline transition-all duration-300 hover:text-blue-600" 
                onClick={() => navigate('/')}
              >
                Sign up
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
