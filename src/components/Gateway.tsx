"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

interface GatewayProps {
    onEnter: () => void;
}

export default function Gateway({ onEnter }: GatewayProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const controls = useAnimation();

    // Store button position relative to its initial point (transform x, y)
    // We don't use absolute positioning anymore for the button itself, 
    // we just translate it.
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Animation states
    const [isLoaded, setIsLoaded] = useState(false);
    const [randomDelays, setRandomDelays] = useState<string[]>([]);

    // Timer ref to handle reset delay
    const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setIsLoaded(true);
        setRandomDelays([
            `${Math.random() * 1500}ms`,
            `${Math.random() * 1500}ms`,
            `${Math.random() * 1500}ms`,
            `${Math.random() * 1500}ms`
        ]);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!cardRef.current || !buttonRef.current) return;

            const cardRect = cardRef.current.getBoundingClientRect();
            const buttonRect = buttonRef.current.getBoundingClientRect();

            // Calculate mouse position relative to the button center
            const buttonCenterX = buttonRect.left + buttonRect.width / 2;
            const buttonCenterY = buttonRect.top + buttonRect.height / 2;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const dist = Math.sqrt(
                Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
            );

            // Threshold for triggering movement
            const threshold = 150;

            if (dist < threshold) {
                // Calculate vector from mouse to button center
                const dx = buttonCenterX - mouseX;
                const dy = buttonCenterY - mouseY;

                // Move away! 
                // We add a small amount to current position based on the vector
                // The closer the mouse, the stronger the push
                const force = (threshold - dist) / threshold;
                const moveX = dx * force * 2; // Multiplier defines "speed"
                const moveY = dy * force * 2;

                let newX = position.x + moveX;
                let newY = position.y + moveY;

                // Constrain within Card
                const maxOffsetX = cardRect.width / 2 - 50; // approximate
                const maxOffsetY = cardRect.height / 2 - 50;

                // Clamp
                if (newX > maxOffsetX) newX = maxOffsetX;
                if (newX < -maxOffsetX) newX = -maxOffsetX;
                if (newY > maxOffsetY) newY = maxOffsetY;
                if (newY < -maxOffsetY) newY = -maxOffsetY;

                setPosition({ x: newX, y: newY });

                // Reset timer whenever we move
                if (resetTimeoutRef.current) {
                    clearTimeout(resetTimeoutRef.current);
                }
                resetTimeoutRef.current = setTimeout(() => {
                    setPosition({ x: 0, y: 0 });
                }, 2000);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            // We do NOT clear the timeout here because we want the reset to happen 
            // even if the effect cleans up due to position change re-render.
            // But we should check if component unmounted? 
            // Since this effect depends on [position], it runs often.
            // The timer ref persists.
        };
    }, [position]);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
        };
    }, []);

    // Update framer motion controls when position changes
    useEffect(() => {
        controls.start({
            x: position.x,
            y: position.y,
            transition: { type: "spring", stiffness: 100, damping: 20, mass: 0.5 } // Smooth spring
        });
    }, [position, controls]);


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-100/50 backdrop-blur-sm overflow-hidden text-center">
            {/* Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(244,114,182,0.4)_100%)] sm:bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(244,114,182,0.5)_100%)]" />

            <div
                ref={cardRef}
                className="relative bg-white p-8 rounded-3xl shadow-[0_0_60px_15px_rgba(244,114,182,0.6)] flex flex-col items-center max-w-md w-full mx-4 border-4 border-white ring-4 ring-pink-100/50 z-10 transition-all duration-1000 ease-out"
                style={{
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
                }}
            >

                {/* Image */}
                <div
                    className={`relative w-64 h-64 mb-6 rounded-2xl overflow-hidden shadow-inner transition-all duration-[2000ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: randomDelays[0] || '0ms' }}
                >
                    <Image
                        src="/firstpage.jpg"
                        alt="Valentine Request"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Text */}
                <h1
                    className={`text-3xl font-great-vibes font-bold text-gray-800 mb-2 transition-all duration-[2000ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: randomDelays[1] || '0ms' }}
                >
                    Will you be my Valentine?
                </h1>
                <p
                    className={`text-gray-500 font-great-vibes mb-8 text-3xl transition-all duration-[2000ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: randomDelays[2] || '0ms' }}
                >
                    There is only one right answer...
                </p>

                {/* Buttons */}
                <div
                    className={`flex gap-4 items-center justify-center w-full relative h-14 z-10 transition-all duration-[2000ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: randomDelays[3] || '0ms' }}
                >

                    {/* Yes Button */}
                    <button
                        onClick={onEnter}
                        className="px-8 py-3 font-great-vibes bg-red-400 hover:bg-red-500 text-white font-bold rounded-full transition-all hover:scale-110 shadow-[0_4px_14px_0_rgba(244,114,182,0.39)] hover:shadow-[0_6px_20px_rgba(244,114,182,0.23)] active:scale-95 z-20"
                    >
                        YES!
                    </button>

                    {/* No Button */}
                    <motion.div
                        animate={controls}
                    >
                        <button
                            ref={buttonRef}
                            className="px-8 py-3 font-great-vibes bg-gray-200 text-gray-500 font-bold rounded-full cursor-not-allowed hover:bg-gray-300 transition-colors shadow-lg"
                        >
                            No
                        </button>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
