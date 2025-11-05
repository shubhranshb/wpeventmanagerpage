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
    <Card className="relative overflow-hidden border-none shadow-xl rounded-2xl" style={{background: 'linear-gradient(to right, #4d4a9a, #2c2a7a, #412687, #4e2089)'}}>
      <CardContent className="p-5 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-white" />
          <span className="text-white tracking-wide uppercase text-xs font-semibold">Event starts in</span>
        </div>
        
        <div className="flex gap-2 justify-center">
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="bg-[#3D226B] rounded-lg px-4 py-3 min-w-[68px] border border-[#4A2A7A]">
              <div className="text-2xl text-white font-mono tabular-nums tracking-tight font-bold">
                {timeLeft.days.toString().padStart(2, '0')}
              </div>
            </div>
            <span className="text-[10px] text-white/90 mt-1.5 uppercase tracking-wider font-medium">DAYS</span>
          </div>

          <div className="flex items-center pb-6">
            <span className="text-xl text-white/80 font-mono font-bold">:</span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="bg-[#3D226B] rounded-lg px-4 py-3 min-w-[68px] border border-[#4A2A7A]">
              <div className="text-2xl text-white font-mono tabular-nums tracking-tight font-bold">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
            </div>
            <span className="text-[10px] text-white/90 mt-1.5 uppercase tracking-wider font-medium">HRS</span>
          </div>

          <div className="flex items-center pb-6">
            <span className="text-xl text-white/80 font-mono font-bold">:</span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="bg-[#3D226B] rounded-lg px-4 py-3 min-w-[68px] border border-[#4A2A7A]">
              <div className="text-2xl text-white font-mono tabular-nums tracking-tight font-bold">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
            </div>
            <span className="text-[10px] text-white/90 mt-1.5 uppercase tracking-wider font-medium">MIN</span>
          </div>

          <div className="flex items-center pb-6">
            <span className="text-xl text-white/80 font-mono font-bold">:</span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="bg-[#3D226B] rounded-lg px-4 py-3 min-w-[68px] border border-[#4A2A7A]">
              <div className="text-2xl text-white font-mono tabular-nums tracking-tight font-bold">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
            </div>
            <span className="text-[10px] text-white/90 mt-1.5 uppercase tracking-wider font-medium">SEC</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
