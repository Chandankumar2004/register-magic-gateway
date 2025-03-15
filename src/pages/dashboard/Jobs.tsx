
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { toast } from 'sonner';
import { Briefcase, MapPin, Building, Clock, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Sample job data - structured similarly to The Muse API format
const sampleJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Company XYZ',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are looking for a skilled frontend developer to join our team and help build modern web applications.',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    publication_date: '2023-06-15',
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'Company ABC',
    location: 'New York',
    type: 'Full-time',
    description: 'Join our backend team to design and develop robust APIs and services for our growing platform.',
    skills: ['Node.js', 'Express', 'MongoDB'],
    publication_date: '2023-06-20',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'DesignHub',
    location: 'San Francisco',
    type: 'Contract',
    description: 'Create beautiful user interfaces and experiences for our clients across various industries.',
    skills: ['Figma', 'Adobe XD', 'User Research'],
    publication_date: '2023-06-25',
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'TechOps',
    location: 'Chicago',
    type: 'Full-time',
    description: 'Build and maintain our cloud infrastructure and deployment pipelines.',
    skills: ['AWS', 'Docker', 'Kubernetes'],
    publication_date: '2023-06-30',
  },
];

const Jobs = () => {
  const [jobs, setJobs] = useState(sampleJobs);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load applied jobs from localStorage on component mount
  useEffect(() => {
    const savedAppliedJobs = localStorage.getItem('appliedJobs');
    if (savedAppliedJobs) {
      setAppliedJobs(JSON.parse(savedAppliedJobs));
    }
  }, []);

  const handleApply = (jobId: number) => {
    // Update applied jobs state
    const newAppliedJobs = [...appliedJobs, jobId];
    setAppliedJobs(newAppliedJobs);
    
    // Save to localStorage
    localStorage.setItem('appliedJobs', JSON.stringify(newAppliedJobs));
    
    // Show success message
    toast.success('Application submitted!', {
      description: 'Your job application has been submitted successfully.',
    });
  };

  const isJobApplied = (jobId: number) => {
    return appliedJobs.includes(jobId);
  };

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 relative">
      {/* Floating gradients for visual appeal */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Jobs</h1>
          <p className="text-muted-foreground">Find your next opportunity</p>
        </div>
        
        {/* Search input with icon */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search jobs, skills, companies..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="transition-all hover:shadow-md overflow-hidden border-gray-200 glass">
            <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-transparent border-b border-gray-100">
              <CardTitle className="text-xl font-semibold tracking-tight text-blue-700">{job.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 text-base text-gray-600">
                <Building className="h-4 w-4" />
                {job.company}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-4 pb-3">
              <div className="flex flex-wrap gap-2 mb-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  {job.type}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {job.publication_date}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="pt-0 border-t border-gray-100 bg-gray-50/50">
              <Button 
                onClick={() => handleApply(job.id)}
                disabled={isJobApplied(job.id)}
                className="w-full"
                variant={isJobApplied(job.id) ? "outline" : "default"}
              >
                {isJobApplied(job.id) ? 'Applied' : 'Apply Now'}
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        {filteredJobs.length === 0 && (
          <div className="col-span-2 text-center py-12">
            <p className="text-gray-500">No jobs match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
