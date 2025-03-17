
import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "purple" | "blue" | "green" | "default";
  hoverEffect?: "tilt" | "lift" | "both" | "none";
  children: React.ReactNode;
}

const Card3D = React.forwardRef<HTMLDivElement, Card3DProps>(
  ({ className, variant = "default", hoverEffect = "both", children, ...props }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case "purple":
          return "bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200 shadow-[0_8px_30px_rgb(156,114,239,0.2)] after:from-purple-500/20 after:to-transparent";
        case "blue":
          return "bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200 shadow-[0_8px_30px_rgb(59,130,246,0.2)] after:from-blue-500/20 after:to-transparent";
        case "green":
          return "bg-gradient-to-br from-green-100 to-green-50 border-green-200 shadow-[0_8px_30px_rgb(16,185,129,0.2)] after:from-green-500/20 after:to-transparent";
        default:
          return "bg-gradient-to-br from-gray-100 to-white border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.12)] after:from-gray-500/10 after:to-transparent";
      }
    };

    const getHoverEffectStyles = () => {
      switch (hoverEffect) {
        case "tilt":
          return "hover:rotate-1 hover:scale-[1.01] active:rotate-0 active:scale-100";
        case "lift":
          return "hover:-translate-y-2 active:-translate-y-1";
        case "both":
          return "hover:rotate-1 hover:scale-[1.01] hover:-translate-y-2 active:rotate-0 active:scale-100 active:-translate-y-1";
        case "none":
          return "";
      }
    };

    return (
      <Card
        ref={ref}
        className={cn(
          "relative overflow-hidden backdrop-blur-sm border transition-all duration-300 ease-out",
          "after:absolute after:inset-0 after:bg-gradient-to-tr after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none before:z-10",
          getVariantStyles(),
          getHoverEffectStyles(),
          // 3D effect with bottom shadow
          "transform-gpu translate-z-0",
          "shadow-[0_1px_1px_rgba(0,0,0,0.08),0_2px_2px_rgba(0,0,0,0.08),0_4px_4px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.08)]",
          "hover:shadow-[0_1px_1px_rgba(0,0,0,0.05),0_2px_2px_rgba(0,0,0,0.05),0_4px_4px_rgba(0,0,0,0.05),0_8px_8px_rgba(0,0,0,0.05),0_16px_16px_rgba(0,0,0,0.05)]",
          className
        )}
        {...props}
      >
        {children}
      </Card>
    );
  }
);
Card3D.displayName = "Card3D";

// Export the Card3D component along with the original Card subcomponents
export { Card3D, CardHeader, CardContent, CardFooter };
