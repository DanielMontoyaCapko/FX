import { ReactNode } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AnimatedCard from "./animated-card";

interface ProductCardProps {
  title: string;
  description: string;
  interest: string;
  duration: string;
  isRenewable?: boolean;
  isActive?: boolean;
  onViewDetails?: () => void;
  flipContent?: {
    benefits: string[];
    requirements: string[];
    callToAction: string;
  };
}

export default function ProductCard({
  title,
  description,
  interest,
  duration,
  isRenewable = false,
  isActive = false,
  onViewDetails,
  flipContent
}: ProductCardProps) {
  const frontContent = (
    <Card className={`bg-[#040505] border-silver-500/20 h-full transition-all duration-300 ${
      isActive ? 'border-gold/50 shadow-lg shadow-gold/20' : ''
    }`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <Badge className={`${isActive ? 'bg-green-500' : 'bg-blue-500'} text-white`}>
            {duration}
          </Badge>
        </div>
        
        <p className="text-silver-100 mb-6 leading-relaxed text-sm">
          {description}
        </p>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-2xl font-bold text-green-500">{interest}</p>
            <p className="text-silver-100 text-xs">Rentabilidad anual</p>
          </div>
          <Badge className={`${isRenewable ? 'bg-green-500' : 'bg-orange-500'} text-white`}>
            {isRenewable ? 'Auto-renovable' : 'No renovable'}
          </Badge>
        </div>
        
        <Button 
          onClick={onViewDetails}
          className={`w-full py-2 transition-all duration-300 ${
            isActive 
              ? 'bg-gold hover:bg-gold/80 text-navy animate-pulse-gold' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isActive ? 'PRODUCTO ACTIVO' : 'VER DETALLES'}
        </Button>
      </CardContent>
    </Card>
  );

  const backContentElement = flipContent ? (
    <Card className="bg-gradient-to-br from-[#344e41] to-[#2d4235] border-gold/30 h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <h3 className="text-white font-bold text-lg mb-4">{title}</h3>
        
        <div className="mb-4">
          <h4 className="text-gold font-semibold mb-2">Beneficios:</h4>
          <ul className="text-silver-100 text-sm space-y-1">
            {flipContent.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gold mr-2">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h4 className="text-gold font-semibold mb-2">Requisitos:</h4>
          <ul className="text-silver-100 text-sm space-y-1">
            {flipContent.requirements.map((req, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gold mr-2">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto text-center">
          <p className="text-gold font-semibold">{flipContent.callToAction}</p>
        </div>
      </CardContent>
    </Card>
  ) : undefined;

  return (
    <AnimatedCard
      animationType="both"
      flipContent={backContentElement}
      className="h-full min-h-[280px]"
    >
      {frontContent}
    </AnimatedCard>
  );
}