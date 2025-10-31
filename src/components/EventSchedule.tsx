import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Clock } from 'lucide-react';

interface EventDate {
  date: string;
  startTime: string;
  endTime: string;
}

interface EventScheduleProps {
  eventDates: EventDate[];
}

export function EventSchedule({ eventDates }: EventScheduleProps) {
  // Parse date to get day and month
  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    return { month, day, weekday };
  };


  return (
    <Card className="mb-10 border border-gray-200 shadow-md hover:shadow-lg rounded-2xl overflow-hidden bg-white">
      <CardHeader className="pb-5 pt-6 px-8">
        <CardTitle className="text-gray-900 text-xl font-semibold">Event Schedule</CardTitle>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {eventDates.map((eventDate, index) => {
            const { month, day, weekday } = parseDate(eventDate.date);
            
            return (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-md hover:border-[#0096ff]/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  <div className="flex gap-3">
                    {/* Calendar Icon */}
                    <div className="flex-shrink-0">
                      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 w-16">
                        <div className={`bg-[#0096ff] text-white text-center py-1.5`}>
                          <div className="text-[10px] uppercase tracking-wider">{month}</div>
                        </div>
                        <div className="text-center py-2.5 bg-white">
                          <div className="text-gray-900 text-xl leading-none font-semibold">{day}</div>
                          <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">{weekday}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Event Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="text-gray-900 mb-2 text-base font-medium">Day {index + 1}</div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-3.5 w-3.5 flex-shrink-0 text-[#0096ff]" />
                        <span className="text-xs truncate">
                          {eventDate.startTime} - {eventDate.endTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Mini accent badge */}
                  <div className={`absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#0096ff]`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
