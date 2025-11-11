import { useState, createContext, useContext, useRef } from "react"
import { useLoading } from "@/contexts/LoadingContext"
import { motion, useInView } from "framer-motion"
import { LimelightNav } from "@/components/ui/cyan-light-navbar"
import Hero from "@/components/sections/Hero"
import MyExperience from "@/components/sections/MyExperience"
import MyStack from "@/components/sections/MyStack"
import Projects from "@/components/sections/Projects"
import Certifications from "@/components/sections/Certifications"
import Contact from "@/components/sections/Contact"
import MyWorksInline from "@/components/sections/MyWorksInline"
import GlassMorphismOverlay from "@/components/ui/glass-morphism-overlay"

// Transition phases
type TransitionPhase = "idle" | "overlay" | "background" | "content" | "closing"

// Create context for MyWorks visibility
interface MyWorksContextType {
  showMyWorks: (tab?: "works" | "videos", videoId?: number) => void
}

const MyWorksContext = createContext<MyWorksContextType | undefined>(undefined)

export const useMyWorks = () => {
  const context = useContext(MyWorksContext)
  if (!context) {
    throw new Error("useMyWorks must be used within MyWorksProvider")
  }
  return context
}

const Index = () => {
  const [myWorksVisible, setMyWorksVisible] = useState(false)
  const [myWorksTab, setMyWorksTab] = useState<"works" | "videos">("works")
  const [myWorksVideoId, setMyWorksVideoId] = useState<number | undefined>(undefined)
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>("idle")
  const [overlayVisible, setOverlayVisible] = useState(false)
  
  // Hero section detection for navbar animation
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true, margin: "-200px" })
  const { setGlobalLoading, showLoadingFor, isContentReady } = useLoading()
  
  const shouldAnimateNavbar = isHeroInView && isContentReady

  const showMyWorks = async (tab: "works" | "videos" = "works", videoId?: number) => {
    setMyWorksTab(tab)
    setMyWorksVideoId(videoId)

    setTransitionPhase("overlay")
    setOverlayVisible(true)
  }

  const handleOverlayComplete = () => {
    // After overlay completes, show the MyWorks component and start content transition
    setMyWorksVisible(true)
    setTransitionPhase("content")
  }

  const handleBackgroundComplete = () => {
    // This function is no longer needed as we transition directly to content
    // after overlay completes
  }

  const hideMyWorks = async () => {
    setTransitionPhase("closing")

    // Start closing sequence - content slides down first
    setTimeout(() => {
      setMyWorksVisible(false)
      setMyWorksVideoId(undefined)

      // Then hide overlay after content is gone
      setTimeout(() => {
        setOverlayVisible(false)
        setTransitionPhase("idle")
      }, 400) // Smoother timing
    }, 150) // Reduced for snappier response
  }

  const contextValue = {
    showMyWorks,
  }

  return (
    <MyWorksContext.Provider value={contextValue}>
      <div
        className="min-h-screen text-foreground selection:bg-accent/30 selection:text-primary scroll-smooth relative z-10"
        data-content-ready={isContentReady}
      >
        {/* Cyan Light Navbar - Fixed top right with animation */}
        <motion.div 
          className="fixed top-6 right-6 z-30"
          initial={{ opacity: 0, x: 100 }}
          animate={shouldAnimateNavbar ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 0.8, delay: 4.0, ease: "easeOut" }}
        >
          <LimelightNav />
        </motion.div>
        
        <main ref={heroRef}>
          <Hero />
          <MyExperience />
          <MyStack />
          <Projects />
          <Certifications />
          <Contact />

          {/* MyWorks Inline Section */}
          <div id="my-works-section" data-my-works-visible={myWorksVisible}>
            <MyWorksInline
              isVisible={myWorksVisible}
              onClose={hideMyWorks}
              initialTab={myWorksTab}
              initialVideoId={myWorksVideoId}
              transitionPhase={transitionPhase}
              onBackgroundComplete={handleBackgroundComplete}
            />
          </div>
        </main>
        <footer className="py-12 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sai Thoran All rights reserved.
        </footer>

        {/* Glass Morphism Overlay */}
        <GlassMorphismOverlay isVisible={overlayVisible} onComplete={handleOverlayComplete} />
      </div>
    </MyWorksContext.Provider>
  )
}

export default Index
