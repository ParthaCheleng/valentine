"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [randomDelays, setRandomDelays] = useState<string[]>([]);

    useEffect(() => {
        setIsLoaded(true);
        setRandomDelays([
            `${Math.random() * 1000}ms`,
            `${Math.random() * 1000}ms`,
            `${Math.random() * 1000}ms`
        ]);

        // Simulate loading progress
        const duration = 3000; // 3 seconds total
        const intervalTime = 50;
        const steps = duration / intervalTime;
        const increment = 100 / steps;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    // Small delay before completion to show 100%
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return next;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-pink-50 overflow-hidden text-center">
            {/* Vignette Overlay (Pinkish) */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(244,114,182,0.3)_100%)]" />

            <div className="relative z-10 flex flex-col items-center">
                {/* Icon - Simple Beating Heart */}
                {/* Wrapper for Entrance Animation */}
                <div
                    className={`mb-8 transition-all duration-[1500ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: randomDelays[0] || '0ms' }}
                >
                    {/* Inner for Heartbeat Animation */}
                    <motion.div
                        className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                        animate={{
                            scale: [1, 1.1, 1],
                            filter: ["drop-shadow(0 0 10px rgba(239,68,68,0.5))", "drop-shadow(0 0 15px rgba(239,68,68,0.6))", "drop-shadow(0 0 10px rgba(239,68,68,0.5))"]
                        }}
                        transition={{
                            scale: {
                                repeat: Infinity,
                                duration: 1,
                                ease: "easeInOut"
                            },
                            filter: {
                                repeat: Infinity,
                                duration: 1,
                                ease: "easeInOut"
                            }
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                    </motion.div>
                </div>

                {/* Progress Text */}
                <div
                    className={`text-pink-500 font-bold text-xl mb-2 font-mono transition-all duration-[1500ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: randomDelays[1] || '0ms' }}
                >
                    {Math.round(progress)}%
                </div>

                {/* Progress Bar Container */}
                <div
                    className={`w-64 h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner border border-pink-100 transition-all duration-[1500ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: randomDelays[2] || '0ms' }}
                >
                    {/* Progress Bar Fill */}
                    <motion.div
                        className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.05 }} // Smooth updates
                    />
                </div>

                {/* Cute message? Optional */}
                <p className="mt-4 text-gray-400 text-3xl font-great-vibes animate-pulse">
                    Preparing cuteness...
                </p>
            </div>
        </div>
    );
}
