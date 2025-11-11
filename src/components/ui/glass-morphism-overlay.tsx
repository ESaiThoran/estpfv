import { motion, AnimatePresence } from 'framer-motion';

interface GlassMorphismOverlayProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const GlassMorphismOverlay = ({ isVisible, onComplete }: GlassMorphismOverlayProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ 
            duration: 0.5, // Reduced from 0.6 to match other transitions
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          onAnimationComplete={(definition) => {
            // Call onComplete when the overlay finishes sliding up
            // Only trigger when sliding up (y becomes 0), not when sliding down
            if ((definition as { y?: number }).y === 0 && onComplete) {
              onComplete();
            }
          }}
          className="fixed inset-0 z-40 glass-morphism-overlay"
          style={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.15) 0%, 
                rgba(255, 255, 255, 0.08) 25%, 
                rgba(120, 119, 198, 0.12) 50%, 
                rgba(255, 119, 198, 0.08) 75%, 
                rgba(120, 219, 255, 0.1) 100%
              ),
              radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)
            `,
            backdropFilter: 'blur(25px) saturate(1.2)',
            WebkitBackdropFilter: 'blur(25px) saturate(1.2)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1),
              0 20px 40px rgba(0, 0, 0, 0.2)
            `,
          }}
        >
          {/* Optional: Add subtle pattern or texture */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                               radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)`,
            }}
          />
          
          {/* Enhanced animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => {
              const size = Math.random() * 3 + 1;
              const colors = [
                'rgba(255, 255, 255, 0.4)',
                'rgba(120, 119, 198, 0.6)',
                'rgba(255, 119, 198, 0.5)',
                'rgba(120, 219, 255, 0.5)'
              ];
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    background: colors[Math.floor(Math.random() * colors.length)],
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.3)`,
                  }}
                  animate={{
                    opacity: [0.1, 0.8, 0.1],
                    scale: [0.3, 1.2, 0.3],
                    x: [0, Math.random() * 100 - 50, 0],
                    y: [0, Math.random() * 100 - 50, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: 'easeInOut',
                  }}
                />
              );
            })}
          </div>
          
          {/* Floating geometric shapes */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`shape-${i}`}
                className="absolute border border-white/20 rounded-lg"
                style={{
                  width: `${20 + Math.random() * 40}px`,
                  height: `${20 + Math.random() * 40}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                  backdropFilter: 'blur(10px)',
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  rotate: [0, 360],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: 'linear',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlassMorphismOverlay;
