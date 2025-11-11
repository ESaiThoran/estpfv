"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}
interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  // Color & font config
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay - disabled
  useEffect(() => {
    // Autoplay disabled as requested
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [activeIndex, testimonialsLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  // Compute transforms for each image (always show 3: left, center, right)
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const offset = (index - activeIndex + testimonialsLength) % testimonialsLength;
    // const zIndex = testimonialsLength - Math.abs(offset);
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translate(-50%, -50%) translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translate(-50%, -50%) translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translate(-50%, -50%) translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    // Hide all other images
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  // Framer Motion variants for quote
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="testimonial-container">
      <div className="testimonial-grid">
        {/* Cards with text inside */}
        <div className="image-container" ref={imageContainerRef}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.src}
              className="testimonial-card"
              data-index={index}
              style={getImageStyle(index)}
            >
              <div className="card-content">
                <h3
                  className="name"
                  style={{ color: colorName, fontSize: fontSizeName }}
                >
                  {testimonial.name}
                </h3>
                <p
                  className="designation"
                  style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
                >
                  {testimonial.designation}
                </p>
                <p
                  className="quote"
                  style={{ color: colorTestimony, fontSize: fontSizeQuote }}
                >
                  {testimonial.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Navigation arrows */}
        <div className="arrow-buttons">
          <button
            className="arrow-button prev-button"
            onClick={handlePrev}
            style={{
              backgroundColor: hoverPrev ? colorArrowHoverBg : 'transparent',
            }}
            onMouseEnter={() => setHoverPrev(true)}
            onMouseLeave={() => setHoverPrev(false)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} color={colorArrowFg} strokeWidth={1.5} />
          </button>
          <button
            className="arrow-button next-button"
            onClick={handleNext}
            style={{
              backgroundColor: hoverNext ? colorArrowHoverBg : 'transparent',
            }}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} color={colorArrowFg} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <style>{`
        .testimonial-container {
          width: 100%;
          max-width: 56rem;
          padding: 1rem;
        }
        .testimonial-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        .image-container {
          position: relative;
          width: 100%;
          height: 500px;
          perspective: 1000px;
        }
        .testimonial-card {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 350px;
          height: 450px;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
        }
        .card-content {
          text-align: justify;
          max-width: 100%;
          width: 100%;
        }
        .name {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .designation {
          margin-bottom: 1.5rem;
          opacity: 0.8;
        }
        .quote {
          line-height: 1.6;
          margin-top: 1rem;
        }
        .arrow-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: -2rem;
        }
        .arrow-button {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid rgba(52, 52, 52, 0.65);
          background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08));
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        .arrow-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default CircularTestimonials;
