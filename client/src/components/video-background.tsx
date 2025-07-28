import { useState, useEffect } from "react";
import videoBackground from "@/assets/Video Logo Fondo_1752489214378.mp4";

export default function VideoBackground() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Only load video after critical content is ready
    const loadVideo = () => {
      if (document.readyState === 'complete') {
        setTimeout(() => setShowVideo(true), 300);
      } else {
        window.addEventListener('load', () => {
          setTimeout(() => setShowVideo(true), 300);
        });
      }
    };

    loadVideo();
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Fallback background while video loads */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-charcoal/90 to-black/95"></div>
      
      {showVideo && (
        <video 
          autoPlay 
          loop
          muted 
          playsInline
          preload="none"
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-60' : 'opacity-0'
          }`}
          style={{ filter: 'brightness(0.6)' }}
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => console.log('Video failed to load')}
        >
          <source src={videoBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      <div className="absolute inset-0 bg-black/60"></div>
    </div>
  );
}