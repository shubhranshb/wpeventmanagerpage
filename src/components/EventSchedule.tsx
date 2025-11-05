import { Clock } from 'lucide-react';

interface EventDate {
  date: string;
  startTime: string;
  endTime: string;
}

interface EventScheduleProps {
  eventDates: EventDate[];
  isSingleDay?: boolean;
}

export function EventSchedule({ eventDates, isSingleDay = false }: EventScheduleProps) {
  // Parse date to get day and month
  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    return { month, day, weekday };
  };


  return (
    <div className="mb-12">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-gradient-to-b from-[#8b5cf6] to-[#7c3aed] rounded-full"></div>
          <h2 className="text-2xl font-semibold text-gray-900">{isSingleDay ? 'Event Details' : 'Event Schedule'}</h2>
        </div>
        <div className="mt-3 h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent"></div>
      </div>
      <div className="pt-2">
        <div className={`grid gap-5 ${isSingleDay ? 'grid-cols-1 max-w-2xl' : 'grid-cols-1 md:grid-cols-3'}`}>
          {eventDates.map((eventDate, index) => {
            const { month, day, weekday } = parseDate(eventDate.date);
            
            return (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-md hover:border-[#8b5cf6]/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  <div className="flex gap-3">
                    {/* Calendar Icon */}
                    <div className="flex-shrink-0">
                      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 w-16">
                        <div className={`bg-[#8b5cf6] text-white text-center py-1.5`}>
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
                      {!isSingleDay && <div className="text-gray-900 mb-2 text-base font-medium">Day {index + 1}</div>}
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-3.5 w-3.5 flex-shrink-0 text-[#8b5cf6]" />
                        <span className="text-xs truncate">
                          {eventDate.startTime} - {eventDate.endTime}
                        </span>
                      </div>
                      {isSingleDay && (
                        <div className="mt-2 text-xs text-gray-500">
                          {eventDate.date}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Mini accent badge */}
                  <div className={`absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#8b5cf6]`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
