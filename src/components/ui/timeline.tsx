import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  
  // Calculate which dot should be active based on scroll progress
  useEffect(() => {
    const calculateActiveIndex = () => {
      if (!ref.current || data.length === 0) return;
      
      const currentHeight = heightTransform.get();
      const totalHeight = height;
      
      if (totalHeight === 0) return;
      
      const itemHeight = totalHeight / data.length;
      
      // Calculate which item we're currently at
      const index = Math.floor(currentHeight / itemHeight);
      const clampedIndex = Math.min(Math.max(index, -1), data.length - 1);
      setActiveIndex(clampedIndex);
    };
    
    const unsubscribe = heightTransform.onChange(calculateActiveIndex);
    
    // Also calculate on mount/height change
    calculateActiveIndex();
    
    return () => unsubscribe();
  }, [heightTransform, height, data.length]);

  // Recalculate height when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-6 px-4 md:px-8 lg:px-10">
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div 
                  className={`h-4 w-4 rounded-full transition-all duration-300 ${index <= activeIndex 
                    ? 'bg-blue-400 dark:bg-blue-600 border-2 border-white dark:border-white' 
                    : 'bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700'} p-2`} 
                />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-400 dark:via-neutral-800 to-transparent to-[85%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_85%,transparent_100%)] "
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;