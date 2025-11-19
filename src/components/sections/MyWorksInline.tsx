import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import InlineVideoPlayer from '../ui/video-player';

// Import video assets
import deakinLogoVideo from '@/assets/deakin_logov.mp4';
import nikeVideo from '@/assets/nikev.mp4';
import drPepperVideo from '@/assets/drpepperv.mp4';
import cehVideo from '@/assets/cehv.mp4';
import phishingVideo from '@/assets/phishingv.mp4';
import phishingVideo from '@/assets/teslafigma.mp4';

type TransitionPhase = 'idle' | 'overlay' | 'background' | 'content' | 'closing';

interface MyWorksInlineProps {
  isVisible: boolean;
  onClose: () => void;
  initialTab?: 'works' | 'videos';
  initialVideoId?: number;
  transitionPhase?: TransitionPhase;
  onBackgroundComplete?: () => void;
}

const MyWorksInline = ({ 
  isVisible, 
  onClose, 
  initialTab = 'works', 
  initialVideoId,
  transitionPhase = 'idle',
  onBackgroundComplete
}: MyWorksInlineProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isTabTransitioning, setIsTabTransitioning] = useState(false);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right');
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState<string | null>(null);
  
  // Ref for scroll tracking in My Works container only
  const containerRef = useRef<HTMLDivElement>(null);
  // Refs to store video player containers for pausing
  const videoRefs = useRef<{ [key: string]: HTMLDivElement }>({});

  // Prevent body scroll when overlay is visible
  useEffect(() => {
    if (isVisible) {
      // Get scrollbar width before disabling scroll
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Store original styles
      const originalOverflow = window.getComputedStyle(document.body).overflow;
      const originalPaddingRight = window.getComputedStyle(document.body).paddingRight;
      
      // Disable body scroll and add padding to compensate for scrollbar
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // Re-enable body scroll and remove padding on cleanup
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isVisible]);

  // Reset states when component becomes visible
  useEffect(() => {
    if (isVisible && transitionPhase === 'idle') {
      setBackgroundVisible(false);
      setContentVisible(false);
    }
  }, [isVisible, transitionPhase]);

  // Update tab when props change
  useEffect(() => {
    setActiveTab(initialTab);
    
    // If a specific videoId is provided and we're on videos tab, scroll to that video after render
    if (initialTab === 'videos' && initialVideoId && contentVisible) {
      setTimeout(() => {
        const el = document.getElementById(`video-${initialVideoId}`);
        if (el && containerRef.current) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 700); // Give time for the animations to complete
    }
  }, [initialTab, initialVideoId, contentVisible]);

  // Handle transition phases
  useEffect(() => {
    if (transitionPhase === 'content') {
      // Show background immediately when content phase starts
      setBackgroundVisible(true);
      // Start content animation after a brief delay
      setTimeout(() => {
        setContentVisible(true);
      }, 150);
    } else if (transitionPhase === 'closing') {
      setContentVisible(false);
      setTimeout(() => {
        setBackgroundVisible(false);
      }, 250);
    }
  }, [transitionPhase]);

  const handleTabChange = (tab: 'works' | 'videos') => {
    if (tab === activeTab || isTabTransitioning) return;
    
    // Pause all videos when switching tabs
    pauseAllVideos();
    
    // Determine transition direction for smooth animations
    setTransitionDirection(tab === 'videos' ? 'left' : 'right');
    
    setIsTabTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      // Scroll to top when changing tabs
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
      setTimeout(() => {
        setIsTabTransitioning(false);
      }, 450);
    }, 100);
  };

  // Function to pause all videos except the one that's starting to play
  const pauseAllVideos = (exceptVideoId?: string) => {
    Object.keys(videoRefs.current).forEach(videoId => {
      if (videoId !== exceptVideoId) {
        const videoContainer = videoRefs.current[videoId];
        if (videoContainer && (videoContainer as any).pauseVideo) {
          (videoContainer as any).pauseVideo();
        }
      }
    });
  };

  // Handle when a video starts playing
  const handleVideoPlay = (videoId: string) => {
    setCurrentPlayingVideo(videoId);
    pauseAllVideos(videoId);
  };

  const worksData = [
    {
      id: 1,
      title: "Logo animation",
      description: "Logo animation for Deakin University.",
      videoUrl: deakinLogoVideo,
      category: "Design, animation"
    },
    {
      id: 2,
      title: "NIKE ",
      description: "Nike motion design and figma animation.",
      videoUrl: nikeVideo,
      category: "Figma, Motion design"
    },
    {
      id: 3,
      title: "Dr.Pepper",
      description: "Dr.Pepper motion design and figma animation.",
      videoUrl: drPepperVideo,
      category: "Figma, Motion design"
    },
    {
      id: 4,
      title: "TESLA",
      description: "Tesla Model S motion design and figma animation.",
      videoUrl: teslafigma,
      category: "Figma, Motion design"
    },
    {
      id: 5,
      title: "College-Event-Hub",
      description: "UI/UX design for web application and full Stack development.",
      videoUrl: cehVideo,
      category: "Design and Web Development"
    },
    {
      id: 6,
      title: "Extension",
      description: "AI-powered phishing detection Chrome extension.",
      videoUrl: phishingVideo,
      category: "AI/ML, Cyber Security"
    }
  ];

  const videoData = [
    {
      id: 1,
      title: "Logo animation",
      description: "Logo animation for Deakin University.",
      videoUrl: deakinLogoVideo,
    },
    {
      id: 2,
      title: "NIKE ",
      description: "Nike motion design and figma animation.",
      videoUrl: nikeVideo,
    },
    {
      id: 3,
      title: "Dr.Pepper",
      description: "Dr.Pepper motion design and figma animation.",
      videoUrl: drPepperVideo,
    },
    {
      id: 4,
      title: "TESLA",
      description: "Tesla Model S motion design and figma animation.",
      videoUrl: teslafigma,
      category: "Figma, Motion design"
    },
    {
      id: 5,
      title: "College-Event-Hub",
      description: "UI/UX design for web application and full Stack development.",
      videoUrl: cehVideo,
    },
    {
      id: 6,
      title: "Extension",
      description: "AI-powered phishing detection Chrome extension.",
      videoUrl: phishingVideo,
    }
  ];

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {/* Full Screen Background Layer with isolated scroll */}
      <motion.div
        ref={containerRef}
        initial={{ y: '100%' }}
        animate={backgroundVisible ? { y: 0 } : { y: '100%' }}
        exit={{ y: '100%' }}
        transition={{ 
          duration: 0.45,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="fixed inset-0 z-50 text-foreground selection:bg-accent/30 selection:text-primary overflow-auto"
        style={{
          background: 'transparent',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent',
          pointerEvents: 'auto' // Ensure this layer captures scroll events
        }}
      >
        {/* Close Button - Motion from left */}
        <motion.button 
          initial={{ x: -100, opacity: 0 }}
          animate={{ 
            x: contentVisible ? 0 : -100, 
            opacity: contentVisible ? 1 : 0 
          }}
          transition={{ 
            duration: 0.5,
            delay: contentVisible ? 0.1 : 0,
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          onClick={onClose}
          className="fixed top-8 left-6 z-50 px-4 py-2 rounded-lg border-2 border-white bg-white text-black hover:border-white transition-all duration-300 flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 group"
        >
          <IoClose className="text-lg transition-transform duration-300 group-hover:rotate-180" />
          Close
        </motion.button>

        {/* Tab Navigation - Motion from right */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ 
            x: contentVisible ? 0 : 100, 
            opacity: contentVisible ? 1 : 0 
          }}
          transition={{ 
            duration: 0.5,
            delay: contentVisible ? 0.15 : 0,
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          className="fixed top-8 right-6 z-50"
        >
          <div className="flex space-x-1 bg-black/40 backdrop-blur-sm p-1 rounded-lg shadow-lg border border-white/20">
            <button
              onClick={() => handleTabChange('works')}
              disabled={isTabTransitioning}
              className={`px-6 py-2 rounded-md transition-all duration-300 border disabled:opacity-50 ${
                activeTab === 'works'
                  ? 'bg-white text-black border-white shadow-lg scale-105'
                  : 'bg-transparent text-white border-transparent hover:bg-white/10 hover:border-white/20 hover:scale-105'
              }`}
            >
              My Works
            </button>
            <button
              onClick={() => handleTabChange('videos')}
              disabled={isTabTransitioning}
              className={`px-6 py-2 rounded-md transition-all duration-300 border disabled:opacity-50 ${
                activeTab === 'videos'
                  ? 'bg-white text-black border-white shadow-lg scale-105'
                  : 'bg-transparent text-white border-transparent hover:bg-white/10 hover:border-white/20 hover:scale-105'
              }`}
            >
              Project Videos
            </button>
          </div>
        </motion.div>

        <main className="container pb-16 pt-24">

          {/* Tab Content Container with directional sliding */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ 
              y: contentVisible ? 0 : 80, 
              opacity: contentVisible ? 1 : 0 
            }}
            transition={{ 
              duration: 0.6, 
              delay: contentVisible ? 0.3 : 0,
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {activeTab === 'works' && (
                <motion.div
                  key="works"
                  initial={{ 
                    x: isTabTransitioning ? (transitionDirection === 'right' ? '-100%' : '100%') : 0, 
                    opacity: isTabTransitioning ? 0 : 1 
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ 
                    x: transitionDirection === 'left' ? '-100%' : '100%', 
                    opacity: 0 
                  }}
                  transition={{ 
                    duration: 0.45, 
                    ease: [0.25, 0.46, 0.45, 0.94] 
                  }}
                  className="space-y-8"
                >
                  {worksData.map((work, index) => (
                    <motion.div
                      key={work.id}
                      initial={{ 
                        x: isTabTransitioning ? (transitionDirection === 'right' ? -50 : 50) : 0,
                        y: 40, 
                        opacity: 0, 
                        scale: 0.95 
                      }}
                      animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      exit={{
                        x: transitionDirection === 'left' ? -50 : 50,
                        y: -20,
                        opacity: 0,
                        scale: 0.95
                      }}
                      transition={{ 
                        duration: 0.45, 
                        delay: index * 0.08,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      // EDIT: Decreased card size - reduced max-width from full to 4xl and added margin auto for centering
                      className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-sm shadow-2xl"
                    >
                      <div className="flex items-center gap-2 p-4 pb-2">
                        <span className="text-xs px-3 py-1 bg-gradient-to-r from-blue-500/25 to-purple-500/25 text-blue-300 rounded-full border border-blue-400/30 backdrop-blur-sm">
                          {work.category}
                        </span>
                      </div>
                      {/* Using InlineVideoPlayer component with video management */}
                      <div ref={(el) => el && (videoRefs.current[`work-${work.id}`] = el)}>
                        <InlineVideoPlayer
                          videoUrl={work.videoUrl}
                          title={work.title}
                          description={work.description}
                          className="text-white"
                          onPlay={() => handleVideoPlay(`work-${work.id}`)}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'videos' && (
                <motion.div
                  key="videos"
                  initial={{ 
                    x: isTabTransitioning ? (transitionDirection === 'left' ? '100%' : '-100%') : 0, 
                    opacity: isTabTransitioning ? 0 : 1 
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ 
                    x: transitionDirection === 'right' ? '100%' : '-100%', 
                    opacity: 0 
                  }}
                  transition={{ 
                    duration: 0.45, 
                    ease: [0.25, 0.46, 0.45, 0.94] 
                  }}
                  className="space-y-8"
                >
                  {videoData.map((video, index) => (
                    <motion.div
                      id={`video-${video.id}`}
                      key={video.id}
                      initial={{ 
                        x: isTabTransitioning ? (transitionDirection === 'left' ? 50 : -50) : 0,
                        y: 40, 
                        opacity: 0, 
                        scale: 0.95 
                      }}
                      animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      exit={{
                        x: transitionDirection === 'right' ? 50 : -50,
                        y: -20,
                        opacity: 0,
                        scale: 0.95
                      }}
                      transition={{ 
                        duration: 0.45, 
                        delay: index * 0.08,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      // EDIT: Decreased card size - reduced max-width from full to 4xl and added margin auto for centering
                      className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-sm shadow-2xl"
                    >
                      {/* Using InlineVideoPlayer component with video management */}
                      <div ref={(el) => el && (videoRefs.current[`video-${video.id}`] = el)}>
                        <InlineVideoPlayer
                          videoUrl={video.videoUrl}
                          title={video.title}
                          description={video.description}
                          className="text-white"
                          onPlay={() => handleVideoPlay(`video-${video.id}`)}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default MyWorksInline;

