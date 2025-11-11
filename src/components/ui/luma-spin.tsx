import React from 'react'

interface LumaSpinProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LumaSpin: React.FC<LumaSpinProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeConfig = {
    sm: { width: 32, height: 32, inset: 16 },
    md: { width: 65, height: 65, inset: 32 }, 
    lg: { width: 80, height: 80, inset: 40 }
  }

  const config = sizeConfig[size]
  const animationName = `loaderAnim-${size}`

  const spinnerStyle = {
    animation: `${animationName} 2.5s infinite`
  }

  const delayedSpinnerStyle = {
    animation: `${animationName} 2.5s infinite`,
    animationDelay: '-1.25s'
  }

  return (
    <div 
      className={`relative ${className}`}
      style={{ width: config.width, height: config.height }}
    >
      <span 
        className="absolute rounded-[50px] shadow-[inset_0_0_0_3px] shadow-gray-800 dark:shadow-gray-100"
        style={{
          ...spinnerStyle,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
      <span 
        className="absolute rounded-[50px] shadow-[inset_0_0_0_3px] shadow-gray-800 dark:shadow-gray-100"
        style={{
          ...delayedSpinnerStyle,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
      <style>{`
        @keyframes ${animationName} {
          0% {
            inset: 0 ${config.inset}px ${config.inset}px 0;
          }
          12.5% {
            inset: 0 ${config.inset}px 0 0;
          }
          25% {
            inset: ${config.inset}px ${config.inset}px 0 0;
          }
          37.5% {
            inset: ${config.inset}px 0 0 0;
          }
          50% {
            inset: ${config.inset}px 0 0 ${config.inset}px;
          }
          62.5% {
            inset: 0 0 0 ${config.inset}px;
          }
          75% {
            inset: 0 0 ${config.inset}px ${config.inset}px;
          }
          87.5% {
            inset: 0 0 ${config.inset}px 0;
          }
          100% {
            inset: 0 ${config.inset}px ${config.inset}px 0;
          }
        }
      `}</style>
    </div>
  )
}

// Re-export for backward compatibility
export const Component = LumaSpin
