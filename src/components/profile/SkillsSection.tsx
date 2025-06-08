
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SkillsSection: React.FC = () => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    // Load existing skills from localStorage
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      try {
        const profileData = JSON.parse(userProfile);
        if (profileData.skills) {
          setSkills(profileData.skills);
        }
      } catch (error) {
        console.error('Error loading skills:', error);
      }
    }
  }, []);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setNewSkill('');
      saveSkills(updatedSkills);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    saveSkills(updatedSkills);
  };

  const saveSkills = (updatedSkills: string[]) => {
    try {
      const existingProfile = localStorage.getItem('userProfile');
      const profileData = existingProfile ? JSON.parse(existingProfile) : {};
      
      const updatedProfile = {
        ...profileData,
        skills: updatedSkills,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      
      toast({
        title: "Skills Updated",
        description: "Your skills have been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving skills:', error);
      toast({
        title: "Error",
        description: "Failed to save your skills. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <Card className="bg-white/95 shadow-xl backdrop-blur-sm border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-purple-600">Skills & Technologies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="newSkill">Add a skill</Label>
              <Input
                id="newSkill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., React, Python, SQL..."
                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <Button
              onClick={addSkill}
              disabled={!newSkill.trim()}
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {skills.length > 0 && (
            <div className="space-y-2">
              <Label>Your Skills</Label>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors duration-200 group"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-2 hover:text-red-600 transition-colors duration-200"
                      aria-label={`Remove ${skill} skill`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {skills.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <p>No skills added yet. Start by adding your technical skills!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
