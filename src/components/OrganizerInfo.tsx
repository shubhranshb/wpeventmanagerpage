import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Calendar, Award, Clock } from 'lucide-react';

interface OrganizerInfoProps {
  name: string;
  totalEvents: number;
  yearsOnPlatform: number;
  profileImage?: string;
}

export function OrganizerInfo({ name, totalEvents, yearsOnPlatform, profileImage }: OrganizerInfoProps) {
  // Get initials from name
  const getInitials = (name: string | undefined) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="mb-12">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-[#0096ff] rounded-full"></div>
          <h2 className="text-2xl font-semibold text-gray-900">About the Organizer</h2>
        </div>
        <div className="mt-3 h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent"></div>
      </div>
      <div className="pt-2">
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
              <AvatarImage src={profileImage} alt={name} />
              <AvatarFallback className="bg-[#0096ff] text-white text-lg">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-gray-900 text-lg font-medium mb-1">{name}</div>
              <div className="text-xs text-gray-600">Event Organizer</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#0096ff] p-2.5 rounded-lg shadow-sm">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-gray-900 text-lg font-semibold">{totalEvents}</div>
                <div className="text-[10px] text-gray-600 uppercase tracking-wide">Events Hosted</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#0096ff] p-2.5 rounded-lg shadow-sm">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-gray-900 text-lg font-semibold">{yearsOnPlatform} Years</div>
                <div className="text-[10px] text-gray-600 uppercase tracking-wide">On Platform</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#0096ff] p-2.5 rounded-lg shadow-sm">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-gray-900 text-lg font-semibold">Verified</div>
                <div className="text-[10px] text-gray-600 uppercase tracking-wide">Trusted Partner</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
