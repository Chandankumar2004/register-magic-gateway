
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, ChevronRight, CreditCard, Loader2 } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { saveUserData } from '@/utils/storage';

// Form schema validation
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
  payment: z.string().min(1, {
    message: 'Payment information is required.',
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
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      fullName: '',
      payment: paymentMethod,
      email: '',
    },
  });

  const handlePaymentSelection = (method: string) => {
    setPaymentMethod(method);
    form.setValue('payment', method);
    setPaymentDialogOpen(false);
    toast.success('Payment method selected', {
      description: `You selected ${method} as your payment method.`,
    });
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to local storage
      saveUserData({
        username: values.username,
        password: values.password,
        fullName: values.fullName,
        payment: values.payment,
        email: values.email,
        dateOfBirth: values.dateOfBirth.toISOString(),
      });
      
      toast.success('Registration successful!', {
        description: 'Your account has been created.',
      });
      
      // Navigate to login page
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

  return (
    <div className="w-full max-w-md space-y-8 animate-fade-up">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Create an account</h1>
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
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-11" 
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
              name="payment"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full h-11 justify-start text-left font-normal"
                          type="button"
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          {field.value ? field.value : 'Select a payment method'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Select Payment Method</DialogTitle>
                          <DialogDescription>
                            Choose your preferred payment option
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <Button 
                            variant="outline" 
                            onClick={() => handlePaymentSelection('Credit Card')}
                            className="justify-start"
                          >
                            <CreditCard className="mr-2 h-4 w-4" />
                            Credit Card
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => handlePaymentSelection('PayPal')}
                            className="justify-start"
                          >
                            <CreditCard className="mr-2 h-4 w-4" />
                            PayPal
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => handlePaymentSelection('Bank Transfer')}
                            className="justify-start"
                          >
                            <CreditCard className="mr-2 h-4 w-4" />
                            Bank Transfer
                          </Button>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="secondary" onClick={() => setPaymentDialogOpen(false)}>
                            Cancel
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <input type="hidden" {...field} />
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
                            "w-full h-11 justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select your date of birth</span>
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
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 group"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                Sign Up
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </Form>
      
      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Button 
            variant="link" 
            className="p-0 h-auto font-semibold underline-offset-4 hover:underline" 
            onClick={() => navigate('/login')}
          >
            Log in
          </Button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;

