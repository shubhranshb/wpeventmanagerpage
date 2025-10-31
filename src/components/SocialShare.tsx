import { Button } from './ui/button';
import { Facebook, Instagram, Twitter, Share2 } from 'lucide-react';

export function SocialShare() {
  const shareUrl = window.location.href;
  const shareText = "Check out this amazing event!";

  const handleShare = (platform: string) => {
    let url = '';
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing via URL, so we'll copy to clipboard
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard! Share it on Instagram.');
        return;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white">
      <div className="flex items-center gap-3 text-gray-700">
        <Share2 className="h-5 w-5 text-indigo-500" />
        <span className="text-lg">Share this event</span>
      </div>
      
      <div className="flex gap-4">
        <div className="group relative">
          <Button
            variant="outline"
            size="icon"
            className="rounded-2xl h-14 w-14 border-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all hover:scale-110 hover:shadow-xl"
            onClick={() => handleShare('facebook')}
          >
            <Facebook className="h-6 w-6" />
          </Button>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-600 whitespace-nowrap">
            Facebook
          </div>
        </div>
        
        <div className="group relative">
          <Button
            variant="outline"
            size="icon"
            className="rounded-2xl h-14 w-14 border-2 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:text-white hover:border-pink-600 transition-all hover:scale-110 hover:shadow-xl"
            onClick={() => handleShare('instagram')}
          >
            <Instagram className="h-6 w-6" />
          </Button>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-600 whitespace-nowrap">
            Instagram
          </div>
        </div>
        
        <div className="group relative">
          <Button
            variant="outline"
            size="icon"
            className="rounded-2xl h-14 w-14 border-2 hover:bg-black hover:text-white hover:border-black transition-all hover:scale-110 hover:shadow-xl"
            onClick={() => handleShare('twitter')}
          >
            <Twitter className="h-6 w-6" />
          </Button>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-600 whitespace-nowrap">
            X
          </div>
        </div>
      </div>
    </div>
  );
}
