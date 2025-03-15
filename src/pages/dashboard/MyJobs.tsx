
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Clock, Building, Calendar } from 'lucide-react';
import { toast } from 'sonner';

// Sample job data (same as in Jobs.tsx)
const sampleJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Company XYZ',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are looking for a skilled frontend developer to join our team and help build modern web applications.',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    appliedDate: '2023-06-15',
    status: 'Under Review',
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'Company ABC',
    location: 'New York',
    type: 'Full-time',
    description: 'Join our backend team to design and develop robust APIs and services for our growing platform.',
    skills: ['Node.js', 'Express', 'MongoDB'],
    appliedDate: '2023-06-12',
    status: 'Under Review',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'DesignHub',
    location: 'San Francisco',
    type: 'Contract',
    description: 'Create beautiful user interfaces and experiences for our clients across various industries.',
    skills: ['Figma', 'Adobe XD', 'User Research'],
    appliedDate: '2023-06-10',
    status: 'Under Review',
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'TechOps',
    location: 'Chicago',
    type: 'Full-time',
    description: 'Build and maintain our cloud infrastructure and deployment pipelines.',
    skills: ['AWS', 'Docker', 'Kubernetes'],
    appliedDate: '2023-06-08',
    status: 'Under Review',
  },
];

const MyJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  
  // Load applied jobs from localStorage on component mount
  useEffect(() => {
    const savedAppliedJobIds = localStorage.getItem('appliedJobs');
    if (savedAppliedJobIds) {
      const appliedJobIds = JSON.parse(savedAppliedJobIds);
      // Filter the sample jobs to get only those that the user has applied to
      const userAppliedJobs = sampleJobs.filter(job => appliedJobIds.includes(job.id));
      
      setAppliedJobs(userAppliedJobs);
    }
  }, []);

  const withdrawApplication = (jobId: number) => {
    // Get current applied jobs from localStorage
    const savedAppliedJobIds = localStorage.getItem('appliedJobs');
    if (savedAppliedJobIds) {
      const appliedJobIds = JSON.parse(savedAppliedJobIds);
      // Remove the job from the list
      const updatedAppliedJobIds = appliedJobIds.filter((id: number) => id !== jobId);
      // Save back to localStorage
      localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobIds));
      
      // Update state
      setAppliedJobs(appliedJobs.filter(job => job.id !== jobId));
      
      // Show success message
      toast.success('Application withdrawn', {
        description: 'Your job application has been withdrawn.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Applications</h1>
          <p className="text-muted-foreground">Track your job applications</p>
        </div>
      </div>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          {appliedJobs.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-500">You haven't applied to any jobs yet.</p>
              </CardContent>
            </Card>
          ) : (
            appliedJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardHeader className="pb-2 flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-semibold tracking-tight">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-base">
                      <Building className="h-4 w-4" />
                      {job.company} • {job.location}
                    </CardDescription>
                  </div>
                  <div className="shrink-0 flex items-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 gap-1">
                      <Clock className="h-3 w-3" />
                      {job.status}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-3">
                  <p className="text-sm text-gray-500 flex items-center gap-1 mb-2">
                    <Calendar className="h-4 w-4" />
                    Applied on {job.appliedDate}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.skills.map((skill: string) => (
                      <span 
                        key={skill} 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <Button 
                    variant="outline" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    onClick={() => withdrawApplication(job.id)}
                  >
                    Withdraw Application
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="table">
          {appliedJobs.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-500">You haven't applied to any jobs yet.</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appliedJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.appliedDate}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                            {job.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => withdrawApplication(job.id)}
                          >
                            Withdraw
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyJobs;
