import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import logoPath from "@assets/Logo-removeBG_1753542032142.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoadingComplete();
          }, 500); // Small delay after reaching 100%
          return 100;
        }
        // Random increment between 1-5 for more natural loading
        const increment = Math.floor(Math.random() * 5) + 1;
        return Math.min(oldProgress + increment, 100);
      });
    }, 100); // Update every 100ms

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={logoPath}
            alt="Nakama&Partners"
            className="w-32 h-32 object-contain filter brightness-110"
          />
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent font-serif">
            Nakama&Partners
          </h1>
          <p className="text-emerald-200/80 text-lg font-light">
            Plataforma de Inversión Financiera
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <div className="w-full bg-black/40 rounded-full h-3 border border-emerald-500/20">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
          
          {/* Progress Percentage */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-emerald-200/60">Cargando...</span>
            <span className="text-emerald-400 font-mono font-semibold">
              {progress}%
            </span>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}