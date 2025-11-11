import { useState, useRef, useEffect } from 'react';
import { IoPlay, IoPause, IoVolumeHigh, IoVolumeMute, IoExpand, IoContract } from 'react-icons/io5';

interface InlineVideoPlayerProps {
  videoUrl: string;
  title: string;
  description?: string;
  className?: string;
  onPlay?: () => void; // Callback when video starts playing
  onPause?: () => void; // Callback when video is paused
}

const InlineVideoPlayer = ({ videoUrl, title, description, className = "", onPlay, onPause }: InlineVideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHoveringControls, setIsHoveringControls] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide controls functionality
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      
      // Clear existing timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      
      // Only hide controls if video is playing AND not hovering over controls
      if (isPlaying && !isHoveringControls) {
        hideTimeoutRef.current = setTimeout(() => {
          if (!isHoveringControls) { // Double check before hiding
            setShowControls(false);
          }
        }, 2000);
      }
    };

    const handleMouseLeave = () => {
      if (isPlaying && !isHoveringControls) {
        hideTimeoutRef.current = setTimeout(() => {
          if (!isHoveringControls) { // Double check before hiding
            setShowControls(false);
          }
        }, 1000);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isPlaying, isHoveringControls]);

  // Show controls when video is paused or hovering controls
  useEffect(() => {
    if (!isPlaying || isHoveringControls) {
      setShowControls(true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    }
  }, [isPlaying, isHoveringControls]);

  // Update time progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Enhanced viewport detection using Intersection Observer API
  useEffect(() => {
    if (!containerRef.current) return;

    const options = {
      // Root margin of -20% means the element needs to be at least 20% visible
      // This prevents videos from playing when they're barely visible
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0, 0.2, 0.5, 0.8] // Multiple thresholds for better detection
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
        
        // Auto-pause when video goes out of viewport
        if (!isVisible && isPlaying) {
          console.log('Auto-pausing video - out of viewport (Intersection Observer)');
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
            // Notify parent component about pause
            if (onPause) {
              onPause();
            }
          }
        }
      });
    }, options);

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isPlaying]);

  // Fallback scroll detection for additional safety
  useEffect(() => {
    if (!isPlaying) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if video is completely out of viewport
      const isCompletelyAbove = rect.bottom < 0;
      const isCompletelyBelow = rect.top > windowHeight;
      const isOutOfView = isCompletelyAbove || isCompletelyBelow;
      
      // Pause if completely out of view (fallback safety)
      if (isOutOfView && isPlaying) {
        console.log('Auto-pausing video - fallback scroll detection');
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
          // Notify parent component about pause
          if (onPause) {
            onPause();
          }
        }
      }
    };

    // Use passive listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isPlaying]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        console.log('Pausing current video');
        videoRef.current.pause();
        setIsPlaying(false);
        // Notify parent component about pause
        if (onPause) {
          onPause();
        }
      } else {
        console.log('Starting video - ensuring single playback');
        // IMPORTANT: Call onPlay callback BEFORE playing to pause other videos
        if (onPlay) {
          onPlay(); // This will pause all other videos
        }
        
        // Check if video is in viewport before playing
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const isInViewport = rect.top < windowHeight && rect.bottom > 0;
          
          if (!isInViewport) {
            console.log('Video not in viewport, not starting playback');
            return;
          }
        }
        
        // Small delay to ensure other videos are paused first
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play().then(() => {
              setIsPlaying(true);
              console.log('Video started playing');
            }).catch((error) => {
              console.error('Error playing video:', error);
              setIsPlaying(false);
            });
          }
        }, 50);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const handleVideoClick = () => {
    togglePlayPause();
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    // Notify parent component about pause/end
    if (onPause) {
      onPause();
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // This prevents the video click handler from firing
    if (!videoRef.current || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Enhanced pause video function - more reliable with immediate state update
  const pauseVideo = () => {
    if (videoRef.current) {
      const wasPlaying = isPlaying;
      if (wasPlaying) {
        console.log('Force pausing video');
        // Immediately update state to prevent race conditions
        setIsPlaying(false);
        videoRef.current.pause();
        // Notify parent component about pause
        if (onPause) {
          onPause();
        }
      }
      return wasPlaying; // Return if it was actually paused
    }
    return false;
  };

  // Get current playing state
  const getPlayingState = () => {
    return isPlaying;
  };

  // Expose control methods via ref for parent component access
  useEffect(() => {
    if (containerRef.current) {
      (containerRef.current as any).pauseVideo = pauseVideo;
      (containerRef.current as any).isPlaying = getPlayingState;
      (containerRef.current as any).getVideoElement = () => videoRef.current;
    }
  }, [isPlaying]);

  // Handle control hover states
  const handleControlsMouseEnter = () => {
    setIsHoveringControls(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  };

  const handleControlsMouseLeave = () => {
    setIsHoveringControls(false);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Container */}
      <div 
        ref={containerRef}
        className={`relative bg-black cursor-pointer ${isFullscreen ? 'fixed inset-0 z-50' : 'aspect-video'}`}
        onClick={handleVideoClick}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          muted={isMuted}
          preload="metadata"
          onEnded={handleVideoEnded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => {
            setIsPlaying(false);
            // Notify parent component about pause
            if (onPause) {
              onPause();
            }
          }}
          controls={false}
          style={{ outline: 'none' }}
        >
          Your browser does not support the video tag.
        </video>

        {/* Custom Controls Overlay with black backgrounds */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Timeline Container with black background */}
          <div 
            className={`absolute left-4 right-4 ${isFullscreen ? 'bottom-20' : 'bottom-16'}`}
            onMouseEnter={handleControlsMouseEnter}
            onMouseLeave={handleControlsMouseLeave}
          >
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3">
              <div 
                className="w-full h-2 bg-white/30 rounded-full cursor-pointer mb-2"
                onClick={handleTimelineClick}
              >
                <div 
                  className="h-full bg-white rounded-full transition-all duration-150 pointer-events-none"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              {/* Time Display */}
              <div className="flex justify-between text-white text-xs">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* Bottom Left Controls - Play/Pause with black background */}
          <div 
            className={`absolute left-4 ${isFullscreen ? 'bottom-4' : 'bottom-4'}`}
            onMouseEnter={handleControlsMouseEnter}
            onMouseLeave={handleControlsMouseLeave}
          >
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayPause();
                }}
                className="p-2 rounded-lg bg-black/60 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
              >
                {isPlaying ? <IoPause className="w-5 h-5 pointer-events-none" /> : <IoPlay className="w-5 h-5 ml-0.5 pointer-events-none" />}
              </button>
            </div>
          </div>

          {/* Bottom Right Controls - Sound and Fullscreen with black background */}
          <div 
            className={`absolute right-4 flex items-center gap-2 ${isFullscreen ? 'bottom-4' : 'bottom-4'}`}
            onMouseEnter={handleControlsMouseEnter}
            onMouseLeave={handleControlsMouseLeave}
          >
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-1 flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="p-2 rounded-lg bg-black/60 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
              >
                {isMuted ? <IoVolumeMute className="w-5 h-5 pointer-events-none" /> : <IoVolumeHigh className="w-5 h-5 pointer-events-none" />}
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                className="p-2 rounded-lg bg-black/60 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
              >
                {isFullscreen ? <IoContract className="w-5 h-5 pointer-events-none" /> : <IoExpand className="w-5 h-5 pointer-events-none" />}
              </button>
            </div>
          </div>

          {/* Center Play Button - Only show when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-black/80 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                <IoPlay className="w-8 h-8 text-white ml-1 pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Info - Hide in fullscreen */}
      {!isFullscreen && (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InlineVideoPlayer;