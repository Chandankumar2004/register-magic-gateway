import React from 'react';
import { ArrowRightCircle, ArrowLeftCircle, UploadCloud, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import ProfileCompletion from '@/components/ProfileCompletion';
import { toast } from 'sonner';
import { hasUploadedResume } from '@/utils/resumeUtils';

const DashboardHome = () => {
  const navigate = useNavigate();
  
  const getUserName = () => {
    const users = localStorage.getItem('registered_users');
    if (users) {
      const parsedUsers = JSON.parse(users);
      if (parsedUsers.length > 0) {
        return parsedUsers[0].fullName || parsedUsers[0].username;
      }
    }
    return 'User';
  };

  const handleReturnToSignup = () => {
    navigate('/');
  };
  
  const handleUploadResume = () => {
    navigate('/dashboard/profile');
    toast.info('Let\'s upload your resume!', {
      description: 'Complete your profile by uploading a resume.',
    });
  };
  
  const jobCards = [
    { title: "Frontend Developer", company: "TechCorp", location: "San Francisco, CA", salary: "$120K - $150K", tags: ["React", "TypeScript", "Remote"] },
    { title: "Backend Engineer", company: "DataSystems", location: "New York, NY", salary: "$130K - $160K", tags: ["Node.js", "Python", "Hybrid"] },
    { title: "Full Stack Developer", company: "AppWorks", location: "Austin, TX", salary: "$110K - $140K", tags: ["JavaScript", "AWS", "In-office"] },
    { title: "UX/UI Designer", company: "DesignHub", location: "Seattle, WA", salary: "$95K - $125K", tags: ["Figma", "Adobe", "Remote"] },
    { title: "DevOps Engineer", company: "CloudTech", location: "Chicago, IL", salary: "$140K - $170K", tags: ["Kubernetes", "Docker", "On-site"] },
    { title: "Data Scientist", company: "AnalyticsCo", location: "Boston, MA", salary: "$135K - $165K", tags: ["Python", "ML", "Remote"] },
    { title: "Mobile Developer", company: "AppGenius", location: "Los Angeles, CA", salary: "$115K - $145K", tags: ["React Native", "Swift", "Hybrid"] },
    { title: "Product Manager", company: "ProductLabs", location: "Denver, CO", salary: "$125K - $155K", tags: ["Agile", "Analytics", "Remote"] },
    { title: "QA Engineer", company: "TestPro", location: "Portland, OR", salary: "$95K - $125K", tags: ["Automation", "Selenium", "On-site"] },
    { title: "Security Engineer", company: "SecureNet", location: "Washington, DC", salary: "$140K - $170K", tags: ["Cybersecurity", "Cloud", "Hybrid"] },
    { title: "AI Engineer", company: "BrainWorks", location: "San Jose, CA", salary: "$150K - $180K", tags: ["TensorFlow", "NLP", "Remote"] },
    { title: "System Administrator", company: "NetOps", location: "Phoenix, AZ", salary: "$90K - $120K", tags: ["Linux", "Networks", "On-site"] },
    { title: "Blockchain Developer", company: "ChainTech", location: "Miami, FL", salary: "$130K - $160K", tags: ["Solidity", "Smart Contracts", "Remote"] },
    { title: "UI Developer", company: "VisualWorks", location: "Atlanta, GA", salary: "$105K - $135K", tags: ["CSS", "Tailwind", "Hybrid"] },
    { title: "Database Administrator", company: "DataCore", location: "Detroit, MI", salary: "$115K - $145K", tags: ["SQL", "NoSQL", "On-site"] },
    { title: "AR/VR Developer", company: "ImmerseTech", location: "San Diego, CA", salary: "$125K - $155K", tags: ["Unity", "3D Modeling", "Remote"] },
    { title: "Technical Writer", company: "DocuTech", location: "Raleigh, NC", salary: "$85K - $115K", tags: ["Documentation", "API", "Hybrid"] },
    { title: "Game Developer", company: "GameStudios", location: "Orlando, FL", salary: "$110K - $140K", tags: ["Unity", "C#", "On-site"] },
    { title: "Cloud Architect", company: "CloudSolutions", location: "Dallas, TX", salary: "$150K - $180K", tags: ["AWS", "Azure", "Remote"] },
    { title: "Machine Learning Engineer", company: "AILabs", location: "Pittsburgh, PA", salary: "$140K - $170K", tags: ["Python", "Deep Learning", "Hybrid"] }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent transform hover:scale-105 transition-all">Welcome, {getUserName()}</h1>
        <Button 
          variant="outline" 
          onClick={handleReturnToSignup}
          className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-md"
        >
          <ArrowLeftCircle className="h-4 w-4" />
          Return to Signup
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white/90 shadow-lg rounded-lg p-6 border border-gray-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer hover:bg-blue-50 backdrop-blur-sm">
          <h2 className="text-lg font-medium mb-2 text-blue-600">Dashboard</h2>
          <p className="text-gray-600 mb-4">
            Welcome to your dashboard. Here you can manage your profile, view available jobs, read blog posts, and more.
          </p>
          <div className="flex flex-col space-y-3">
            <Link to="/dashboard/jobs">
              <Button 
                variant="3d" 
                className="w-full justify-between mt-1 group"
              >
                Browse Jobs
                <ArrowRightCircle className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            {!hasUploadedResume() && (
              <Button 
                variant="outline" 
                className="w-full justify-between group hover:bg-blue-50 border-blue-100"
                onClick={handleUploadResume}
              >
                Upload Your Resume
                <UploadCloud className="transition-transform group-hover:translate-y-[-2px]" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="bg-white/90 shadow-lg rounded-lg p-6 border border-gray-200 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer hover:bg-blue-50 backdrop-blur-sm">
          <h2 className="text-lg font-medium mb-2 text-blue-600">Recent Jobs</h2>
          <p className="text-gray-600 mb-4">
            Check out the latest job postings tailored to your qualifications.
          </p>
          <Link to="/dashboard/jobs">
            <Button 
              variant="outline" 
              className="w-full justify-between mt-2 group hover:bg-blue-50 hover:shadow-md transform transition-all"
            >
              View Latest Jobs
              <ArrowRightCircle className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <ProfileCompletion />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Featured Job Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobCards.slice(0, 6).map((job, index) => (
            <div 
              key={index} 
              className="bg-white/90 rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-blue-700">{job.title}</h3>
                <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{job.salary}</div>
              </div>
              <div className="text-gray-600 mb-2">{job.company}</div>
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <MapPin className="h-3 w-3 mr-1" /> {job.location}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {job.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <Button 
                variant="ghost" 
                className="w-full mt-3 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link to="/dashboard/jobs">
            <Button variant="3d" className="px-6 py-2">
              View All 20 Jobs <ArrowRightCircle className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
