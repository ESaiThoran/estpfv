import type React from "react"
import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface LoadingContextType {
  isGlobalLoading: boolean
  isPageTransitioning: boolean
  loadingMessage: string
  isContentReady: boolean
  setGlobalLoading: (loading: boolean, message?: string) => void
  setPageTransitioning: (transitioning: boolean) => void
  setContentReady: (ready: boolean) => void
  showLoadingFor: (duration: number, message?: string) => Promise<void>
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}

interface LoadingProviderProps {
  children: ReactNode
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false)
  const [isPageTransitioning, setIsPageTransitioning] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("Loading...")
  const [isContentReady, setIsContentReady] = useState(false)

  const setGlobalLoading = useCallback((loading: boolean, message?: string) => {
    setIsGlobalLoading(loading)
    if (message) setLoadingMessage(message)
  }, [])

  const setPageTransitioning = useCallback((transitioning: boolean) => {
    setIsPageTransitioning(transitioning)
  }, [])

  const setContentReady = useCallback((ready: boolean) => {
    setIsContentReady(ready)
  }, [])

  const showLoadingFor = useCallback(
    async (duration: number, message?: string): Promise<void> => {
      setGlobalLoading(true, message)
      return new Promise((resolve) => {
        setTimeout(() => {
          setGlobalLoading(false)
          resolve()
        }, duration)
      })
    },
    [setGlobalLoading],
  )

  const contextValue = {
    isGlobalLoading,
    isPageTransitioning,
    loadingMessage,
    isContentReady,
    setGlobalLoading,
    setPageTransitioning,
    setContentReady,
    showLoadingFor,
  }

  return <LoadingContext.Provider value={contextValue}>{children}</LoadingContext.Provider>
}
