
import { useNavigate } from 'react-router-dom';
import BlurImage from '@/components/BlurImage';
import RegistrationForm from '@/components/RegistrationForm';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen relative">
      {/* Full background image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <BlurImage
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>
      
      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col md:flex-row min-h-screen">
        {/* Left side - Text overlay */}
        <div className="w-full md:w-1/2 flex items-center">
          <div className="p-8 md:p-16 text-white max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
              Join our community
            </h2>
            <p className="text-lg text-white/80 animate-fade-up" style={{ animationDelay: '400ms' }}>
              Explore a world of innovation and technology with our platform.
            </p>
          </div>
        </div>
        
        {/* Right side - Registration form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md">
            <RegistrationForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
