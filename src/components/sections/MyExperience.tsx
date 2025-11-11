import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';
import profilePhoto from '@/assets/psph.jpg';
import backgroundVideo from '@/assets/bluewave.mp4';
import dotGif from '@/assets/dotbg.gif';

const MyExperience = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	// Testimonials data from Hero section
	const testimonials = [
		{
			quote: "Currently working, Contributing to live client projects by building responsive and user-friendly web applications while gaining exposure to agile methodologies and corporate-level project execution.",
			name: "Infosys Intern",
			designation: "Frontend Developer (2025)",
			src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
		{
			quote: "Applying Agile methodology to plan sprints, assign tasks, and oversee project progress. I coordinated my team in building an AI project with high accuracy by leveraging machine learning models.",
			name: "Academic",
			designation: "Technical Project Lead (2025)",
			src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
		},
		{
			quote: "As the Team Lead, I guided my team in designing and implementing secure communication techniques. My responsibilities included delegating tasks, managing timelines, and ensuring successful integration.",
			name: "Academic",
			designation: "Team Lead (2024)",
			src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
		},
	];

	return (
			<section id="experience" className="relative min-h-screen w-full pt-4 mt-24" ref={ref}>
				<div className="max-w-7xl mx-auto py-1 px-1 md:px-2 lg:px-3">
					{/* Section Title - Centered overall */}
					<motion.div
						initial={{ x: -100, opacity: 0 }}
						animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
						transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
						className="font-display text-3xl md:text-5xl text-center text-white absolute top-16 left-1/2 transform -translate-x-1/2 z-20"
					>
						<h2>My Experience</h2>
					</motion.div>

					<div className="flex min-h-screen w-full pt-32">
					{/* Left side - GIF background (40%) */}
					<motion.div 
						className="w-[40%] relative flex flex-col items-center justify-center p-8"
						initial={{ opacity: 0, x: -50 }}
						animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						{/* GIF Background */}
						<div 
							className="absolute inset-0 w-full h-full z-0"
							style={{
								backgroundImage: `url(${dotGif})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat'
							}}
						></div>
						
						{/* Light overlay for better contrast */}
						<div className="absolute inset-0 bg-white bg-opacity-20 z-10"></div>
						
						{/* Profile Photo */}
						<div
							className="w-96 h-160 rounded-2xl border-2 border-gray-300 overflow-hidden shadow-lg relative z-20"
						>
							<img 
								src={profilePhoto} 
								alt="Profile" 
								className="w-full h-full object-cover"
							/>
						</div>
					</motion.div>

					{/* Right side - Video background (60%) */}
					<motion.div 
						className="w-[60%] relative flex items-center justify-end p-8"
						initial={{ opacity: 0, x: 50 }}
						animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
						transition={{ duration: 0.8, delay: 0.6 }}
					>
						{/* Video Background */}
						<video
							autoPlay
							loop
							muted
							playsInline
							className="absolute inset-0 w-full h-full object-cover z-0"
						>
							<source src={backgroundVideo} type="video/mp4" />
						</video>
						
						{/* Dark overlay for better text readability */}
						<div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
						
						{/* Glass Morphism Cards - Positioned to the right */}
						<div
							className="max-w-2xl w-full relative z-20"
						>
							<CircularTestimonials
								testimonials={testimonials}
								autoplay={true}
								colors={{
									name: "#f7f7ff",
									designation: "#e1e1e1",
									testimony: "#f1f1f7",
									arrowBackground: "#0582CA",
									arrowForeground: "#141414",
									arrowHoverBackground: "#f7f7ff",
								}}
								fontSizes={{
									name: "24px",
									designation: "16px",
									quote: "16px",
								}}
							/>
						</div>
					</motion.div>
				</div>
				</div>
			</section>
	);
};

export default MyExperience;