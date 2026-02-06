"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data: Gallery Items Configuration ---
const galleryItems = [
    // Row 0
    { id: 1, src: "/p5.jpg", alt: "Love 1", className: "col-start-2 col-span-1 row-span-1", delay: "0ms" },
    { id: 2, src: "/p2.jpg", alt: "Love 2", className: "col-start-3 col-span-1 row-span-1", delay: "50ms" },
    { id: 3, src: "/p1.jpg", alt: "Love 3", className: "col-start-5 col-span-2 row-span-2", delay: "100ms" },

    // Row 1
    { id: 4, src: "/p6.jpg", alt: "Love 4", className: "col-start-1 col-span-1 row-span-1", delay: "150ms", imageStyle: { objectPosition: '0% 20%' } },
    { id: 5, src: "/p7.jpg", alt: "Love 5", className: "col-start-2 col-span-2 row-span-2", delay: "200ms" },
    { id: 6, src: "/p3.jpg", alt: "Love 6", className: "col-start-4 col-span-1 row-span-1", delay: "250ms" },
    { id: 7, src: "/p13.jpg", alt: "Love 7", className: "col-start-7 col-span-1 row-span-1", delay: "300ms" },

    // Row 2
    { id: 8, src: "/p8.jpg", alt: "Love 8", className: "col-start-1 col-span-1 row-span-1", delay: "350ms" },
    { id: 9, src: "/p9.jpg", alt: "Love 9", className: "col-start-4 col-span-1 row-span-1", delay: "400ms" },
    { id: 10, src: "/p10.jpg", alt: "Love 10", className: "col-start-5 col-span-2 row-span-2", delay: "450ms" },
    { id: 11, src: "/p11.jpg", alt: "Love 11", className: "col-start-7 col-span-1 row-span-1", delay: "500ms" },

    // Row 3
    { id: 12, src: "/p12.jpg", alt: "Love 12", className: "col-start-2 col-span-1 row-span-1", delay: "550ms" },
    { id: 13, src: "/p4.jpg", alt: "Love 13", className: "col-start-3 col-span-2 row-span-2", delay: "600ms" },

    // Row 4
    { id: 14, src: "/p14.jpg", alt: "Love 14", className: "col-start-5 col-span-1 row-span-1", delay: "650ms" },

    // Row 5
    { id: 15, src: "/p15.jpg", alt: "Love 15", className: "col-start-4 col-span-1 row-span-1", delay: "700ms" },
];

// Reusable Image Card Component
const GalleryCard = ({
    className,
    src,
    alt,
    imageStyle = {},
    onClick
}: {
    className?: string,
    src: string,
    alt: string,
    imageStyle?: React.CSSProperties
    onClick?: () => void
}) => {
    return (
        <div
            onClick={onClick}
            className={`relative rounded-xl overflow-hidden group shadow-[0_0_40px_rgba(220,50,50,0.7)] hover:shadow-[0_0_60px_rgba(255,50,50,0.9)] hover:scale-[1.03] transition-all duration-500 cursor-pointer ${className}`}
        >
            {/* Image Container with Zoom Effect */}
            <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110">
                {/* Placeholder background */}
                <div className="absolute inset-0 bg-neutral-900"></div>

                {/* Actual Image */}
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover relative z-10"
                    style={imageStyle}
                />

                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-20"></div>
            </div>

        </div>
    );
};

// Animation Variants
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.8
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.8
    })
};

