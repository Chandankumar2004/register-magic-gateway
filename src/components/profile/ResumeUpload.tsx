
import React, { useState, useEffect } from 'react';
import { GraduationCap, UploadCloud, Trash2, Eye, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { formatFileSize } from '@/utils/resumeUtils';

const ResumeUpload: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeInfo, setResumeInfo] = useState<{
    name: string;
    size: number;
    date: string;
    dataUrl?: string;
  } | null>(null);
  
  useEffect(() => {
    // Check if we have a stored resume
    const storedResume = localStorage.getItem('userResume');
    if (storedResume) {
      try {
        const resumeData = JSON.parse(storedResume);
        setResumeInfo({
          name: resumeData.name,
          size: resumeData.size,
          date: resumeData.date,
          dataUrl: resumeData.dataUrl
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
      
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Invalid file type', {
          description: 'Please upload a PDF, DOC, or DOCX file.',
        });
        return;
      }
      
      setResumeFile(file);
      
      // Create FileReader to store file as data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const resumeData = {
          name: file.name,
          size: file.size,
          type: file.type,
          date: new Date().toISOString(),
          dataUrl: dataUrl
        };
        
        setResumeInfo({
          name: file.name,
          size: file.size,
          date: resumeData.date,
          dataUrl: dataUrl
        });
        
        // Store resume data in localStorage
        localStorage.setItem('userResume', JSON.stringify(resumeData));
        
        toast.success('Resume uploaded', {
          description: `File "${file.name}" has been uploaded successfully.`,
        });
      };
      reader.readAsDataURL(file);
    }
    
    // Reset input value to allow re-uploading the same file
    event.target.value = '';
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
    setResumeInfo(null);
    localStorage.removeItem('userResume');
    
    toast.success('Resume removed', {
      description: 'Your resume has been removed successfully.',
    });
  };

  const handleViewResume = () => {
    if (resumeInfo?.dataUrl) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>${resumeInfo.name}</title></head>
            <body style="margin:0;">
              <iframe src="${resumeInfo.dataUrl}" width="100%" height="100%" style="border:none;"></iframe>
            </body>
          </html>
        `);
      }
    }
  };

  const handleDownloadResume = () => {
    if (resumeInfo?.dataUrl && resumeInfo?.name) {
      const link = document.createElement('a');
      link.href = resumeInfo.dataUrl;
      link.download = resumeInfo.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
              <div className="flex items-center justify-center mb-4">
                <div className="bg-purple-100 rounded-lg p-3">
                  <GraduationCap className="h-8 w-8 text-purple-500" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-800">{resumeInfo.name}</p>
                <p className="text-gray-600">{formatFileSize(resumeInfo.size)}</p>
                <p className="text-sm text-gray-500">
                  Last updated: {formatDate(resumeInfo.date)}
                </p>
              </div>
              
              <div className="flex gap-2 justify-center mt-4">
                <Button
                  onClick={handleViewResume}
                  variant="outline"
                  size="sm"
                  className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  onClick={handleDownloadResume}
                  variant="outline"
                  size="sm"
                  className="hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button
                  onClick={handleRemoveResume}
                  variant="outline"
                  size="sm"
                  className="hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
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
            <UploadCloud className="w-4 h-4 mr-2" />
            {resumeInfo ? 'Replace Resume' : 'Upload Resume'}
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
