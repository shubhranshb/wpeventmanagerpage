import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const difference = +targetDate - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-[#0096ff] via-[#33aaff] to-[#66bfff] border-none shadow-xl rounded-2xl">
      {/* Animated shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      <CardContent className="p-5 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-white" />
          <span className="text-white tracking-wide uppercase text-sm font-bold">Event starts in</span>
        </div>
        
        <div className="flex gap-3 justify-center">
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-xl px-4 py-3 min-w-[68px] border-2 border-white/50 shadow-xl shadow-[#0096ff]/30">
              <div className="text-2xl text-[#0096ff] font-mono tabular-nums tracking-tight font-bold">
                {timeLeft.days.toString().padStart(2, '0')}
              </div>
            </div>
            <span className="text-[10px] text-white/90 mt-2 uppercase tracking-wider font-medium">DAYS</span>
          </div>

          <div className="flex items-center pb-6">
            <span className="text-xl text-white/70 font-mono font-bold">:</span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-xl px-4 py-3 min-w-[68px] border-2 border-white/50 shadow-xl shadow-[#0096ff]/30">
              <div className="text-2xl text-[#0096ff] font-mono tabular-nums tracking-tight font-bold">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
            </div>
            <span className="text-[10px] text-white/90 mt-2 uppercase tracking-wider font-medium">HRS</span>
          </div>

          <div className="flex items-center pb-6">
            <span className="text-xl text-white/70 font-mono font-bold">:</span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-xl px-4 py-3 min-w-[68px] border-2 border-white/50 shadow-xl shadow-[#0096ff]/30">
              <div className="text-2xl text-[#0096ff] font-mono tabular-nums tracking-tight font-bold">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
            </div>
            <span className="text-[10px] text-white/90 mt-2 uppercase tracking-wider font-medium">MIN</span>
          </div>

          <div className="flex items-center pb-6">
            <span className="text-xl text-white/70 font-mono font-bold">:</span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-xl px-4 py-3 min-w-[68px] border-2 border-white/50 shadow-xl shadow-[#0096ff]/30">
              <div className="text-2xl text-[#0096ff] font-mono tabular-nums tracking-tight font-bold">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
            </div>
            <span className="text-[10px] text-white/90 mt-2 uppercase tracking-wider font-medium">SEC</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
