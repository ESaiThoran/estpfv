import React from "react";
import { AnimatedBackground } from "./animated-background";
import { cn } from "@/lib/utils";

interface BackgroundWrapperProps {
  children: React.ReactNode;
  variant?: "hero" | "section" | "minimal";
  className?: string;
  showShapes?: boolean;
  overlay?: boolean;
}

export function BackgroundWrapper({
  children,
  variant = "section",
  className,
  showShapes = true,
  overlay = false,
}: BackgroundWrapperProps) {
  return (
    <div className={cn("relative", className)}>
      <AnimatedBackground 
        variant={variant} 
        showShapes={showShapes}
        className="absolute inset-0"
      />
      
      {overlay && (
        <div className="absolute inset-0 bg-background/10 backdrop-blur-[1px]" />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}