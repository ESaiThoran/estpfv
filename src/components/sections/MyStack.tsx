import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import React, { useState, useEffect } from "react";
import { 
  Code2, 
  Database, 
  GitBranch, 
  Zap, 
  Shield, 
  Palette, 
  Globe, 
  Terminal,
  FileCode
} from 'lucide-react';
import { 
  SiReact, 
  SiTypescript, 
  SiJavascript, 
  SiPython, 
  SiNodedotjs, 
  SiVite, 
  SiTailwindcss, 
  SiGit, 
  SiFigma, 
  SiDocker, 
  SiFramer, 
  SiNextdotjs, 
  SiMongodb, 
  SiPostgresql, 
  SiRedis, 
  SiAmazon, 
  SiGithub, 
  SiNpm, 
  SiYarn, 
  SiWebpack, 
  SiEslint, 
  SiPrettier, 
  SiVercel
} from 'react-icons/si';

const TECH_STACK = {
  // Programming Languages (for outer semicircle)
  programming: [
    { icon: Code2, name: 'C', color: '#A8B9CC', category: 'programming' },
    { icon: Code2, name: 'C++', color: '#00599C', category: 'programming' },
    { icon: SiPython, name: 'Python', color: '#3776AB', category: 'programming' },
    { icon: Code2, name: 'PHP', color: '#777BB4', category: 'programming' },
    { icon: Database, name: 'SQL (MySQL)', color: '#4479A1', category: 'programming' },
    { icon: SiMongodb, name: 'MongoDB', color: '#47A248', category: 'programming' },
    { icon: Globe, name: 'HTML', color: '#E34F26', category: 'programming' },
    { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4', category: 'programming' },
    { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E', category: 'programming' },
    { icon: SiReact, name: 'React', color: '#61DAFB', category: 'programming' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6', category: 'programming' },
    { icon: SiVite, name: 'Vite', color: '#646CFF', category: 'programming' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933', category: 'programming' }
  ],
  
  // Skills (for middle semicircle)
  skills: [
    { icon: Palette, name: 'Frontend Development', color: '#FF6B6B', category: 'skills' },
    { icon: Palette, name: 'UI/UX', color: '#4ECDC4', category: 'skills' },
    { icon: Shield, name: 'Penetration Testing', color: '#FF4444', category: 'skills' },
    { icon: Shield, name: 'Cryptography', color: '#9B59B6', category: 'skills' },
    { icon: Database, name: 'Data Analysis', color: '#3498DB', category: 'skills' },
    { icon: Shield, name: 'SEPM', color: '#E67E22', category: 'skills' }
  ],
  
  // Tools (for inner semicircle)
  tools: [
    { icon: SiGit, name: 'Git/GitHub', color: '#F05032', category: 'tools' },
    { icon: SiFigma, name: 'Figma', color: '#F24E1E', category: 'tools' },
    { icon: Palette, name: 'Adobe XD', color: '#FF61F6', category: 'tools' },
    { icon: Palette, name: 'Sketch', color: '#F7B500', category: 'tools' }
  ]
};

function SemiCircleOrbit({ radius, centerX, centerY, count, iconSize, techArray, isInView }: any) {
  return (
    <>
      {/* Semi-circle glow background */}
      <div className="absolute inset-0 flex justify-center">
        <div
          className="
            w-[1000px] h-[1000px] rounded-full 
            bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.25),transparent_70%)]
            dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25),transparent_70%)]
            blur-3xl 
            -mt-40 
            pointer-events-none
          "
          style={{ zIndex: 0 }}
        />
      </div>

      {/* Orbit icons with staggered animations */}
      {Array.from({ length: count }).map((_, index) => {
        const angle = (index / (count - 1)) * 180;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        const tech = techArray[index % techArray.length];
        const IconComponent = tech.icon;

        // Tooltip positioning — above or below based on angle
        const tooltipAbove = angle > 90;

        // Calculate staggered animation delay based on category
        const getCategoryDelay = () => {
          if (tech.category === 'programming') return 1.2 + (index * 0.1);
          if (tech.category === 'skills') return 2.7 + (index * 0.1);
          if (tech.category === 'tools') return 3.7 + (index * 0.1);
          return 1.2 + (index * 0.1);
        };

        return (
          <motion.div
            key={index}
            className="absolute flex flex-col items-center group"
            style={{
              left: `${centerX + x - iconSize / 2}px`,
              top: `${centerY - y - iconSize / 2}px`,
              zIndex: 5,
            }}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
            transition={{ 
              duration: 0.6, 
              delay: getCategoryDelay(), 
              ease: "easeOut" 
            }}
          >
            <div 
              className="
                p-3 rounded-xl 
                bg-white/10 dark:bg-black/10 
                border-2 border-white/20 dark:border-white/10
                backdrop-blur-sm 
                shadow-lg 
                cursor-pointer 
                transition-all duration-300 
                hover:scale-110 
                hover:-translate-y-2
                hover:bg-white/20 dark:hover:bg-white/5
                hover:border-white/30 dark:hover:border-white/20
                hover:shadow-xl
                group
              "
              style={{
                boxShadow: `0 4px 20px ${tech.color}20`,
                borderColor: tech.category === 'programming' ? '#3B82F6' : 
                           tech.category === 'skills' ? '#10B981' : '#8B5CF6'
              }}
            >
              <IconComponent 
                size={iconSize * 0.6} 
                style={{ color: tech.color }}
                className="transition-all duration-300 group-hover:drop-shadow-lg"
              />
            </div>

            {/* Enhanced Tooltip - Category label removed */}
            <div
              className={`absolute ${
                tooltipAbove ? "bottom-[calc(100%+12px)]" : "top-[calc(100%+12px)]"
              } hidden group-hover:block w-auto min-w-[120px] rounded-lg bg-black/90 dark:bg-white/90 px-3 py-2 text-xs text-white dark:text-black shadow-lg text-center backdrop-blur-sm border border-white/20`}
            >
              <div className="font-semibold">{tech.name}</div>
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-black/90 dark:bg-white/90 ${
                  tooltipAbove ? "top-full -mt-1" : "bottom-full -mb-1"
                }`}
              ></div>
            </div>
          </motion.div>
        );
      })}
    </>
  );
}

const MyStack = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const [size, setSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
		updateSize();
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	// Animation for each letter
	const titleText = "My Stack";
	const letterVariants = {
		hidden: { y: 50, opacity: 0 },
		visible: (i: number) => ({
			y: 0,
			opacity: 1,
			transition: {
				delay: i * 0.1,
				duration: 0.6,
				ease: "easeOut"
			}
		})
	};

	const baseWidth = Math.min(size.width * 0.9, 900);
	const centerX = baseWidth / 2;
	const centerY = baseWidth * 0.5;

	const iconSize =
		size.width < 480
			? Math.max(24, baseWidth * 0.05)
			: size.width < 768
			? Math.max(28, baseWidth * 0.06)
			: Math.max(32, baseWidth * 0.07);

	return (
		<section id="stack" className="relative py-24 px-12 md:px-24 pt-48" ref={ref}>
			<div className="container">
				<div
					className="font-display text-4xl md:text-5xl mb-24 text-center"
				>
					{titleText.split('').map((letter, i) => (
						<motion.span
							key={i}
							custom={i}
							variants={letterVariants}
							initial="hidden"
							animate={isInView ? "visible" : "hidden"}
							className="inline-block"
							style={{ marginRight: letter === ' ' ? '0.5rem' : '0' }}
						>
							{letter === ' ' ? '\u00A0' : letter}
						</motion.span>
					))}
				</div>
				
				{/* Category Legend with sequential raise-up animations */}
				<div className="flex flex-wrap justify-center gap-4 mb-32">
					<motion.div 
						className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30"
						initial={{ opacity: 0, y: 50, scale: 0.8 }}
						animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
						transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
					>
						<div className="w-3 h-3 rounded-full bg-blue-500"></div>
						<span className="text-sm font-medium">Programming</span>
					</motion.div>
					<motion.div 
						className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30"
						initial={{ opacity: 0, y: 50, scale: 0.8 }}
						animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
						transition={{ duration: 0.6, delay: 2.5, ease: "easeOut" }}
					>
						<div className="w-3 h-3 rounded-full bg-green-500"></div>
						<span className="text-sm font-medium">Skills</span>
					</motion.div>
					<motion.div 
						className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30"
						initial={{ opacity: 0, y: 50, scale: 0.8 }}
						animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
						transition={{ duration: 0.6, delay: 3.5, ease: "easeOut" }}
					>
						<div className="w-3 h-3 rounded-full bg-purple-500"></div>
						<span className="text-sm font-medium">Tools</span>
					</motion.div>
				</div>

				{/* Multi-orbit semi-circle with animated icons */}
				<div className="flex justify-center mt-12">
					<div
						className="relative"
						style={{ width: baseWidth, height: baseWidth * 0.8 }}
					>
						{/* Inner semicircle - Tools */}
						<SemiCircleOrbit radius={baseWidth * 0.22} centerX={centerX} centerY={centerY} count={4} iconSize={iconSize} techArray={TECH_STACK.tools} isInView={isInView} />
						{/* Middle semicircle - Skills */}
						<SemiCircleOrbit radius={baseWidth * 0.36} centerX={centerX} centerY={centerY} count={6} iconSize={iconSize} techArray={TECH_STACK.skills} isInView={isInView} />
						{/* Outer semicircle - Programming */}
						<SemiCircleOrbit radius={baseWidth * 0.52} centerX={centerX} centerY={centerY} count={10} iconSize={iconSize} techArray={TECH_STACK.programming} isInView={isInView} />
					</div>
				</div>
			</div>

			<div className="pointer-events-none absolute inset-0" aria-hidden>
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-10" style={{ background: 'var(--gradient-primary)' }} />
			</div>
		</section>
	);
};

export default MyStack;