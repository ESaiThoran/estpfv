import { useEffect } from "react"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { PageTransitionProvider } from "@/contexts/PageTransitionContext"
import { LoadingProvider, useLoading } from "@/contexts/LoadingContext"
import { LoadingScreen } from "@/components/ui/Loadingscreen"
import { PageLoader } from "@/components/layout/PageLoader"
import { useLoadingState } from "@/hooks/useLoadingState"
import { AnimatedBackground } from "@/components/ui/animated-background"
import Index from "./pages/Index"
import MyWorks from "./pages/MyWorks"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

const AnimatedRoutes = () => {
  const location = useLocation()
  const { isPageTransitioning, setPageTransitioning } = useLoading()

  // Handle route changes with loading

  useEffect(() => {
    // Don't show loading for hash changes or same-page navigation
    if (location.hash || location.pathname === "/") {
      return
    }

    setPageTransitioning(true)
    const timer = setTimeout(() => {
      setPageTransitioning(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [location.pathname, setPageTransitioning])

  return (
    <>
      <PageLoader isVisible={isPageTransitioning} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/my-works" element={<MyWorks />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

const AppContent = () => {
  const { setContentReady } = useLoading()

  const { isLoading, isInitialLoad, isContentReady } = useLoadingState({
    initialDelay: 100,
    minimumDuration: 1000,
    onContentReady: () => setContentReady(true),
  })
  const { isGlobalLoading, loadingMessage } = useLoading()

  // Check if Hero section should animate (content ready and not loading)
  const shouldAnimateBackground = isContentReady && !isLoading

  return (
    <>
      {/* Animated Background Layer */}
      <AnimatedBackground 
        className="fixed inset-0 z-0" 
        shouldAnimate={shouldAnimateBackground}
      />
      
      {/* Initial Loading Screen */}
      <LoadingScreen
        isVisible={isLoading && isInitialLoad}
        message="Welcome to Sai Thoran's Portfolio"
        overlay={false}
      />

      {/* Global Loading Screen for actions */}
      <LoadingScreen isVisible={isGlobalLoading} message={loadingMessage} overlay={true} />

      {/* Main App Content */}
      <div
        className={`relative z-10 transition-opacity duration-700 ${
          isLoading || !isContentReady ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <PageTransitionProvider>
          <AnimatedRoutes />
        </PageTransitionProvider>
      </div>
    </>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LoadingProvider>
          <AppContent />
        </LoadingProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
