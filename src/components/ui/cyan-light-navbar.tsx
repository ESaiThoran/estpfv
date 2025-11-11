import React, { useState, useRef, useLayoutEffect, useEffect, cloneElement } from 'react';

// --- Internal Types and Defaults ---

const DefaultUserIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const DefaultBriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const DefaultStackIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2-8 4 8 4 8-4-8-4"/><path d="m4 10 8 4 8-4"/><path d="m4 14 8 4 8-4"/></svg>;
const DefaultHandshakeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8.28a2 2 0 0 1 1.42.59l.22.22a2 2 0 0 0 1.42.59h2.28a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/></svg>;

type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  sectionId?: string;
  onClick?: () => void;
};

// Custom navigation items for the portfolio
const portfolioNavItems: NavItem[] = [
  { 
    id: 'about-me', 
    icon: <DefaultUserIcon />, 
    label: 'About Me',
    sectionId: 'home',
    onClick: () => {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }
  },
  { 
    id: 'experience', 
    icon: <DefaultBriefcaseIcon />, 
    label: 'Experience',
    sectionId: 'experience',
    onClick: () => {
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
    }
  },
  { 
    id: 'stack', 
    icon: <DefaultStackIcon />, 
    label: 'Tech Stack',
    sectionId: 'stack',
    onClick: () => {
      document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' });
    }
  },
  { 
    id: 'hire-me', 
    icon: <DefaultHandshakeIcon />, 
    label: 'Hire Me',
    sectionId: 'contact',
    onClick: () => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  },
];

type LimelightNavProps = {
  items?: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

/**
 * An adaptive-width navigation bar with a "limelight" effect that highlights the active item.
 */
export const LimelightNav = ({
  items = portfolioNavItems,
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'stack', 'projects', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 150; // Increased offset for better detection
      let activeSection = 'home'; // Default to home

      // Find the section that's currently most visible
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            activeSection = sectionId;
            break;
          }
        }
      }

      // Map section IDs to navigation item indices
      const sectionToIndexMap: { [key: string]: number } = {
        home: 0,           // About Me (User icon)
        experience: 1,     // Experience (Briefcase icon)
        stack: 2,          // Tech Stack (Stack icon)
        projects: 2,       // Projects -> map to Tech Stack
        certifications: 2, // Certifications -> map to Tech Stack
        contact: 3,        // Hire Me (Handshake icon)
      };
      
      // Special handling for stack section - map to Tech Stack
      let targetIndex = sectionToIndexMap[activeSection];
      
      // If we're in the stack section, always highlight Tech Stack
      if (activeSection === 'stack') {
        targetIndex = 2; // Tech Stack
      }
      
      if (targetIndex !== undefined && targetIndex !== activeIndex) {
        setActiveIndex(targetIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Call once on mount to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    const navContainer = limelight?.parentElement;
    
    if (limelight && activeItem && navContainer) {
      // Force a layout recalculation to ensure accurate measurements
      navContainer.offsetHeight;
      
      // Get precise measurements
      const containerRect = navContainer.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      
      // Calculate the center of the active item relative to the container
      const itemCenterRelativeToContainer = itemRect.left - containerRect.left + itemRect.width / 2;
      const limelightHalfWidth = limelight.offsetWidth / 2;
      
      // Position the limelight precisely at the center of the active item
      const newLeft = itemCenterRelativeToContainer - limelightHalfWidth;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) {
    return null; 
  }

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav className={`relative inline-flex items-center h-16 rounded-xl px-2 ${className}`} style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.08) 70%, rgba(255,255,255,0.05) 100%)',
      backdropFilter: 'blur(25px)',
      WebkitBackdropFilter: 'blur(25px)',
      border: '1px solid rgba(255,255,255,0.35)',
      boxShadow: `
        0 12px 40px 0 rgba(31, 38, 135, 0.5),
        inset 0 3px 6px rgba(255, 255, 255, 0.5),
        inset 0 -3px 6px rgba(0, 0, 0, 0.15),
        0 0 30px rgba(255, 255, 255, 0.25),
        0 4px 20px rgba(0, 0, 0, 0.1)
      `
    }}>
      {/* Inner glow overlay for enhanced glassmorphism */}
      <div className="absolute inset-0 rounded-xl opacity-60 pointer-events-none"
           style={{
             background: 'radial-gradient(ellipse at center top, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)',
           }}></div>
      
      <div className="relative z-10 flex items-center w-full">
        {items.map(({ id, icon, label, onClick }, index) => (
          <a
            key={id}
            ref={el => (navItemRefs.current[index] = el)}
            className={`relative z-20 flex h-full cursor-pointer items-center justify-center p-5 rounded-xl transition-all duration-300 group ${iconContainerClassName}`}
            onClick={() => handleItemClick(index, onClick)}
            aria-label={label}
          >
            {cloneElement(icon, {
              className: `w-6 h-6 transition-all duration-300 ease-in-out hover:scale-125 transform drop-shadow-lg ${
                activeIndex === index ? 'opacity-100 brightness-110' : 'opacity-50 group-hover:opacity-80'
              } ${icon.props.className || ''} ${iconClassName || ''}`,
            })}
          </a>
        ))}
      </div>

      <div 
        ref={limelightRef}
        className={`absolute top-0 z-10 w-11 h-[6px] rounded-full bg-cyan-400 ${
          isReady ? 'transition-[left] duration-400 ease-in-out' : ''
        } ${limelightClassName}`}
        style={{ 
          left: '-999px',
          transform: 'translateY(-3px)', // Move slightly above the navbar edge
          boxShadow: `
            0 0 20px rgb(34 211 238),
            0 0 40px rgb(34 211 238 / 0.7),
            0 50px 25px rgb(34 211 238 / 0.3),
            inset 0 1px 2px rgba(255,255,255,0.8)
          `
        }}
      >
        <div className="absolute left-[-30%] top-[6px] w-[160%] h-14 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-cyan-400/40 to-transparent pointer-events-none" />
        {/* Additional inner glow for the limelight */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/60 to-cyan-300/40" />
      </div>
    </nav>
  );
};