const GallerySection = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState(0);
    const [randomDelays, setRandomDelays] = useState<string[]>([]);
    const [randomTextDelays, setRandomTextDelays] = useState<string[]>([]);

    useEffect(() => {
        // Generate random delays for a natural, "popcorn" effect
        const delays = galleryItems.map(() => `${Math.random() * 1500}ms`);
        setRandomDelays(delays);

        // Generate random delays for text elements
        setRandomTextDelays([
            `${1000 + Math.random() * 1000}ms`,
            `${1000 + Math.random() * 1000}ms`,
            `${1000 + Math.random() * 1000}ms`,
            `${1000 + Math.random() * 1000}ms`
        ]);
    }, []);

    const sectionRef = React.useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsLoaded(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // --- Lightbox Logic ---
    const openLightbox = (index: number) => {
        setDirection(0);
        setSelectedIndex(index);
    };

    const closeLightbox = () => setSelectedIndex(null);

    const showNext = useCallback(() => {
        setDirection(1);
        setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % galleryItems.length));
    }, []);

    const showPrev = useCallback(() => {
        setDirection(-1);
        setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + galleryItems.length) % galleryItems.length));
    }, []);

    // Keyboard Navigation
    useEffect(() => {
        if (selectedIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, showNext, showPrev]);

    const currentImage = selectedIndex !== null ? galleryItems[selectedIndex] : null;


    return (
        <section ref={sectionRef} className="min-h-[150vh] w-full bg-[#111111] relative p-8 md:p-20 hidden lg:flex flex-col items-center justify-center overflow-hidden">

            {/* Background Vignette - Dark edges */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80 z-0"></div>
            {/* Subtle Pink Glow - Center */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.08)_0%,rgba(0,0,0,0)_60%)] z-0"></div>

            {/* Explicit top margin/padding */}
            <div className="max-w-6xl w-full relative pt-32 md:pt-40 z-10">

                {/* Heart Grid Layout - 7 Columns */}
                <div className="grid grid-cols-7 gap-4 auto-rows-[120px]">
                    {galleryItems.map((item, index) => (
                        <div
                            key={item.id}
                            // Slowed down transition duration to 2000ms
                            className={`${item.className} transition-all duration-[2000ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ transitionDelay: randomDelays[index] || '0ms' }}
                        >
                            <GalleryCard
                                className="w-full h-full"
                                src={item.src}
                                alt={item.alt}
                                imageStyle={item.imageStyle}
                                onClick={() => openLightbox(index)}
                            />
                        </div>
                    ))}
                </div>


            </div>

            <div className={`absolute bottom-4 right-4 md:bottom-8 md:right-12 z-20 text-right max-w-md`}>
                <h2
                    className={`font-great-vibes text-6xl md:text-8xl text-white mb-6 transition-all duration-[2000ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ transitionDelay: randomTextDelays[0] || '1000ms' }}
                >
                    home
                </h2>
                <p
                    className={`text-gray-400 font-great-vibes italic text-3xl mb-6 transition-all duration-[2000ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ transitionDelay: randomTextDelays[1] || '1100ms' }}
                >
                    [my love, my everything!]
                </p>
                <div
                    className={`w-full h-px bg-gray-700 mb-8 transition-all duration-[2000ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ transitionDelay: randomTextDelays[2] || '1200ms' }}
                ></div>
                <p
                    className={`text-gray-300 font-great-vibes leading-relaxed text-2xl transition-all duration-[2000ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ transitionDelay: randomTextDelays[3] || '1300ms' }}
                >
                    The one who makes my heart skip a beat and feels like my forever home. Happy Valentine's Day, my love.
                </p>
            </div>

            {/* --- Lightbox Overlay --- */}
            <AnimatePresence custom={direction} mode="popLayout">
                {selectedIndex !== null && currentImage && (
                    <motion.div
                        key="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2 z-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        {/* Left Arrow */}
                        <button
                            onClick={(e) => { e.stopPropagation(); showPrev(); }}
                            className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-all hover:scale-110 p-4 z-50 hidden md:block"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>

                        {/* Main Image */}
                        <div
                            className="relative w-full max-w-[90vw] h-[85vh] flex items-center justify-center overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.img
                                key={currentImage.id}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "tween", duration: 0.4, ease: [0.32, 0.72, 0, 1] }, // Smooth cubic-bezier
                                    opacity: { duration: 0.3 }
                                }}
                                src={currentImage.src}
                                alt={currentImage.alt}
                                className="max-w-full max-h-full object-contain rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black will-change-transform"
                                style={currentImage.imageStyle ? { objectPosition: currentImage.imageStyle.objectPosition === '0% 20%' ? 'center' : 'center' } : {}}
                            />
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={(e) => { e.stopPropagation(); showNext(); }}
                            className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-all hover:scale-110 p-4 z-50 hidden md:block"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>

                        {/* Helper Text (Mobile) */}
                        <div className="absolute bottom-8 left-0 w-full text-center text-white/30 text-sm md:hidden pointer-events-none">
                            Tap sides to navigate
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
};

export default GallerySection;
