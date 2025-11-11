import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LimelightNav } from "@/components/ui/cyan-light-navbar"
import { useLoading } from "@/contexts/LoadingContext"

const NavBar = () => {
  const [activeItem, setActiveItem] = useState("About Me")
  const [shouldShowNavbar, setShouldShowNavbar] = useState(false)
  const { isContentReady } = useLoading()

  // Show navbar after content is ready with delay
  useEffect(() => {
    if (isContentReady) {
      const timer = setTimeout(() => {
        setShouldShowNavbar(true)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isContentReady])

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "experience", "stack", "projects", "certifications", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            // Map section IDs to navigation labels
            const sectionMap: { [key: string]: string } = {
              home: "About Me",
              experience: "Experience",
              stack: "About Me", // Stack is part of About Me
              projects: "Projects",
              certifications: "Projects", // Certifications is part of Projects
              contact: "Hire Me",
            }
            setActiveItem(sectionMap[sectionId] || "About Me")
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle navigation item clicks
  const handleItemClick = (label: string) => {
    const sectionMap: { [key: string]: string } = {
      "About Me": "home",
      "Experience": "experience",
      "Projects": "projects",
      "Hire Me": "contact",
    }

    const sectionId = sectionMap[label]
    if (sectionId) {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setActiveItem(label)
  }

  return (
    <motion.div
      className="fixed-stable top-6 right-6 z-50"
      style={{
        right: 'calc(1.5rem + env(safe-area-inset-right))',
        transform: 'translateX(0)', // Prevent any transform shifts
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={shouldShowNavbar ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <LimelightNav
        defaultActiveIndex={0}
        onTabChange={(index) => {
          const labels = ["About Me", "Experience", "Projects", "Hire Me"]
          handleItemClick(labels[index])
        }}
      />
    </motion.div>
  )
}

export default NavBar