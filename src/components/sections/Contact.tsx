"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Button from "@/components/ui/MagneticButton"
import { toast } from "@/hooks/use-toast"
import { PixelCanvas } from "@/components/ui/pixel-canvas"
import HeroCanvas from "@/components/3d/HeroCanvas"

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle")
  const [shouldExplode, setShouldExplode] = useState(false)

  const headlineLines = ["I'm always interested in hearing about", "New Opportunities and Ideas.", "🧑🏻 🤝 🤖"]

  // Different animation variants for words
  const wordVariants = {
    raiseUp: {
      initial: { opacity: 0, y: 30, scale: 0.8 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
    spring: {
      initial: { opacity: 0, scale: 0.3, rotate: -10 },
      animate: { opacity: 1, scale: 1, rotate: 0 },
      transition: { type: "spring", damping: 8, stiffness: 300 },
    },
    slideIn: {
      initial: { opacity: 0, x: -50, skewX: 10 },
      animate: { opacity: 1, x: 0, skewX: 0 },
      transition: { type: "spring", damping: 15, stiffness: 150 },
    },
    bounce: {
      initial: { opacity: 0, y: -20, scaleY: 0.5 },
      animate: { opacity: 1, y: 0, scaleY: 1 },
      transition: { type: "spring", damping: 6, stiffness: 400 },
    },
    flip: {
      initial: { opacity: 0, rotateY: 90, scale: 0.8 },
      animate: { opacity: 1, rotateY: 0, scale: 1 },
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
    elastic: {
      initial: { opacity: 0, scaleX: 0, transformOrigin: "left" },
      animate: { opacity: 1, scaleX: 1 },
      transition: { type: "spring", damping: 10, stiffness: 100 },
    },
    fadeGrow: {
      initial: { opacity: 0, scale: 1.5, blur: 4 },
      animate: { opacity: 1, scale: 1, blur: 0 },
      transition: { duration: 0.6, ease: "easeOut" },
    },
    wiggle: {
      initial: { opacity: 0, rotate: -15, x: -10 },
      animate: { opacity: 1, rotate: 0, x: 0 },
      transition: { type: "spring", damping: 8, stiffness: 300 },
    },
    dropDown: {
      initial: { opacity: 0, y: -40, rotate: 5 },
      animate: { opacity: 1, y: 0, rotate: 0 },
      transition: { type: "spring", damping: 10, stiffness: 200 },
    },
    zoomIn: {
      initial: { opacity: 0, scale: 0.1, rotate: 180 },
      animate: { opacity: 1, scale: 1, rotate: 0 },
      transition: { type: "spring", damping: 12, stiffness: 300 },
    },
    typewriter: {
      initial: { opacity: 0, width: 0 },
      animate: { opacity: 1, width: "auto" },
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    floatUp: {
      initial: { opacity: 0, y: 20, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { type: "spring", damping: 20, stiffness: 150 },
    },
  }

  // Array of animation types to cycle through
  const animationTypes = [
    "raiseUp",
    "spring",
    "slideIn",
    "bounce",
    "flip",
    "elastic",
    "fadeGrow",
    "wiggle",
    "dropDown",
    "zoomIn",
    "typewriter",
    "floatUp",
  ]

  // Function to split text into words and assign animations
  const getAnimatedWords = (text: string, lineIndex: number) => {
    const words = text.split(" ")
    return words.map((word, wordIndex) => {
      const globalWordIndex = lineIndex * 10 + wordIndex // Ensure unique animation per word
      const animationType = animationTypes[globalWordIndex % animationTypes.length]

      // Each line waits for previous line to complete
      const lineBaseDelay = lineIndex * 0.8 // Each line starts 0.8s after previous
      const wordDelay = wordIndex * 0.15 // Words within line have 0.15s spacing
      const baseDelay = 0.6 + lineBaseDelay + wordDelay

      return {
        word,
        animation: wordVariants[animationType],
        delay: baseDelay,
      }
    })
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget as HTMLFormElement
    const data = new FormData(form)
    if (!data.get("entry.2072079095") || !data.get("entry.881789676")) {
      toast({ title: "Please fill the required fields." })
      e.preventDefault()
      return
    }

    setStatus("loading")

    // Let the form submit to Google Forms naturally
    // The form will submit to the hidden iframe
    // We'll show UI feedback after a short delay

    setTimeout(() => {
      setStatus("sent")
      setShouldExplode(true) // Trigger explosion animation
      form.reset()
      toast({ title: "Message sent!", description: "Thanks for reaching out — I will reply soon." })

      // Reset explosion state after animation completes (but don't reset status)
      setTimeout(() => {
        // Don't reset shouldExplode - keep particles exploded
        setStatus("idle")
      }, 4000)
    }, 1000)
  }

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      {/* 3D Sphere as background for left half */}
      {/* SPHERE CONTAINER POSITION: Change these classes to move the sphere container */}
      {/* left-0 = left edge, left-1/4 = quarter from left, left-1/2 = center */}
      {/* top-0 = top edge, top-1/4 = quarter from top */}
      {/* w-1/2 = half width, w-full = full width */}
      {/* h-full = full height, h-1/2 = half height */}
      <div className="absolute left-8 top-16 w-1/2 h-full pointer-events-none">
        <HeroCanvas shouldExplode={shouldExplode} />
      </div>

      <div className="container max-w-5xl relative z-10">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-display text-3xl md:text-4xl mb-12 text-center"
        >
          Get in Touch 📧
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: animated headline */}
          <motion.div
            className="order-1 md:order-1 relative z-20"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="text-xl md:text-2xl leading-relaxed text-primary/90 mb-8">
              {headlineLines.map((line, lineIdx) => (
                <div key={`line-${lineIdx}`} className={lineIdx === 2 ? "text-4xl mt-4 text-center mb-6" : "mb-2"}>
                  {lineIdx === 2
                    ? // Special handling for emoji line - animate as individual characters
                      line
                        .split(" ")
                        .map((emoji, emojiIdx) => (
                          <motion.span
                            key={`emoji-${emojiIdx}`}
                            initial={wordVariants.zoomIn.initial}
                            whileInView={wordVariants.zoomIn.animate}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                              ...wordVariants.zoomIn.transition,
                              // Use the same timing calculation as regular words
                              delay: 0.6 + lineIdx * 0.8 + emojiIdx * 0.15,
                            }}
                            className="inline-block mx-2"
                          >
                            {emoji}
                          </motion.span>
                        ))
                    : // Regular text lines with word-by-word animation
                      getAnimatedWords(line, lineIdx).map((wordData, wordIdx) => (
                        <motion.span
                          key={`word-${lineIdx}-${wordIdx}`}
                          initial={wordData.animation.initial}
                          whileInView={wordData.animation.animate}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{
                            ...wordData.animation.transition,
                            delay: wordData.delay,
                          }}
                          className="inline-block mr-2"
                          style={{ transformOrigin: "center" }}
                        >
                          {wordData.word}
                        </motion.span>
                      ))}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form card with entering background effect */}
          <motion.div
            className="order-2 md:order-2 relative z-20"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.form
              onSubmit={onSubmit}
              action="https://docs.google.com/forms/d/e/1FAIpQLSdt4BlGBv9DlqhQZfr4BKUA1YgRjYUipiAiRZRZKw7y-54bgQ/formResponse"
              method="POST"
              target="hidden_iframe"
              className="relative overflow-hidden border border-border p-6 md:p-8 bg-card/60 backdrop-blur-sm rounded-3xl space-y-4"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute inset-0"
                aria-hidden
              >
                <PixelCanvas
                  gap={10}
                  speed={25}
                  colors={["#e0f2fe", "#7dd3fc", "#0ea5e9"]}
                  variant="icon"
                  noFocus
                  autoplay
                  style={{ pointerEvents: "none" }}
                />
              </motion.div>

              <div className="relative z-10 space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-primary">Name</label>
                  <Input name="entry.1400455273" type="text" placeholder=" " required />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-primary">Email / Phone (with code) *</label>
                  <Input name="entry.2072079095" type="text" placeholder=" " required />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-primary">What's in your Mind *</label>
                  <Textarea name="entry.881789676" placeholder=" " required rows={5} />
                </div>
                <div className="pt-2 flex items-center justify-center">
                  <Button type="submit" disabled={status === "loading"} aria-label="Send Message">
                    {status === "loading"
                      ? "Sending…"
                      : status === "sent"
                        ? "Data Sent, I'll get back to U"
                        : "Send Message"}
                  </Button>
                </div>
              </div>
            </motion.form>
          </motion.div>
        </div>
        <iframe name="hidden_iframe" id="hidden_iframe" className="hidden" />
      </div>
    </section>
  )
}

export default Contact