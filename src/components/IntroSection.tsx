"use client";

import React from 'react';

// Reusable card component to handle image holding and animations
const Card = ({
    children,
    className,
    rotate = "rotate-0",
    labelPosition = "top-left",
    labelText,
    isFront = false,
    imageSrc, // Optional image source
    imagePosition = "object-cover" // Optional image position/fit class
}: {
    children?: React.ReactNode,
    className?: string,
    rotate?: string,
    labelPosition?: "top-left" | "top-right",
    labelText: string,
    isFront?: boolean,
    imageSrc?: string,
    imagePosition?: string
}) => {
    return (
        <div className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${className} ${rotate} ${isFront ? 'z-10 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8),0_40px_80px_-30px_rgba(0,0,0,0.8)]' : 'z-0 shadow-[0_50px_90px_-10px_rgba(0,0,0,0.6)]'}`}>
            {/* Inner Container for Content (Clipped) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden rounded-sm">

                {/* Vintage Paper Base with Noise Texture */}
                <div className="absolute inset-0 bg-[#e0eec6]"></div>

                {/* Paper Grain/Noise Texture - Multiple layers for depth */}
                <div className="absolute inset-0 opacity-30 pointer-events-none z-[1]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}>
                </div>

                {/* Aged Paper Stains */}
                <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-[#d4c4a8] via-transparent to-[#c9b896] pointer-events-none z-[2]"></div>

                {/* Subtle yellowing around edges */}
                <div className="absolute inset-0 opacity-40 pointer-events-none z-[3] shadow-[inset_0_0_80px_rgba(180,160,120,0.5)]"></div>

                {/* Image Container - Inset to look like a Polaroid */}
                {imageSrc && (
                    <div className="absolute top-3 left-3 right-3 bottom-14 bg-black/10 z-[5] overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]">
                        <img src={imageSrc} alt="" className={`w-full h-full ${imagePosition}`} />
                        {/* Inner Vignette for the photo itself */}
                        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)] pointer-events-none mix-blend-multiply"></div>
                        {/* Subtle dust/noise on photo */}
                        <div className="absolute inset-0 bg-white/5 opacity-20 pointer-events-none mix-blend-overlay"></div>
                    </div>
                )}

                {/* Content Container (Labels etc) */}
                <div className={`w-full h-full relative ${imageSrc ? 'z-10' : ''}`}>
                    {children}
                </div>

                {/* Paper Grunge/Vignette Overlay for the whole card */}
                <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_60px_rgba(80,70,50,0.4)] mix-blend-multiply rounded-sm"></div>

                {/* Edge wear/aging effect */}
                <div className="absolute inset-0 z-20 pointer-events-none rounded-sm border-[1px] border-[#c9b896]/30"></div>
            </div>
        </div>
    );
};



const backgroundCards = [
    // Top Row
    { id: 1, src: '/vd12.jpg', style: { top: '-5%', left: '0%', transform: 'rotate(-15deg) scale(0.8)' } },
    { id: 2, src: '/vd9.jpg', style: { top: '-10%', left: '25%', transform: 'rotate(-10deg) scale(0.7)' } },
    { id: 3, src: '/vd16.jpg', style: { top: '-12%', right: '25%', transform: 'rotate(10deg) scale(1)' } },
    { id: 4, src: '/vd14.jpg', style: { top: '-5%', right: '0%', transform: 'rotate(15deg) scale(0.8)' } },

    // Middle Side Cards (Flanking the center)
    { id: 5, src: '/vd5.jpg', style: { top: '30%', left: '-5%', transform: 'rotate(8deg) scale(0.85)' } },
    { id: 6, src: '/vd6.jpg', style: { top: '35%', right: '-5%', transform: 'rotate(-8deg) scale(0.85)' } },

    // Bottom Row
    { id: 7, src: '/vd7.jpg', style: { bottom: '-5%', left: '5%', transform: 'rotate(12deg) scale(0.8)' } },
    { id: 8, src: '/vd11.jpg', style: { bottom: '-10%', left: '30%', transform: 'rotate(-5deg) scale(0.7)' } },
    { id: 9, src: '/vd3.jpg', style: { bottom: '-10%', right: '30%', transform: 'rotate(8deg) scale(0.7)' } },
    { id: 10, src: '/vd15.jpg', style: { bottom: '-5%', right: '2%', transform: 'rotate(-12deg) scale(0.8)' } },
];

const IntroSection = () => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [randomBgDelays, setRandomBgDelays] = React.useState<string[]>([]);
    const [randomMainDelays, setRandomMainDelays] = React.useState<string[]>([]);

    React.useEffect(() => {
        setIsLoaded(true);
        // Generate random delays for background cards (0-1500ms)
        setRandomBgDelays(backgroundCards.map(() => `${Math.random() * 1500}ms`));
        // Generate random delays for main cards (500-2000ms for a slightly later start)
        setRandomMainDelays([
            `${500 + Math.random() * 1500}ms`,
            `${500 + Math.random() * 1500}ms`,
            `${500 + Math.random() * 1500}ms`
        ]);
    }, []);

    return (
        <section className="relative min-h-screen w-full bg-[#FAF6F2] p-8 overflow-hidden font-sans text-gray-800">

            {/* Scattered Background Cards */}
            <div className="absolute inset-0 z-0">
                {backgroundCards.map((card, index) => (
                    <div
                        key={card.id}
                        className={`absolute shadow-lg transition-all duration-[2000ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                        style={{
                            ...card.style,
                            transitionDelay: randomBgDelays[index] || '0ms'
                        }}
                    >
                        <div className={`w-[300px] h-[400px] relative transition-transform duration-500 hover:z-50 cursor-pointer ${(card.id === 8) ? 'hover:-translate-y-24 hover:scale-110 hover:rotate-[4deg]' :
                            (card.id === 9) ? 'hover:-translate-y-24 hover:scale-110 hover:rotate-[-4deg]' :
                                (card.id === 5) ? 'hover:translate-x-12 hover:scale-110' :
                                    (card.id === 7) ? 'hover:-translate-y-12 hover:-translate-x-12 hover:scale-110' :
                                        (card.id === 1) ? 'hover:translate-x-4 hover:rotate-[4deg] hover:scale-110' :
                                            (card.id === 4) ? 'hover:-translate-x-4 hover:rotate-[-4deg] hover:scale-110' :
                                                (card.id === 2) ? 'hover:scale-110 hover:rotate-[4deg]' :
                                                    (card.id === 3) ? 'hover:scale-110 hover:rotate-[-4deg]' :
                                                        'hover:scale-110'
                            }`}>
                            <Card
                                className="bg-white"
                                labelText="" // No label for background cards for now
                                isFront={true}
                                imageSrc={card.src}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Background Vignette/Edge Shadow - Darker and Deeper */}
            <div className={`absolute inset-0 pointer-events-none shadow-[inset_0_0_900px_rgba(236,72,153,0.5)] z-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}></div>



            {/* Main Content Area - Increased gap */}
            <div className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-32 md:gap-24 lg:gap-64 pt-10">

                {/* Item 1: Thank You Card */}
                <div
                    className={`relative group rotate-2 transition-all duration-[2000ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                    style={{ transitionDelay: randomMainDelays[0] || '0ms' }}
                >
                    <div className="relative w-[300px] h-[380px] mx-auto perspective-1000">
                        {/* Back Card - Slides RIGHT + Tilt RIGHT */}
                        <div className="absolute top-4 left-16 w-full h-full transition-transform duration-500 transform rotate-3 group-hover:translate-x-20 group-hover:rotate-6 origin-center">
                            <Card className="bg-[#f2f0eb]" labelPosition="top-right" labelText="BACK" rotate="rotate-0" imageSrc="/vd2.jpg" />
                        </div>

                        {/* Front Card - Slides LEFT + Tilt LEFT */}
                        <div className="absolute top-0 left-0 w-full h-full transition-transform duration-500 group-hover:-translate-x-4 group-hover:-rotate-3 z-10">
                            <Card className="bg-white" labelPosition="top-left" labelText="FRONT" isFront={true} imageSrc="/vd1.jpg" />
                        </div>
                    </div>
                </div>

                {/* Item 2: Table Number */}
                <div
                    className={`relative group mt-12 md:mt-0 -rotate-1 transition-all duration-[2000ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                    style={{ transitionDelay: randomMainDelays[1] || '0ms' }}
                >
                    <div className="relative w-[280px] h-[190px] mx-auto">
                        {/* Back Card - Slides DOWN */}
                        <div className="absolute top-12 left-12 w-full h-full transition-transform duration-500 group-hover:translate-y-20 rotate-3">
                            <Card className="bg-[var(--color-sage-dark)]" labelPosition="top-right" labelText="BACK" imageSrc="/vd13.jpg" />
                        </div>

                        {/* Front Card - Slides UP */}
                        <div className="absolute top-0 left-0 w-full h-full transition-transform duration-500 group-hover:-translate-x-0 group-hover:-translate-y-4 z-10 -rotate-2">
                            <Card className="bg-[var(--color-sage)]" labelPosition="top-left" labelText="FRONT" isFront={true} imageSrc="/vd10.jpg" />
                        </div>
                    </div>
                </div>

                {/* Item 3: Menu */}
                <div
                    className={`relative group mt-12 md:mt-0 rotate-1 transition-all duration-[2000ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                    style={{ transitionDelay: randomMainDelays[2] || '0ms' }}
                >
                    <div className="relative w-[280px] h-[550px] mx-auto">
                        {/* Back Card - Slides RIGHT + Tilt RIGHT */}
                        <div className="absolute top-4 left-24 w-full h-full transform -rotate-2 group-hover:translate-x-20 group-hover:rotate-6 origin-center transition-transform duration-500 rotate-2">
                            <Card className="bg-[var(--color-tan-dark)]" labelPosition="top-right" labelText="BACK" rotate="rotate-0" imageSrc="/n1.jpg" />
                        </div>

                        {/* Front Card - Slides LEFT + Tilt LEFT */}
                        <div className="absolute top-0 left-0 w-full h-full transition-transform duration-500 group-hover:-translate-x-4 group-hover:-rotate-3 z-10 -rotate-2">
                            <Card className="bg-[var(--color-tan)]" labelPosition="top-left" labelText="FRONT" isFront={true} imageSrc="/vd17.jpg" />
                        </div>
                    </div>
                </div>
            </div>


            {/* Top Gradient Fade to Blend with Previous Section/Header */}
            <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-[#111111]/40 via-[#111111]/10 to-transparent z-20 pointer-events-none"></div>

            {/* Bottom Gradient Fade to Blend with Next Section */}
            <div className="absolute bottom-0 left-0 w-full h-[800px] bg-gradient-to-b from-transparent via-[#111111]/40 to-[#111111] z-20 pointer-events-none"></div>

        </section>
    );
};

export default IntroSection;
