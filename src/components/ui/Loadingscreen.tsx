import type React from "react"
import { LumaSpin } from "./luma-spin"

interface LoadingScreenProps {
  isVisible: boolean
  message?: string
  overlay?: boolean
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible, message = "Loading...", overlay = true }) => {
  if (!isVisible) return null

  return (
    <div
      className={`
      fixed inset-0 z-[9999] 
      flex flex-col items-center justify-center
      ${overlay ? "bg-background/80 backdrop-blur-sm" : "bg-background"}
      transition-opacity duration-300
      ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
    `}
    >
      <div className="flex flex-col items-center gap-6">
        <LumaSpin size="lg" />
        <div className="text-center">
          <p className="text-lg font-medium text-foreground mb-2">{message}</p>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    </div>
  )
}

// src/hooks/useLoadingState.ts
import { useState, useEffect } from "react"

interface UseLoadingStateOptions {
  initialDelay?: number
  minimumDuration?: number
}

export const useLoadingState = (options: UseLoadingStateOptions = {}) => {
  const { initialDelay = 100, minimumDuration = 1000 } = options
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    const startTime = Date.now()

    // Simulate initial loading
    const timer = setTimeout(() => {
      const elapsed = Date.now() - startTime
      const remainingTime = Math.max(0, minimumDuration - elapsed)

      setTimeout(() => {
        setIsLoading(false)
        setTimeout(() => setIsInitialLoad(false), 300)
      }, remainingTime)
    }, initialDelay)

    return () => clearTimeout(timer)
  }, [initialDelay, minimumDuration])

  return { isLoading, isInitialLoad }
}

// src/components/layout/PageLoader.tsx

interface PageLoaderProps {
  isVisible: boolean
}

export const PageLoader: React.FC<PageLoaderProps> = ({ isVisible }) => {
  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
      <div className="h-full bg-gradient-to-r from-primary/20 via-primary to-primary/20 animate-pulse" />
      <div className="absolute top-4 right-4">
        <LumaSpin size="sm" />
      </div>
    </div>
  )
}
