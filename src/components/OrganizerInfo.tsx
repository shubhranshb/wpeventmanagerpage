import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { UserPlus, Mail, User, Calendar, Clock, Award, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

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
          <div className="h-8 w-1 bg-gradient-to-b from-[#8b5cf6] to-[#a78bfa] rounded-full"></div>
          <h2 className="text-2xl font-semibold text-gray-900">About the Organizer</h2>
        </div>
        <div className="mt-3 h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent"></div>
      </div>
      <div className="pt-2">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-gray-200">
                  <AvatarImage src={profileImage} alt={name} />
                  <AvatarFallback className="bg-gray-100 text-gray-600 text-xl font-semibold">
                    {getInitials(name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-gray-900 text-xl font-semibold">{name}</div>
                    <div className="flex items-center gap-1 text-[#10b981]">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Event Organizer</div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                <Button
                  className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-sm h-10 px-6"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Follow
                </Button>
                <Button
                  variant="outline"
                  className="border border-gray-300 hover:bg-gray-50 h-10 px-6"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button
                  variant="outline"
                  className="border border-gray-300 hover:bg-gray-50 h-10 px-6"
                >
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-[#e9d5ff] via-[#f3e8ff] to-[#faf5ff] rounded-xl border border-[#e9d5ff]/50">
                <div className="bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] p-2.5 rounded-lg shadow-sm">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-gray-900 text-lg font-semibold">{totalEvents}</div>
                  <div className="text-[10px] text-gray-600 uppercase tracking-wide">Events Hosted</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-[#e9d5ff] via-[#f3e8ff] to-[#faf5ff] rounded-xl border border-[#e9d5ff]/50">
                <div className="bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] p-2.5 rounded-lg shadow-sm">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-gray-900 text-lg font-semibold">{yearsOnPlatform} Years</div>
                  <div className="text-[10px] text-gray-600 uppercase tracking-wide">On Platform</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-[#d1fae5] via-[#ecfdf5] to-[#f0fdf4] rounded-xl border border-[#d1fae5]/50">
                <div className="bg-gradient-to-br from-[#10b981] to-[#34d399] p-2.5 rounded-lg shadow-sm">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-gray-900 text-lg font-semibold">Trusted</div>
                  <div className="text-[10px] text-gray-600 uppercase tracking-wide">Partner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
