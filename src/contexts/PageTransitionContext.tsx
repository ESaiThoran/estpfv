import React, { createContext, useContext, useState, useCallback } from 'react';

interface PageTransitionContextType {
  isTransitioning: boolean;
  transitionDirection: 'left' | 'right' | 'up' | 'down';
  startTransition: (direction: 'left' | 'right' | 'up' | 'down') => Promise<void>;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within a PageTransitionProvider');
  }
  return context;
};

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right' | 'up' | 'down'>('up');

  const startTransition = useCallback(async (direction: 'left' | 'right' | 'up' | 'down') => {
    setTransitionDirection(direction);
    setIsTransitioning(true);
    
    // Return a promise that resolves after the transition is complete
    return new Promise<void>((resolve) => {
      // Add a small delay before starting the transition to sync with scrollbar changes
      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsTransitioning(false);
          resolve();
        }, 1000); // Reduced transition time for smoother experience
      });
    });
  }, []);

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, transitionDirection, startTransition }}>
      {children}
    </PageTransitionContext.Provider>
  );
};