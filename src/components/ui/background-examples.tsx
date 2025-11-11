import React from "react";
import { AnimatedBackground } from "./animated-background";
import { BackgroundWrapper } from "./background-wrapper";

// Example 1: Using AnimatedBackground directly as a full-screen background
export function FullScreenBackgroundExample() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed background that stays in place during scroll */}
      <AnimatedBackground 
        variant="hero" 
        className="fixed inset-0 z-0" 
        showShapes={true} 
      />
      
      {/* Your content goes here with relative z-10 */}
      <div className="relative z-10">
        <div className="container mx-auto py-20">
          <h1 className="text-4xl font-bold text-white">Your Content Here</h1>
          <p className="text-white/70 mt-4">This content appears over the animated background.</p>
        </div>
      </div>
    </div>
  );
}

// Example 2: Using BackgroundWrapper for sections
export function SectionBackgroundExample() {
  return (
    <BackgroundWrapper 
      variant="section" 
      showShapes={true}
      className="py-20"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Section Title</h2>
        <p className="text-white/70">Section content with animated background.</p>
      </div>
    </BackgroundWrapper>
  );
}

// Example 3: Minimal background for smaller sections
export function MinimalBackgroundExample() {
  return (
    <BackgroundWrapper 
      variant="minimal" 
      showShapes={false}
      overlay={true}
      className="py-10"
    >
      <div className="container mx-auto">
        <h3 className="text-xl font-semibold text-white">Minimal Section</h3>
        <p className="text-white/60">Subtle background without shapes.</p>
      </div>
    </BackgroundWrapper>
  );
}

// Example 4: Custom hero section with background
export function CustomHeroExample() {
  return (
    <div className="relative">
      <AnimatedBackground 
        variant="hero" 
        className="absolute inset-0"
        showShapes={true} 
      />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Crafting exceptional digital experiences
          </p>
          <button className="px-8 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white hover:bg-white/20 transition-all">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

// Usage in your existing components:
/*

// In your Hero component:
import { BackgroundWrapper } from "@/components/ui/background-wrapper";

const Hero = () => {
  return (
    <BackgroundWrapper variant="hero" showShapes={true}>
      // ... your existing hero content
    </BackgroundWrapper>
  );
};

// In other sections:
import { BackgroundWrapper } from "@/components/ui/background-wrapper";

const MyExperience = () => {
  return (
    <BackgroundWrapper variant="section" showShapes={false} overlay={true}>
      // ... your existing section content
    </BackgroundWrapper>
  );
};

// For full-page background (already added to App.tsx):
// The AnimatedBackground is now set as a fixed background layer in App.tsx,
// so it appears across all pages automatically.

*/