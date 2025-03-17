
import React from 'react';
import { User } from 'lucide-react';
import { Card3D, CardContent } from '@/components/ui/card-3d';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface UserProfileCardProps {
  userName: string;
  variant?: "desktop" | "mobile";
}

const UserProfileCard = ({ userName, variant = "desktop" }: UserProfileCardProps) => {
  if (variant === "mobile") {
    return (
      <div className="px-4 py-3">
        <Card3D variant="purple" hoverEffect="tilt" className="mb-2">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-purple-100 p-1">
                <User className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Welcome,</p>
                <p className="font-medium text-purple-700 text-sm">{userName}</p>
              </div>
            </div>
          </CardContent>
        </Card3D>
      </div>
    );
  }

  return (
    <div className="px-4 mt-4">
      <Card3D 
        variant="purple" 
        hoverEffect="both"
        className="mx-auto transition-all duration-500"
      >
        <CardContent className="p-4">
          <div className="text-center py-1">
            <div className="inline-block rounded-full bg-purple-100 p-2 mb-2">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-gray-800">Welcome,</p>
            <HoverCard>
              <HoverCardTrigger asChild>
                <p className="font-bold text-purple-700 cursor-pointer">
                  {userName}
                </p>
              </HoverCardTrigger>
              <HoverCardContent className="w-60 text-sm">
                <div className="space-y-1">
                  <h4 className="font-medium">Profile Stats</h4>
                  <div className="text-xs text-muted-foreground">
                    <p>• Profile 80% complete</p>
                    <p>• Member since {new Date().toLocaleDateString()}</p>
                    <p>• 3 job applications</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </CardContent>
      </Card3D>
    </div>
  );
};

export default UserProfileCard;
