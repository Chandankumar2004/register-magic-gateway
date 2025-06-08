
import React, { useState, useEffect } from 'react';
import { GraduationCap, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ResumeUpload: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeInfo, setResumeInfo] = useState<{name: string, size: number} | null>(null);
  
  useEffect(() => {
    // Check if we have a stored resume
    const storedResume = localStorage.getItem('userResume');
    if (storedResume) {
      try {
        const resumeData = JSON.parse(storedResume);
        setResumeInfo({
          name: resumeData.name,
          size: resumeData.size
        });
      } catch (error) {
        console.error('Error parsing stored resume data:', error);
      }
    }
  }, []);

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        toast.error('File too large', {
          description: 'Maximum file size is 10MB.',
        });
        return;
      }
      
      setResumeFile(file);
      setResumeInfo({
        name: file.name,
        size: file.size
      });
      
      // Store resume info in localStorage
      // In a real app, you'd upload this to a server/storage
      const reader = new FileReader();
      reader.onload = (e) => {
        // Store file metadata in localStorage (not the actual binary data for simplicity)
        localStorage.setItem('userResume', JSON.stringify({
          name: file.name,
          size: file.size,
          type: file.type,
          date: new Date().toISOString(),
        }));
      };
      reader.readAsText(file); // Just to trigger onload, we don't actually need the content
      
      toast.success('Resume uploaded', {
        description: `File "${file.name}" has been uploaded.`,
      });
    }
  };

  return (
    <div className="bg-white/95 shadow-xl rounded-lg p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm">
      <h2 className="text-lg font-medium mb-4 flex items-center text-purple-600">
        <GraduationCap className="mr-2 h-5 w-5" />
        Resume
      </h2>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-300 transition-colors">
        <div className="mb-4">
          {resumeInfo ? (
            <div className="text-sm">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-purple-100 rounded-lg p-3">
                  <UploadCloud className="h-8 w-8 text-purple-500" />
                </div>
              </div>
              <p className="font-medium text-gray-800">{resumeInfo.name}</p>
              <p className="text-gray-500">{Math.round(resumeInfo.size / 1024)} KB</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <UploadCloud className="mx-auto h-16 w-16 text-gray-400 mb-2" />
              <p className="text-gray-600">No resume uploaded yet</p>
              <p className="text-sm text-gray-500 mt-1">
                You must upload a resume to apply for jobs
              </p>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label 
            htmlFor="resume-upload" 
            className="cursor-pointer inline-flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition-colors hover:scale-105 transform"
          >
            {resumeInfo ? 'Replace resume' : 'Upload resume'}
          </Label>
          <Input 
            id="resume-upload" 
            type="file" 
            className="hidden" 
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
          />
          <p className="text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX (Max 10MB)</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
