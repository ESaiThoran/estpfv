import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface QuotationBadgeProps {
  shouldAnimate?: boolean;
}

export default function QuotationBadge({ shouldAnimate = false }: QuotationBadgeProps) {
  return (
    <>
      <style>{`
        @keyframes textShine {
          0% {
            background-position: -200% 0;
          }
          50% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        
        .text-shine {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(255, 255, 255, 0.6) 40%,
            rgba(255, 255, 255, 1) 50%,
            rgba(255, 255, 255, 0.6) 60%,
            rgba(255, 255, 255, 0.6) 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShine 3s ease-in-out infinite;
        }
      `}</style>
      
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        transition={{ duration: 0.8, delay: 3.9, ease: "easeOut" }}
        className="fixed top-8 left-8 z-40"
      >
        <div className="flex items-center gap-2 px-6 py-3 rounded-full text-white/90 overflow-hidden relative group"
             style={{
               background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 100%)',
               backdropFilter: 'blur(20px)',
               WebkitBackdropFilter: 'blur(20px)',
               border: '1px solid rgba(255,255,255,0.3)',
               boxShadow: `
                 0 8px 32px 0 rgba(31, 38, 135, 0.4),
                 inset 0 2px 4px rgba(255, 255, 255, 0.4),
                 inset 0 -2px 4px rgba(0, 0, 0, 0.1),
                 0 0 20px rgba(255, 255, 255, 0.2)
               `
             }}>
          {/* Inner glow overlay for enhanced glassmorphism */}
          <div className="absolute inset-0 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"
               style={{
                 background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 70%)',
               }}></div>
          
          <Quote className="w-5 h-5 text-white/90 relative z-10 drop-shadow-lg" />
          <span className="text-sm font-medium relative z-10">
            <span className="text-shine">
              "Teach me - I remember, Involve me - I learn"
            </span>
          </span>
        </div>
      </motion.div>
    </>
  );
}