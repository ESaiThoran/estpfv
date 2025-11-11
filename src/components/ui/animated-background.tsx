import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
    shouldAnimate = true,
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
    shouldAnimate?: boolean;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={shouldAnimate ? {
                opacity: 1,
                y: 0,
                rotate: rotate,
            } : {
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            transition={{
                duration: 2.4,
                delay: shouldAnimate ? delay : 0,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.25]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.2)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

export function AnimatedBackground({ 
  className,
  shouldAnimate = true
}: { 
  className?: string;
  shouldAnimate?: boolean;
}) {
    return (
        <div className={cn("min-h-screen w-full overflow-hidden bg-[#030303]", className)}>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.12] via-transparent to-rose-500/[0.12] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    shouldAnimate={shouldAnimate}
                    delay={0.4} // Start at same time as "Hi, there!" text
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-indigo-500/[0.25]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    shouldAnimate={shouldAnimate}
                    delay={0.6} // Slightly after first shape
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-rose-500/[0.25]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    shouldAnimate={shouldAnimate}
                    delay={0.5} // Between first and second
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-violet-500/[0.25]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    shouldAnimate={shouldAnimate}
                    delay={0.7} // After second shape
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-amber-500/[0.25]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    shouldAnimate={shouldAnimate}
                    delay={0.8} // Last to appear
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-cyan-500/[0.25]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />

                <ElegantShape
                    shouldAnimate={shouldAnimate}
                    delay={0.6} // Matches the rose shape timing for better flow
                    width={100}
                    height={25}
                    rotate={70}
                    gradient="from-blue-500/[0.25]"
                    className="right-[10%] md:right-[15%] top-[45%] md:top-[50%]"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/60 via-transparent to-[#030303]/40 pointer-events-none" />
        </div>
    );
}