"use client";

import React from 'react';

// Reused Card component from IntroSection for consistency
const Card = ({
    children,
    className,
    rotate = "rotate-0",
    isFront = false,
    imageSrc,
    imagePosition = "object-cover"
}: {
    children?: React.ReactNode,
    className?: string,
    rotate?: string,
    isFront?: boolean,
    imageSrc?: string,
    imagePosition?: string
}) => {
    return (
        <div className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${className} ${rotate} ${isFront ? 'z-10 shadow-[0_20px_60px_-10px_rgba(220,38,38,0.5),0_40px_80px_-20px_rgba(0,0,0,0.6)]' : 'z-0 shadow-[0_15px_50px_-10px_rgba(220,38,38,0.4),0_30px_60px_-20px_rgba(0,0,0,0.5)]'}`}>
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

                {/* Content Container */}
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

const NoteSection = () => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [randomDelays, setRandomDelays] = React.useState<string[]>([]);
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

    const sectionRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsLoaded(true);
                    observer.disconnect(); // Correctly disconnect after triggering
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
        // Generate random delays for the components (0-1500ms)
        setRandomDelays([
            `${Math.random() * 1500}ms`,
            `${Math.random() * 1500}ms`,
            `${Math.random() * 1500}ms`
        ]);

        // Auto-resize on load (kept separate for clarity, runs when loaded)
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, []);

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const target = e.currentTarget;
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
    };

    return (
        <section ref={sectionRef} className="relative bg-[#1a1a1a] min-h-screen w-full px-6 py-32 md:px-20 md:py-48 font-serif text-[#e0e0e0] overflow-hidden">

            {/* Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.8) 100%)'
                }}>
            </div>

            <div className={`relative z-10 max-w-7xl mx-auto`}>

                {/* Top Section Header */}
                <div className="mb-20">
                    <h2 className="text-4xl font-great-vibes md:text-5xl font-normal tracking-wide inline-block border-b pb-4 border-gray-700 text-gray-200">
                        Note
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-36 lg:gap-48">

                    {/* Left Column: Images */}
                    <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-24 relative perspective-1000 pt-12">

                        {/* Card 1: Static Image - Tilted Left */}
                        <div
                            className={`relative group w-[280px] h-[340px] transform -rotate-6 transition-all duration-[2000ms] ease-out hover:rotate-0 hover:scale-110 hover:z-20 cursor-pointer ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ transitionDelay: randomDelays[0] || '0ms' }}
                        >
                            <Card
                                isFront={true}
                                imageSrc="/vd4.jpg"
                            />
                        </div>

                        {/* Card 2: Static Image - Tilted Right */}
                        <div
                            className={`relative group w-[280px] h-[340px] transform rotate-6 transition-all duration-[2000ms] ease-out hover:rotate-0 hover:scale-110 hover:z-20 cursor-pointer ml-auto -mt-12 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ transitionDelay: randomDelays[1] || '0ms' }}
                        >
                            <Card
                                isFront={true}
                                imageSrc="/n2.jpg"
                            />
                        </div>

                    </div>

                    {/* Right Column: Text Content */}
                    <div
                        className={`md:col-span-8 lg:col-span-9 flex flex-col transition-all duration-[2000ms] ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                        style={{ transitionDelay: randomDelays[2] || '0ms' }}
                    >

                        {/* Header Info */}
                        <div className="mb-12 border-b border-gray-800 pb-10">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-16 mb-4">
                                <span className="text-2xl tracking-[0.2em] font-great-vibes text-gray-500">To my honeybee, My love!</span>
                            </div>

                            <h1 className=" font-great-vibes text-5xl md:text-7xl font-medium mb-6 tracking-tight leading-tight text-white">
                                My dearest Katrina ...
                            </h1>
                        </div>

                        {/* Main Body Text */}
                        <div className=" mb-16 max-w-4xl">
                            <textarea
                                ref={textAreaRef}
                                className="w-full min-h-[300px] bg-transparent border-none focus:ring-0 text-gray-200 text-2xl md:text-3xl font-great-vibes leading-relaxed tracking-wide resize-none overflow-hidden outline-none p-0 placeholder-gray-600"
                                placeholder="Write your letter here..."
                                defaultValue={`   As I sit down to write this, my heart feels heavy and an overwhelming emotion fills me up. I know we didn't start off on the best of situations. There were a lot of hiccups as we started this life together but however did we start , it doesn't matter to me anymore. What matters is that we are together now and we have each other. I love you so much, your smile, your sweetness and your cute little "okay", I love em all so much. Thank you so much for choosing me that day and coming into my life. 
I know we aren't always rainbows, we have our ups and downs, our disagreements and our arguments. But, at the end of the day, I can't thank you enough for staying with me and putting up with my bullshit and my tantrums. I know I'm not the best boyfriend, I'm not good at expressing, I'm not that clingy, I overthinking from time to time, heck I can't even express my love and feelings for you sometimes properly to you but I want you to know that I love you so so much and for you I'm willing to adjust and learn and at the end of the day, I'm willing to be there for you when things get tough and when things are nice. 
Thank you for being you, I am so proud to be your boyfriend. I promise to love you, support you and cherish you for the rest of my life till our hair go grey. You are my forever, my everything.`}
                                onInput={handleInput}
                            />
                        </div>

                        {/* Bottom Columns (Skills/Contact equivalent) */}
                        <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 max-w-3xl">
                            <div>
                                <h3 className="text-xl md:text-4xl mb-6 font-great-vibes text-gray-200">Sincerely,</h3>
                                <ul className="space-y-4 font-great-vibes text-xs md:text-2xl text-gray-500 tracking-wide leading-relaxed">
                                    <li>- With all my love</li>
                                    <li>- Your honeybun chef!</li>
                                </ul>
                            </div>
                            {/* Socials section removed as requested */}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default NoteSection;
