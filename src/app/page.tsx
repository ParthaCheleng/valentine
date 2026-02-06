"use client";
import { useState } from "react";
import IntroSection from "@/components/IntroSection";
import GallerySection from "@/components/GallerySection";
import NoteSection from "@/components/NoteSection";
import Gateway from "@/components/Gateway";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [appState, setAppState] = useState<'gateway' | 'loading' | 'content'>('gateway');

  const handleGatewayEnter = () => {
    setAppState('loading');
  };

  const handleLoadingComplete = () => {
    setAppState('content');
  };

  return (
    <main className="flex flex-col w-full">
      {appState === 'gateway' && (
        <Gateway onEnter={handleGatewayEnter} />
      )}

      {appState === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {appState === 'content' && (
        <>
          <IntroSection />
          <GallerySection />
          <NoteSection />
        </>
      )}
    </main>
  );
}
