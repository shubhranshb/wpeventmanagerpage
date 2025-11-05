import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Ticket } from 'lucide-react';

interface FloatingTicketButtonProps {
  price: number;
  onClick: () => void;
}

export function FloatingTicketButton({ price, onClick }: FloatingTicketButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-5 border border-white/20 animate-pulse-glow max-w-[240px]">
        <div className="text-center mb-4">
          <div className="text-xs text-gray-600 mb-1.5 uppercase tracking-wide">Starting from</div>
          <div className="text-gray-900 text-2xl font-semibold">${price}</div>
        </div>
        
        <Button 
          className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] shadow-lg hover:shadow-xl transition-all h-12 text-sm text-white"
          size="lg"
          onClick={onClick}
        >
          <Ticket className="mr-2 h-4 w-4" />
          Buy Tickets
        </Button>
      </div>
    </div>
  );
}
