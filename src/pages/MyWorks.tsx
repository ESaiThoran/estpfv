import { useNavigate, useSearchParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper, StaggeredContent } from '@/components/ui/page-wrapper';
import { useTransitionNavigation } from '@/hooks/useTransitionNavigation';
import InlineVideoPlayer from '@/components/ui/video-player';

// Import video assets
import deakinLogoVideo from '@/assets/deakin_logov.mp4';
import nikeVideo from '@/assets/nikev.mp4';
import drPepperVideo from '@/assets/drpepperv.mp4';
import cehVideo from '@/assets/cehv.mp4';
import phishingVideo from '@/assets/phishingv.mp4';
import teslaVideo from '@/assets/teslafigma.mp4';

const MyWorks = () => {
  const navigate = useNavigate();
  const { goBackWithTransition } = useTransitionNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('works');
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState<string | null>(null);
  
  // Enhanced refs to store video player containers for pausing
  const videoRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize tab from URL params and ensure we scroll to top on mount or tab change
  useEffect(() => {
    const tab = searchParams.get('tab') || 'works';
    setActiveTab(tab);
    // If a specific videoId is provided, scroll to that video after render
    const videoIdParam = searchParams.get('videoId');
    if (tab === 'videos' && videoIdParam) {
      const el = document.getElementById(`video-${videoIdParam}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    } else {
      // Default scroll to top when navigating here or switching tabs
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [searchParams]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clean up timeouts and pause videos on unmount
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
      pauseAllVideosImmediate();
    };
  }, []);

  const handleTabChange = (tab: string) => {
    // Immediately pause all videos when switching tabs
    pauseAllVideosImmediate();
    
    setActiveTab(tab);
    // Replace the current history entry to avoid backtracking through tab changes
    setSearchParams({ tab }, { replace: true });
  };

  const handleBack = () => {
    // Immediately pause all videos before navigating back
    pauseAllVideosImmediate();
    goBackWithTransition();
  };

  // Enhanced function to pause all videos except the one that's starting to play
  const pauseAllVideos = (exceptVideoId?: string) => {
    console.log('Pausing all videos except:', exceptVideoId);
    
    // Clear any pending pause operations
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    
    let pausedCount = 0;
    Object.keys(videoRefs.current).forEach(videoId => {
      if (videoId !== exceptVideoId) {
        const videoContainer = videoRefs.current[videoId];
        if (videoContainer) {
          // Check if the video is currently playing
          const isCurrentlyPlaying = (videoContainer as any).isPlaying?.();
          
          if (isCurrentlyPlaying && (videoContainer as any).pauseVideo) {
            console.log(`Pausing video: ${videoId}`);
            (videoContainer as any).pauseVideo();
            pausedCount++;
          }
        }
      }
    });
    
    console.log(`Paused ${pausedCount} videos`);
    
    // Update current playing video state
    if (exceptVideoId) {
      setCurrentPlayingVideo(exceptVideoId);
    } else {
      setCurrentPlayingVideo(null);
    }
  };

  // Enhanced video play handler with better state management
  const handleVideoPlay = (videoId: string) => {
    console.log(`Video play initiated: ${videoId}`);
    
    // Immediately pause all other videos
    pauseAllVideos(videoId);
    
    // Set a small delay to ensure other videos are fully paused
    pauseTimeoutRef.current = setTimeout(() => {
      setCurrentPlayingVideo(videoId);
      console.log(`Current playing video set to: ${videoId}`);
    }, 100);
  };

  // Handle video pause
  const handleVideoPause = (videoId: string) => {
    console.log(`Video paused: ${videoId}`);
    if (currentPlayingVideo === videoId) {
      setCurrentPlayingVideo(null);
    }
  };

  // Enhanced pause all videos when switching tabs or navigating away
  const pauseAllVideosImmediate = () => {
    console.log('Immediately pausing all videos');
    
    Object.keys(videoRefs.current).forEach(videoId => {
      const videoContainer = videoRefs.current[videoId];
      if (videoContainer && (videoContainer as any).pauseVideo) {
        (videoContainer as any).pauseVideo();
      }
    });
    
    setCurrentPlayingVideo(null);
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
      videoUrl: teslaVideo,
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
      videoUrl: teslaVideo,
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

  return (
    <PageWrapper className="bg-background text-foreground selection:bg-accent/30 selection:text-primary">
      {/* Fixed Back Button - No animation */}
      <button 
        onClick={handleBack} 
        className="fixed top-6 left-6 z-50 px-4 py-2 rounded-lg border-2 border-white bg-black/80 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2"
      >
        <IoArrowBack className="text-lg" />
        Back
      </button>

      {/* Fixed Tab Navigation - No animation */}
      <div className="fixed top-6 right-6 z-50 flex space-x-1 bg-black/80 backdrop-blur-sm p-1 rounded-lg shadow-lg border-2 border-white">
        <button
          onClick={() => handleTabChange('works')}
          className={`px-6 py-2 rounded-md transition-all duration-200 border ${
            activeTab === 'works'
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-white border-transparent hover:bg-white hover:text-black hover:border-white'
          }`}
        >
          My Works
        </button>
        <button
          onClick={() => handleTabChange('videos')}
          className={`px-6 py-2 rounded-md transition-all duration-200 border ${
            activeTab === 'videos'
              ? 'bg-white text-black border-white'
              : 'bg-transparent text-white border-transparent hover:bg-white hover:text-black hover:border-white'
          }`}
        >
          Project Videos
        </button>
      </div>

      <main className="container pt-16 pb-16">

        {/* Animated Tab Content */}
        <StaggeredContent delay={0.8}>
          <AnimatePresence mode="wait">
            {activeTab === 'works' && (
              <motion.div
                key="works"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-8"
              >
                {worksData.map((work, index) => (
                  <motion.div
                    key={work.id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    // EDIT: Decreased card size - reduced max-width and added margin auto for centering
                    className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-border bg-card/60"
                  >
                    <div className="flex items-center gap-2 p-4 pb-2">
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {work.category}
                      </span>
                    </div>
                    {/* Using InlineVideoPlayer component with video management */}
                    <div ref={(el) => el && (videoRefs.current[`work-${work.id}`] = el)}>
                      <InlineVideoPlayer
                        videoUrl={work.videoUrl}
                        title={work.title}
                        description={work.description}
                        onPlay={() => handleVideoPlay(`work-${work.id}`)}
                        onPause={() => handleVideoPause(`work-${work.id}`)}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'videos' && (
              <motion.div
                key="videos"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-8"
              >
                {videoData.map((video, index) => (
                  <motion.div
                    id={`video-${video.id}`}
                    key={video.id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    // EDIT: Decreased card size - reduced max-width and added margin auto for centering
                    className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-border bg-card/60"
                  >
                    {/* Using InlineVideoPlayer component with video management */}
                    <div ref={(el) => el && (videoRefs.current[`video-${video.id}`] = el)}>
                      <InlineVideoPlayer
                        videoUrl={video.videoUrl}
                        title={video.title}
                        description={video.description}
                        onPlay={() => handleVideoPlay(`video-${video.id}`)}
                        onPause={() => handleVideoPause(`video-${video.id}`)}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </StaggeredContent>
      </main>
    </PageWrapper>
  );
};

export default MyWorks;

