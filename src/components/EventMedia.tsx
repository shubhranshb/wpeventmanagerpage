import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronDown, Youtube, Facebook, Instagram, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { AspectRatio } from './ui/aspect-ratio';

export interface EventMediaAttachment {
  type: 'youtube' | 'facebook' | 'instagram';
  url: string;
  title?: string;
}

interface EventMediaProps {
  attachments: EventMediaAttachment[];
}

export function EventMedia({ attachments }: EventMediaProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string): string => {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const youtubeVideos = attachments.filter(att => att.type === 'youtube');
  const socialLinks = attachments.filter(att => att.type === 'facebook' || att.type === 'instagram');

  if (attachments.length === 0) return null;

  return (
    <Card className="mb-10 border border-gray-200 shadow-md hover:shadow-lg rounded-2xl overflow-hidden bg-white">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="cursor-pointer pb-5 pt-6 px-8 hover:bg-gray-50/50 transition-colors" onClick={() => setIsOpen(!isOpen)}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between w-full">
              <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                <Youtube className="h-6 w-6 text-[#0096ff]" />
                Event Media & Links
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
          <CardContent className="px-8 pb-8 space-y-5">
            {/* YouTube Videos */}
            {youtubeVideos.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-gray-900 text-base font-medium">Video Trailer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {youtubeVideos.map((video, index) => (
                    <div key={index} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all">
                      {video.title && (
                        <div className="p-2.5 bg-red-50/50 border-b border-gray-200">
                          <div className="flex items-center gap-2 text-gray-900">
                            <Youtube className="h-3.5 w-3.5 text-red-600" />
                            <span className="text-xs truncate">{video.title}</span>
                          </div>
                        </div>
                      )}
                      <AspectRatio ratio={16 / 9}>
                        <iframe
                          src={getYouTubeEmbedUrl(video.url)}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </AspectRatio>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Media Links */}
            {socialLinks.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-gray-900 text-base font-medium">Social Media & Event Pages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-200 hover:border-[#0096ff]/30 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        {link.type === 'facebook' && (
                          <>
                            <div className="bg-blue-500 p-1.5 rounded-lg">
                              <Facebook className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <div className="text-gray-900 text-sm font-medium group-hover:text-indigo-600 transition-colors">
                                Facebook Event
                              </div>
                              <div className="text-[10px] text-gray-600">View on Facebook</div>
                            </div>
                          </>
                        )}
                        {link.type === 'instagram' && (
                          <>
                            <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-1.5 rounded-lg">
                              <Instagram className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <div className="text-gray-900 text-sm font-medium group-hover:text-indigo-600 transition-colors">
                                Instagram Page
                              </div>
                              <div className="text-[10px] text-gray-600">Follow on Instagram</div>
                            </div>
                          </>
                        )}
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#0096ff] transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
