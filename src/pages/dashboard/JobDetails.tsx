
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Briefcase, 
  MapPin, 
  Building, 
  Clock, 
  ChevronLeft, 
  Share2, 
  BookmarkPlus,
  Award,
  FileText,
  Users
} from 'lucide-react';

// Import the sample jobs data (should ideally be in a separate file)
// For now, we'll use a smaller subset of the jobs data from Jobs.tsx
const sampleJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechSolutions Inc.',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    description: 'We are looking for a skilled frontend developer to join our team and help build modern web applications. The ideal candidate will have experience with React, TypeScript, and modern CSS frameworks.',
    responsibilities: [
      'Develop new user-facing features using React.js',
      'Build reusable components and front-end libraries for future use',
      'Translate designs and wireframes into high-quality code',
      'Optimize components for maximum performance across devices',
      'Coordinate with various stakeholders across functions'
    ],
    requirements: [
      '5+ years of experience in frontend development',
      'Expert knowledge of React, Redux, and TypeScript',
      'Experience with responsive design and cross-browser compatibility',
      'Strong understanding of web performance optimization',
      'Excellent problem-solving skills and attention to detail'
    ],
    benefits: [
      'Competitive salary and equity',
      'Remote-first culture',
      'Flexible working hours',
      'Health, dental, and vision insurance',
      '401(k) matching'
    ],
    skills: ['React', 'TypeScript', 'Redux', 'Tailwind CSS', 'GraphQL'],
    publication_date: '2023-06-15',
    company_description: 'TechSolutions Inc. is a leading software development company focusing on creating innovative web applications for clients across various industries. Our team of experts is dedicated to delivering high-quality solutions that drive business growth and user engagement.',
    company_logo: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  // Add a few more sample jobs with similar structure...
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'DataFlow Systems',
    location: 'New York',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    description: 'Join our backend team to design and develop robust APIs and services for our growing platform.',
    skills: ['Node.js', 'Express', 'MongoDB', 'AWS', 'Docker'],
    publication_date: '2023-06-20',
    company_logo: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'DesignHub',
    location: 'San Francisco',
    type: 'Contract',
    salary: '$90,000 - $110,000',
    description: 'Create beautiful user interfaces and experiences for our clients across various industries.',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
    publication_date: '2023-06-25',
    company_logo: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  // Add a few more sample jobs for testing...
];

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasResume, setHasResume] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

  useEffect(() => {
    // Simulate API call to fetch job details
    setLoading(true);
    
    // Find the job in our sample data
    const foundJob = sampleJobs.find(j => j.id.toString() === id);
    
    if (foundJob) {
      // Simulate network delay
      setTimeout(() => {
        setJob(foundJob);
        setLoading(false);
      }, 500);
    } else {
      toast.error('Job not found', {
        description: 'The job you are looking for could not be found.',
      });
      navigate('/dashboard/jobs');
    }
    
    // Check if resume is uploaded
    const resumeData = localStorage.getItem('userResume');
    setHasResume(!!resumeData);
    
    // Load applied jobs from localStorage
    const savedAppliedJobs = localStorage.getItem('appliedJobs');
    if (savedAppliedJobs) {
      setAppliedJobs(JSON.parse(savedAppliedJobs));
    }
  }, [id, navigate]);

  const isJobApplied = (jobId: number) => {
    return appliedJobs.includes(jobId);
  };

  const handleApply = (jobId: number) => {
    if (!hasResume) {
      toast.error('Resume required', {
        description: 'Please upload your resume in the Profile section before applying.',
      });
      return;
    }
    
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

  const handleShare = () => {
    if (navigator.share && window.location.href) {
      navigator.share({
        title: job?.title,
        text: `Check out this job: ${job?.title} at ${job?.company}`,
        url: window.location.href,
      })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied', {
        description: 'Job link copied to clipboard.',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Job not found.</p>
        <Button className="mt-4" onClick={() => navigate('/dashboard/jobs')}>
          Back to Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => navigate('/dashboard/jobs')}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Jobs
        </Button>
      </div>
      
      <Card className="overflow-hidden border-gray-200">
        <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-transparent border-b border-gray-100">
          <div className="flex items-start gap-4">
            {job.company_logo && (
              <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 border border-gray-200 bg-white">
                <img src={job.company_logo} alt={`${job.company} logo`} className="h-full w-full object-cover" />
              </div>
            )}
            <div className="flex-grow">
              <CardTitle className="text-2xl font-bold text-blue-700">{job.title}</CardTitle>
              <CardDescription className="flex items-center gap-1 text-base text-gray-600 mt-1">
                <Building className="h-4 w-4" />
                {job.company}
              </CardDescription>
              <div className="flex flex-wrap gap-3 mt-2">
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <Briefcase className="h-4 w-4" />
                  {job.type}
                </span>
                {job.publication_date && (
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    Posted: {job.publication_date}
                  </span>
                )}
              </div>
            </div>
            <div className="flex-shrink-0 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <BookmarkPlus className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
          
          {job.salary && (
            <div className="mt-2 font-medium text-green-700 bg-green-50 rounded-full px-3 py-1 inline-flex items-center text-sm">
              <Award className="h-4 w-4 mr-1" />
              {job.salary}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:gap-4 justify-between">
            <div className="flex-grow space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Job Description
                </h3>
                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
              </div>
              
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Key Responsibilities</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {job.responsibilities.map((resp: string, index: number) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {job.requirements && job.requirements.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {job.requirements.map((req: string, index: number) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {job.benefits && job.benefits.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Benefits</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {job.benefits.map((benefit: string, index: number) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {job.skills && job.skills.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill: string) => (
                      <span 
                        key={skill} 
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="w-full sm:w-80 flex-shrink-0 mt-6 sm:mt-0">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 sticky top-6">
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  About {job.company}
                </h3>
                
                {job.company_description ? (
                  <p className="text-gray-700 text-sm mb-4">{job.company_description}</p>
                ) : (
                  <p className="text-gray-700 text-sm mb-4">{job.company} is a leading company in the industry, known for its innovative products and great work environment.</p>
                )}
                
                <Button 
                  className="w-full"
                  onClick={() => handleApply(job.id)}
                  disabled={isJobApplied(job.id)}
                  variant={isJobApplied(job.id) ? "outline" : "default"}
                >
                  {isJobApplied(job.id) ? 'Already Applied' : 'Apply Now'}
                </Button>
                
                {!hasResume && (
                  <p className="text-yellow-600 text-xs mt-2">
                    Note: You need to upload your resume in your profile before applying.
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetails;
