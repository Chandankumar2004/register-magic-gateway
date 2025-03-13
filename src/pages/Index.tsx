
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BlurImage from '@/components/BlurImage';
import RegistrationForm from '@/components/RegistrationForm';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with login button */}
      <header className="w-full p-4 sm:p-6 flex justify-end absolute top-0 right-0 z-10">
        <Button 
          variant="ghost" 
          className="backdrop-blur-md bg-white/30 border border-gray-200/30 hover:bg-white/50 text-gray-900 hover-lift"
          onClick={() => navigate('/login')}
        >
          Log in
        </Button>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex flex-col md:flex-row min-h-screen">
        {/* Left side - Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
          <BlurImage
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Technology"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay with text */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
            <div className="p-8 md:p-16 text-white max-w-md">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
                Join our community
              </h2>
              <p className="text-lg text-white/80 animate-fade-up" style={{ animationDelay: '400ms' }}>
                Explore a world of innovation and technology with our platform.
              </p>
            </div>
          </div>
        </div>
        
        {/* Right side - Registration form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 animate-fade-in">
          <RegistrationForm />
        </div>
      </main>
    </div>
  );
};

export default Index;
