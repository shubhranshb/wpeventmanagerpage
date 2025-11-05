import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ChevronDown, MapPin, AlertCircle, Navigation } from 'lucide-react';
import { useState } from 'react';

interface VenueInfoProps {
  venueName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

export function VenueInfo({ venueName, address, city, state, zipCode, country = "USA" }: VenueInfoProps) {
  const [isLayoutOpen, setIsLayoutOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  const venueRules = [
    "No outside food or beverages allowed",
    "Valid ID required for alcohol purchase (21+)",
    "No professional cameras or recording equipment",
    "Bags subject to search upon entry",
    "No re-entry once you leave the venue",
    "Smoking only in designated areas",
    "Be respectful to staff and other attendees"
  ];

  // Format full address for Google Maps
  const fullAddress = `${address}, ${city}, ${state} ${zipCode}, ${country}`;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

  return (
    <div className="mb-12">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-gradient-to-b from-[#8b5cf6] to-[#a78bfa] rounded-full"></div>
          <h2 className="text-2xl font-semibold text-gray-900">Venue</h2>
        </div>
        <div className="mt-3 h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent"></div>
      </div>
      <div className="pt-2 space-y-6">
        {/* Always Visible - Address and Directions */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 p-5 bg-gray-50/50 rounded-2xl border border-gray-200">
          <div className="flex-1">
            <h3 className="text-gray-900 mb-2 text-base font-medium">{venueName}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {address}, {city}, {state} {zipCode}{country !== "USA" && `, ${country}`}
            </p>
          </div>
          
          <Button 
            onClick={() => window.open(googleMapsUrl, '_blank')}
            className="bg-[#8b5cf6] hover:bg-[#7c3aed] shrink-0 shadow-md shadow-[#8b5cf6]/20 h-12 px-5 text-sm text-white"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Get Directions
          </Button>
        </div>

        <Separator className="bg-gray-200" />

        {/* Collapsible - Venue Layout */}
        <Collapsible open={isLayoutOpen} onOpenChange={setIsLayoutOpen}>
          <CollapsibleTrigger asChild>
            <button 
              className="flex items-center justify-between w-full p-4 rounded-2xl bg-white hover:bg-gray-50 transition-all border border-gray-200 hover:border-[#8b5cf6]/30"
              onClick={() => setIsLayoutOpen(!isLayoutOpen)}
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#8b5cf6]" />
                <span className="text-gray-900 text-base font-medium">Venue Layout</span>
              </div>
              <ChevronDown 
                className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                  isLayoutOpen ? 'transform rotate-180' : ''
                }`}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-4">
              <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                <div className="max-w-md mx-auto">
                  {/* Stage */}
                  <div className="bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] text-white text-center py-4 rounded-t-lg mb-6">
                    STAGE
                  </div>
                  
                  {/* VIP Section */}
                  <div className="mb-4">
                    <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 text-center">
                      <div className="text-sm text-yellow-800 mb-2">VIP Section</div>
                      <div className="grid grid-cols-8 gap-1">
                        {Array.from({ length: 32 }).map((_, i) => (
                          <div key={i} className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* General Admission */}
                  <div className="mb-4">
                    <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-4 text-center">
                      <div className="text-sm text-blue-800 mb-2">General Admission</div>
                      <div className="grid grid-cols-10 gap-1">
                        {Array.from({ length: 80 }).map((_, i) => (
                          <div key={i} className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Standing Area */}
                  <div className="bg-green-100 border-2 border-green-400 rounded-lg p-6 text-center">
                    <div className="text-sm text-green-800">Standing Area</div>
                    <div className="text-xs text-green-600 mt-1">Open Space</div>
                  </div>
                  
                  {/* Entrances */}
                  <div className="flex justify-between mt-6">
                    <div className="text-xs text-gray-600 bg-gray-200 px-3 py-1 rounded">← Entrance A</div>
                    <div className="text-xs text-gray-600 bg-gray-200 px-3 py-1 rounded">Entrance B →</div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator className="bg-gray-200" />

        {/* Collapsible - Venue Rules */}
        <Collapsible open={isRulesOpen} onOpenChange={setIsRulesOpen}>
          <CollapsibleTrigger asChild>
            <button 
              className="flex items-center justify-between w-full p-4 rounded-2xl bg-white hover:bg-gray-50 transition-all border border-gray-200 hover:border-[#8b5cf6]/30"
              onClick={() => setIsRulesOpen(!isRulesOpen)}
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-[#8b5cf6]" />
                <span className="text-gray-900 text-base font-medium">Venue Rules & Guidelines</span>
              </div>
              <ChevronDown 
                className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                  isRulesOpen ? 'transform rotate-180' : ''
                }`}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-5 space-y-3">
              {venueRules.map((rule, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#8b5cf6]/30 hover:shadow-sm transition-all">
                  <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] text-white text-sm rounded-full flex items-center justify-center shadow-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 flex-1 leading-relaxed text-sm">{rule}</p>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
