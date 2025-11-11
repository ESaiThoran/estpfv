import type React from "react"
import { LumaSpin } from "../ui/luma-spin"

interface PageLoaderProps {
  isVisible: boolean
}

export const PageLoader: React.FC<PageLoaderProps> = ({ isVisible }) => {
  if (!isVisible) return null

  return (
    <>
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary/30 via-primary to-primary/30 animate-pulse">
          <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Corner Spinner */}
      <div className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-border/50">
        <LumaSpin size="sm" />
      </div>

      {/* Optional: Subtle overlay */}
      <div className="fixed inset-0 z-40 bg-background/5 pointer-events-none" />

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </>
  )
}
