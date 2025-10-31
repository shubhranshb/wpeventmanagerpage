import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Ticket } from 'lucide-react';

interface FloatingTicketButtonProps {
  startingPrice: number;
  ticketSaleDate?: Date;
  onBuyClick: () => void;
}

export function FloatingTicketButton({ startingPrice, ticketSaleDate, onBuyClick }: FloatingTicketButtonProps) {
  const [timeUntilSale, setTimeUntilSale] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (ticketSaleDate) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const saleTime = ticketSaleDate.getTime();
        const difference = saleTime - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          
          setTimeUntilSale(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeUntilSale('');
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [ticketSaleDate]);

  const isSaleOpen = !ticketSaleDate || new Date() >= ticketSaleDate;

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-5 border border-white/20 animate-pulse-glow max-w-[240px]">
        <div className="text-center mb-4">
          <div className="text-xs text-gray-600 mb-1.5 uppercase tracking-wide">Starting from</div>
          <div className="text-gray-900 text-2xl font-semibold">${startingPrice}</div>
        </div>
        
        {isSaleOpen ? (
          <Button 
            className="w-full bg-gradient-to-r from-[#0096ff] to-[#33aaff] hover:from-[#33aaff] hover:to-[#66bfff] shadow-lg hover:shadow-xl transition-all h-12 text-sm text-white"
            size="lg"
            onClick={onBuyClick}
          >
            <Ticket className="mr-2 h-4 w-4" />
            Buy Tickets
          </Button>
        ) : (
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-2 uppercase tracking-wide">Sales start in</div>
            <div className="text-[#006fcc] text-base font-medium mb-3 animate-pulse-glow">{timeUntilSale}</div>
            <Button 
              className="w-full bg-gradient-to-r from-[#33aaff] to-[#66bfff] hover:from-[#4db5ff] hover:to-[#80ccff] shadow-lg hover:shadow-xl transition-all h-12 text-sm text-white"
              onClick={onBuyClick}
            >
              <Ticket className="mr-2 h-4 w-4" />
              Get Notified
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
