import { useState, useEffect } from "react"

interface UseLoadingStateOptions {
  initialDelay?: number
  minimumDuration?: number
  onLoadingStart?: () => void
  onLoadingComplete?: () => void
  onContentReady?: () => void
}

interface UseLoadingStateReturn {
  isLoading: boolean
  isInitialLoad: boolean
  progress: number
  isContentReady: boolean
  setManualLoading: (loading: boolean) => void
  resetLoading: () => void
}

export const useLoadingState = (options: UseLoadingStateOptions = {}): UseLoadingStateReturn => {
  const { initialDelay = 100, minimumDuration = 500, onLoadingStart, onLoadingComplete, onContentReady } = options

  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [progress, setProgress] = useState(0)
  const [manualLoading, setManualLoading] = useState(false)
  const [isContentReady, setIsContentReady] = useState(false)

  // Progress simulation - smoother for 1 second
  useEffect(() => {
    if (!isLoading) return

    const TOTAL_TIME = 1000 // 1 second
    const INTERVAL = 50 // Update every 50ms
    const INCREMENT = 100 / (TOTAL_TIME / INTERVAL) // Calculate increment for smooth progress

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + INCREMENT
        return next >= 95 ? 95 : next // Cap at 95% until loading completes
      })
    }, INTERVAL)

    return () => clearInterval(progressInterval)
  }, [isLoading])

  // Main loading logic - ALWAYS 2 seconds
  useEffect(() => {
    if (manualLoading) return // Don't auto-complete if manually controlled

    // Call start callback
    onLoadingStart?.()

    // Force exactly 1 second loading time
    const EXACT_LOADING_TIME = 1000 // 1 second

    const timer = setTimeout(() => {
      setProgress(100)

      // Small delay to show 100% progress
      setTimeout(() => {
        setIsLoading(false)
        onLoadingComplete?.()

        setTimeout(() => {
          setIsContentReady(true)
          onContentReady?.()
        }, 300) // Additional delay for content to be ready

        // Hide initial load state after fade out
        setTimeout(() => {
          setIsInitialLoad(false)
        }, 600) // Increased delay
      }, 200)
    }, EXACT_LOADING_TIME)

    return () => clearTimeout(timer)
  }, [manualLoading, onLoadingStart, onLoadingComplete, onContentReady])

  const resetLoading = () => {
    setIsLoading(true)
    setIsInitialLoad(true)
    setProgress(0)
    setManualLoading(false)
    setIsContentReady(false)
  }

  return {
    isLoading,
    isInitialLoad,
    progress,
    isContentReady,
    setManualLoading,
    resetLoading,
  }
}

// Alternative hook for component-specific loading
export const useComponentLoading = (duration = 1000) => {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("Loading...")

  const startLoading = (message?: string) => {
    if (message) setLoadingMessage(message)
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, duration)
  }

  return {
    isLoading,
    loadingMessage,
    startLoading,
    setLoading: setIsLoading,
  }
}
