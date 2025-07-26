import { ReactNode, useState } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  flipContent?: ReactNode;
  animationType?: 'flip' | 'zoom' | 'both';
  className?: string;
}

export default function AnimatedCard({ 
  children, 
  flipContent, 
  animationType = 'both',
  className = '' 
}: AnimatedCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const shouldFlip = (animationType === 'flip' || animationType === 'both') && flipContent;
  const shouldZoom = animationType === 'zoom' || animationType === 'both';

  return (
    <div 
      className={`relative w-full h-full cursor-pointer ${className}`}
      style={{ perspective: '1000px' }}
      onMouseEnter={() => shouldFlip && setIsFlipped(true)}
      onMouseLeave={() => shouldFlip && setIsFlipped(false)}
    >
      <div
        className={`
          relative w-full h-full transition-all duration-700 transform-gpu
          ${shouldFlip ? 'transform-style-preserve-3d' : ''}
          ${shouldZoom ? 'hover:scale-105' : ''}
          ${isFlipped && shouldFlip ? 'rotate-y-180' : ''}
        `}
        style={{ 
          transformStyle: shouldFlip ? 'preserve-3d' : 'flat',
          transform: isFlipped && shouldFlip ? 'rotateY(180deg)' : shouldZoom ? undefined : 'none'
        }}
      >
        {/* Front side */}
        <div
          className={`
            absolute inset-0 w-full h-full rounded-lg
            ${shouldFlip ? 'backface-hidden' : ''}
            transition-all duration-500
            ${shouldZoom && !shouldFlip ? 'hover:scale-105 hover:shadow-2xl hover:shadow-gold/20' : ''}
          `}
          style={{ 
            backfaceVisibility: shouldFlip ? 'hidden' : 'visible',
            transform: shouldFlip ? 'rotateY(0deg)' : 'none'
          }}
        >
          {children}
        </div>

        {/* Back side - only if flip content is provided */}
        {flipContent && shouldFlip && (
          <div
            className="absolute inset-0 w-full h-full rounded-lg backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {flipContent}
          </div>
        )}
      </div>
    </div>
  );
}

// Utility component for strategy cards with predefined animations
interface StrategyCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  backContent?: {
    details: string[];
    callToAction?: string;
  };
  colSpan?: boolean;
}

export function StrategyCard({ icon: Icon, title, description, backContent, colSpan }: StrategyCardProps) {
  const frontContent = (
    <div className="bg-black/70 backdrop-blur-sm p-8 rounded-xl border border-silver-500/20 h-full">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-[#344e41] rounded-full flex items-center justify-center flex-shrink-0">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="font-playfair text-xl font-bold text-white leading-tight">{title}</h3>
      </div>
      <p className="text-silver-100 leading-relaxed">{description}</p>
    </div>
  );

  const backContentElement = backContent ? (
    <div className="bg-gradient-to-br from-[#344e41] to-[#2d4235] backdrop-blur-sm p-8 rounded-xl border border-gold/30 h-full">
      <h3 className="font-playfair text-xl font-bold text-white mb-6">{title}</h3>
      <ul className="text-silver-100 space-y-3 mb-6">
        {backContent.details.map((detail, index) => (
          <li key={index} className="flex items-start">
            <span className="text-gold mr-2">•</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
      {backContent.callToAction && (
        <div className="mt-auto">
          <p className="text-gold font-semibold text-center">{backContent.callToAction}</p>
        </div>
      )}
    </div>
  ) : undefined;

  return (
    <div className={colSpan ? "md:col-span-2" : ""}>
      <AnimatedCard
        animationType="both"
        flipContent={backContentElement}
        className="h-full min-h-[200px]"
      >
        {frontContent}
      </AnimatedCard>
    </div>
  );
}