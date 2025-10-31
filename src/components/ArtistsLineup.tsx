import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Badge } from './ui/badge';
import { Music2, Star, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

export interface Artist {
  name: string;
  genre: string;
  headliner?: boolean;
  imageUrl?: string;
  performanceDay?: number;
}

interface ArtistsLineupProps {
  artists: Artist[];
}

export function ArtistsLineup({ artists }: ArtistsLineupProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-10 border border-gray-200 shadow-md hover:shadow-lg rounded-2xl overflow-hidden bg-white">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="cursor-pointer pb-5 pt-6 px-8 hover:bg-gray-50/50 transition-colors" onClick={() => setIsOpen(!isOpen)}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between w-full">
              <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                <Music2 className="h-6 w-6 text-[#0096ff]" />
                Featured Artists
              </CardTitle>
              <ChevronDown 
                className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                  isOpen ? 'transform rotate-180' : ''
                }`}
              />
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {artists.map((artist, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              {/* Artist Image */}
              <div className="relative h-48 overflow-hidden bg-gray-50">
                {artist.imageUrl ? (
                  <>
                    <ImageWithFallback
                      src={artist.imageUrl}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Gradient overlay for glassmorphism effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Music2 className="h-20 w-20 text-indigo-300" />
                  </div>
                )}
                
                {/* Headliner Badge */}
                {artist.headliner && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 text-white border-none shadow-lg px-2.5 py-1 text-xs">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Headliner
                    </Badge>
                  </div>
                )}

                {/* Performance Day Badge */}
                {artist.performanceDay && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/95 backdrop-blur-sm text-gray-900 border-none shadow-md px-2.5 py-1 text-xs">
                      Day {artist.performanceDay}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Artist Info */}
              <div className="p-5">
                <h3 className="text-gray-900 mb-2 text-base font-medium group-hover:text-[#0096ff] transition-colors">
                  {artist.name}
                </h3>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border border-[#0096ff]/30 text-[#0096ff] bg-transparent hover:bg-[#0096ff]/10 px-2.5 py-0.5 text-xs">
                    {artist.genre}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
