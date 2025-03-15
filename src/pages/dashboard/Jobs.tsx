
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
import { Briefcase, MapPin, Building } from 'lucide-react';

// Sample job data
const sampleJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Company XYZ',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are looking for a skilled frontend developer to join our team and help build modern web applications.',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'Company ABC',
    location: 'New York',
    type: 'Full-time',
    description: 'Join our backend team to design and develop robust APIs and services for our growing platform.',
    skills: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'DesignHub',
    location: 'San Francisco',
    type: 'Contract',
    description: 'Create beautiful user interfaces and experiences for our clients across various industries.',
    skills: ['Figma', 'Adobe XD', 'User Research'],
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'TechOps',
    location: 'Chicago',
    type: 'Full-time',
    description: 'Build and maintain our cloud infrastructure and deployment pipelines.',
    skills: ['AWS', 'Docker', 'Kubernetes'],
  },
];

const Jobs = () => {
  const [jobs, setJobs] = useState(sampleJobs);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Jobs</h1>
          <p className="text-muted-foreground">Find your next opportunity</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {jobs.map((job) => (
          <Card key={job.id} className="transition-all hover:shadow-md overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold tracking-tight text-blue-700">{job.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 text-base text-gray-600">
                <Building className="h-4 w-4" />
                {job.company} • {job.location} • {job.type}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-3">
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
            
            <CardFooter className="pt-0">
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
      </div>
    </div>
  );
};

export default Jobs;
