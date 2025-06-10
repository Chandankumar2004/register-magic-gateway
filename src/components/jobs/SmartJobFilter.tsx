
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Brain, Target, Zap, CheckCircle2, Info } from 'lucide-react';
import { getResumeProfile } from '@/utils/resumeAnalysis';
import { getMatchedJobs, JobMatch } from '@/utils/jobMatching';
import { toast } from 'sonner';

interface SmartJobFilterProps {
  jobs: any[];
  onJobsFiltered: (filteredJobs: any[]) => void;
  appliedJobs: number[];
  onApplyJobs: (jobIds: number[]) => void;
}

const SmartJobFilter: React.FC<SmartJobFilterProps> = ({
  jobs,
  onJobsFiltered,
  appliedJobs,
  onApplyJobs
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [minMatchScore, setMinMatchScore] = useState([50]);
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const [matchedJobs, setMatchedJobs] = useState<any[]>([]);
  const [hasResume, setHasResume] = useState(false);

  useEffect(() => {
    const resumeProfile = getResumeProfile();
    setHasResume(!!resumeProfile);
    
    if (isEnabled && resumeProfile) {
      const filtered = getMatchedJobs(jobs, resumeProfile, minMatchScore[0]);
      setMatchedJobs(filtered);
      onJobsFiltered(filtered);
    } else {
      setMatchedJobs([]);
      onJobsFiltered(jobs);
    }
  }, [isEnabled, minMatchScore, jobs, onJobsFiltered]);

  const handleToggleFilter = (enabled: boolean) => {
    if (enabled && !hasResume) {
      toast.error('Resume required', {
        description: 'Please upload your resume in the Profile section to use smart filtering.',
      });
      return;
    }
    setIsEnabled(enabled);
  };

  const handleJobSelection = (jobId: number) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleSelectAll = () => {
    const availableJobs = matchedJobs
      .filter(job => !appliedJobs.includes(job.id))
      .map(job => job.id);
    setSelectedJobs(availableJobs);
  };

  const handleApplySelected = () => {
    if (selectedJobs.length === 0) {
      toast.error('No jobs selected', {
        description: 'Please select at least one job to apply.',
      });
      return;
    }
    
    onApplyJobs(selectedJobs);
    setSelectedJobs([]);
    toast.success(`Applied to ${selectedJobs.length} jobs!`);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <div className="space-y-4">
      {/* Smart Filter Toggle */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg">Smart Job Matching</CardTitle>
            </div>
            <Switch
              checked={isEnabled}
              onCheckedChange={handleToggleFilter}
              disabled={!hasResume}
            />
          </div>
          <CardDescription>
            {hasResume 
              ? "Automatically filter jobs based on your resume and preferences"
              : "Upload your resume to enable smart job matching"
            }
          </CardDescription>
        </CardHeader>
        
        {isEnabled && (
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Minimum Match Score: {minMatchScore[0]}%
              </label>
              <Slider
                value={minMatchScore}
                onValueChange={setMinMatchScore}
                max={100}
                min={20}
                step={10}
                className="w-full"
              />
            </div>
            
            {matchedJobs.length > 0 && (
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-gray-600">
                  Found {matchedJobs.length} matching jobs
                </p>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                  >
                    Select All
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleApplySelected}
                    disabled={selectedJobs.length === 0}
                  >
                    Apply to Selected ({selectedJobs.length})
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* Matched Jobs Display */}
      {isEnabled && matchedJobs.length > 0 && (
        <div className="space-y-3">
          {matchedJobs.slice(0, 10).map((job) => (
            <Card key={job.id} className="relative">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold">{job.title}</h3>
                      <Badge 
                        className={`${getMatchScoreColor(job.match.matchScore)} text-white`}
                      >
                        {job.match.matchScore}% Match
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {job.company} • {job.location}
                    </p>
                    
                    {/* Match Reasons */}
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <Info className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Why this matches:</span>
                      </div>
                      <ul className="text-xs text-gray-600 space-y-1 ml-5">
                        {job.match.matchReasons.map((reason: string, index: number) => (
                          <li key={index} className="flex items-center space-x-1">
                            <div className="h-1 w-1 bg-gray-400 rounded-full" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!appliedJobs.includes(job.id) && (
                      <Button
                        variant={selectedJobs.includes(job.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleJobSelection(job.id)}
                      >
                        {selectedJobs.includes(job.id) ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Selected
                          </>
                        ) : (
                          'Select'
                        )}
                      </Button>
                    )}
                    {appliedJobs.includes(job.id) && (
                      <Badge variant="secondary">Applied</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartJobFilter;
