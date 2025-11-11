import { motion, AnimatePresence } from 'framer-motion';
import { usePageTransition } from '@/contexts/PageTransitionContext';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { isTransitioning, transitionDirection } = usePageTransition();

  return (
    <>
      {/* Glassmorphism Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-xl border-t border-white/10"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Page Content */}
      <motion.div
        key={window.location.pathname}
        initial={false}
        animate={{ 
          x: 0, 
          y: 0, 
          opacity: 1,
          scale: 1 
        }}
        exit={getExitAnimation(transitionDirection)}
        transition={{ 
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: isTransitioning ? 0.4 : 0
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </>
  );
};

const getExitAnimation = (direction: 'left' | 'right' | 'up' | 'down') => {
  switch (direction) {
    case 'left':
      return { x: '-100%', opacity: 0, scale: 0.95 };
    case 'right':
      return { x: '100%', opacity: 0, scale: 0.95 };
    case 'up':
      return { y: '-100%', opacity: 0, scale: 0.95 };
    case 'down':
      return { y: '100%', opacity: 0, scale: 0.95 };
    default:
      return { y: '100%', opacity: 0, scale: 0.95 };
  }
};