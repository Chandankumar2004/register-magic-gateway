
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BlurImage from '@/components/BlurImage';
import RegistrationForm from '@/components/RegistrationForm';
import { Briefcase, Search, Building, Users, MapPin, Award } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full background image with overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <BlurImage
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Office Building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/70"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 pt-10 pb-16 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero section with brand and value proposition */}
          <div className="text-white space-y-6 animate-fade-up">
            <div className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-2">
              Find Your Dream Job Today
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Your Career Journey Starts With KodJobs
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-xl">
              Connect with top employers, find exciting opportunities, and take the next step in your professional growth.
            </p>
            
            <div className="flex flex-wrap gap-4 py-2">
              <div className="flex items-center gap-2">
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-blue-200" />
                </div>
                <span className="text-blue-100">40,000+ Jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full">
                  <Building className="h-5 w-5 text-blue-200" />
                </div>
                <span className="text-blue-100">1,200+ Companies</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full">
                  <Users className="h-5 w-5 text-blue-200" />
                </div>
                <span className="text-blue-100">2M+ Users</span>
              </div>
            </div>
            
            <div className="pt-4 hidden md:block">
              <h3 className="text-xl font-semibold mb-3">Top Companies Hiring Now</h3>
              <div className="flex items-center gap-4 flex-wrap">
                {/* Placeholder for company logos */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm h-12 w-12 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <RegistrationForm />
        </div>
      </div>
      
      {/* Feature highlights section */}
      <div className="relative z-10 bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Choose KodJobs</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-lg mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Job Matching</h3>
              <p className="text-gray-600">Our AI-powered system matches your skills and preferences with the perfect job opportunities.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-lg mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Remote & Local Options</h3>
              <p className="text-gray-600">Find opportunities that match your lifestyle, whether you prefer remote work or local positions.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-lg mb-4">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Development</h3>
              <p className="text-gray-600">Access resources and tools to help you grow professionally and advance your career goals.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
