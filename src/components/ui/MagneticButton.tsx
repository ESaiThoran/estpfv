import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  className, 
  children = "Send Message", 
  ...props 
}, ref) => {
  return (
    <button 
      ref={ref}
      className={cn(
        "cursor-pointer relative bg-white/10 py-2 rounded-full min-w-[8.5rem] min-h-[2.92rem] group max-w-full flex items-center justify-start",
        "border-2 border-green-400 hover:border-transparent transition-all duration-800",
        "shadow-[inset_1px_2px_5px_#00000080] hover:bg-green-400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2",
        className
      )}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      {...props}
    >
      <div className="absolute flex px-1 py-0.5 justify-start items-center inset-0">
        <div className="w-[0%] group-hover:w-full transition-all duration-1000" 
             style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }} />
        <div className="rounded-full shrink-0 flex justify-center items-center shadow-[inset_1px_-1px_3px_0_black] h-full aspect-square bg-green-400 
          transition-all duration-1000 group-hover:bg-black"
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <div className="size-[0.8rem] text-black group-hover:text-white group-hover:-rotate-45 transition-all duration-1000"
               style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" height="100%" width="100%">
              <path fill="currentColor" d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="pl-[3.4rem] pr-[1.1rem] group-hover:pl-[1.1rem] group-hover:pr-[3.4rem] 
        transition-all duration-1000 group-hover:text-black text-white"
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}>
        {children}
      </div>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;