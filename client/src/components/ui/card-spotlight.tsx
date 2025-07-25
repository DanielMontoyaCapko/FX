import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function CardSpotlight({
  children,
  className,
  ...props
}: CardSpotlightProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-silver-500/20 bg-black/70 p-8 transition-all duration-300",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(52, 78, 65, 0.15), transparent 70%)`
            : "none",
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      {/* Border spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(52, 78, 65, 0.8), transparent 70%)`
            : "none",
          opacity: isHovered ? 1 : 0,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}