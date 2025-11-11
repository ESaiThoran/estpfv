import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Circle, Linkedin, Github, FileText } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { Button as RainbowButton } from "@/components/ui/myworkbutton"
import { MorphingText } from "@/components/ui/morphing-text"
import QuotationBadge from "@/components/ui/quotation-badge"
import { useTransitionNavigation } from "@/hooks/useTransitionNavigation"
import { useLoading } from "@/contexts/LoadingContext"
import { cn } from "@/lib/utils"

const Hero = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-200px" })
  const { navigateWithTransition } = useTransitionNavigation()
  const { isContentReady } = useLoading()

  const shouldAnimate = isInView && isContentReady

  const morphingTexts = ["Frontend Developer", "Cyber Security", "UI/UX Developer"]

  return (
    <header id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden" ref={ref}>
      {/* New QuotationBadge component - triggered by Hero animation */}
      <QuotationBadge shouldAnimate={shouldAnimate} />
      
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center pt-32 md:pt-40 lg:pt-48">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 tracking-tight">
            {/* "Hi, there!" - First to appear at 0.3s */}
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
              initial={{ opacity: 0, y: 50 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              Hi, there!
            </motion.span>
            <br />
            {/* "Sai Thoran here." - Second to appear at 0.9s */}
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white/90 to-purple-300"
              initial={{ opacity: 0, y: 50 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              Sai Thoran here.
            </motion.span>
            <br />
            <div className="relative mb-0">
              {/* "I'm" - Third to appear at 1.5s */}
              <motion.span 
                className="text-2xl sm:text-3xl md:text-4xl text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: 1.5, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              >
                I'm
              </motion.span>
              <br />
              {/* Morphing text - Fourth to appear at 2.1s */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: 2.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <MorphingText 
                  texts={morphingTexts}
                  className={cn(
                    "text-white text-2xl sm:text-3xl md:text-4xl"
                  )}
                />
              </motion.div>
            </div>
          </h1>
          
          {/* Buttons - Fifth to appear at 2.7s */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-3 -mt-24"
            initial={{ opacity: 0, y: 50 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 2.7, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
              <a href="https://www.linkedin.com/in/sai-thoran/" target="_blank" rel="noreferrer">
                <GradientButton aria-label="LinkedIn" variant="variant" className="group relative overflow-hidden">
                  <span className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
                    LinkedIn
                  </span>
                  <Linkedin className="absolute inset-0 m-auto transition-all duration-300 opacity-0 scale-125 group-hover:opacity-100 group-hover:scale-100" size={20} />
                </GradientButton>
              </a>
              <a href="https://github.com/ESaiThoran" target="_blank" rel="noreferrer">
                <GradientButton aria-label="GitHub" variant="red" className="group relative overflow-hidden">
                  <span className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
                    GitHub
                  </span>
                  <Github className="absolute inset-0 m-auto transition-all duration-300 opacity-0 scale-125 group-hover:opacity-100 group-hover:scale-100" size={20} />
                </GradientButton>
              </a>
              <a
                href="https://github.com/ESaiThoran/My-certificate/blob/main/My_Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <GradientButton aria-label="Resume" variant="emerald" className="group relative overflow-hidden">
                  <span className="transition-all duration-300 group-hover:opacity-0 group-hover:scale-75">
                    Resume
                  </span>
                  <FileText className="absolute inset-0 m-auto transition-all duration-300 opacity-0 scale-125 group-hover:opacity-100 group-hover:scale-100" size={20} />
                </GradientButton>
              </a>
              <div className="flex items-center">
                <RainbowButton wrapperClassName="py-0" />
              </div>
            </motion.div>

        </div>
      </div>
    </header>
  )
}

export default Hero