import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface CustomCursorProps {
    isVideoOpen: boolean;
}

const CustomCursor = ({ isVideoOpen }: CustomCursorProps) => {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    const glowConfig = { stiffness: 50, damping: 20 };
    const glowX = useSpring(cursorX, glowConfig);
    const glowY = useSpring(cursorY, glowConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Background ambient glow trailing behind - scaled down for performance */}
            {!isVideoOpen && (
                <motion.div
                    className="fixed top-0 left-0 w-40 h-40 bg-primary/5 rounded-full blur-[60px] pointer-events-none z-0 hidden md:block"
                    style={{
                        x: glowX,
                        y: glowY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                />
            )}

            {/* Main cursor dot - fast and snappy */}
            <motion.div
                className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center ${isVideoOpen ? 'bg-primary/80 border border-white/20 shadow-lg' : 'bg-white mix-blend-difference'
                    }`}
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: isHovering ? 80 : 12,
                    height: isHovering ? 80 : 12,
                }}
                transition={{
                    width: { type: "spring", stiffness: 300, damping: 20 },
                    height: { type: "spring", stiffness: 300, damping: 20 },
                }}
            >
                {isHovering && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-black rounded-full"
                    />
                )}
            </motion.div>
        </>
    );
};

export default CustomCursor;
