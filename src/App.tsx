import { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CountdownTimer } from './components/CountdownTimer';
import { FloatingTicketButton } from './components/FloatingTicketButton';
import { VenueInfo } from './components/VenueInfo';
import { OrganizerInfo } from './components/OrganizerInfo';
import { SocialShare } from './components/SocialShare';
import { EventSchedule } from './components/EventSchedule';
import { ArtistsLineup, Artist } from './components/ArtistsLineup';
import { EventMedia, EventMediaAttachment } from './components/EventMedia';
import { TicketPurchaseDialog, DayTickets } from './components/TicketPurchaseDialog';
import { HeroCarousel } from './components/HeroCarousel';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar';
import { Button } from './components/ui/button';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';
import { MapPin, CalendarDays, Clock, Users, Share2, Ticket } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function App() {
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'buy' | 'remind'>('buy');
  const [salesStarted, setSalesStarted] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const stickyCardRef = useRef<HTMLDivElement>(null);

  // Track visibility of sticky card button
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show floating button when sticky card is NOT visible
        setShowFloatingButton(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (stickyCardRef.current) {
      observer.observe(stickyCardRef.current);
    }

    return () => {
      if (stickyCardRef.current) {
        observer.unobserve(stickyCardRef.current);
      }
    };
  }, []);
  
  // Event data
  const event = {
    name: "Summer Music Festival 2026",
    type: "Music Festival",
    category: "Entertainment",
    location: "Central Park Amphitheater, New York",
    eventDates: [
      { date: "February 15, 2026", startTime: "6:00 PM", endTime: "11:00 PM" },
      { date: "February 16, 2026", startTime: "6:00 PM", endTime: "11:00 PM" },
      { date: "February 17, 2026", startTime: "4:00 PM", endTime: "10:00 PM" }
    ],
    description: `Join us for the most anticipated music festival of the year! Experience three unforgettable days of live performances from world-renowned artists across multiple stages. 

Featuring diverse genres from rock to electronic, indie to hip-hop, this festival promises something for everyone. Enjoy gourmet food trucks, interactive art installations, and create memories that will last a lifetime.

The festival grounds open 2 hours before the first performance each day, giving you plenty of time to explore, grab refreshments, and find the perfect spot. VIP packages include exclusive lounge access, premium viewing areas, and complimentary drinks.

Don't miss out on this extraordinary celebration of music, art, and community!`,
    eventDate: new Date('2026-02-15T18:00:00'),
    ticketPrice: 149,
    ticketSaleDate: salesStarted ? new Date('2025-10-01T10:00:00') : new Date('2025-12-01T10:00:00'),
    imageUrls: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200",
      "https://images.unsplash.com/photo-1672841821756-fc04525771c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwY29uY2VydCUyMGNyb3dkfGVufDF8fHx8MTc2MTQyMTAwNHww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  };

  const organizer = {
    name: "LiveNation Events",
    totalEvents: 156,
    yearsOnPlatform: 8,
    profileImage: "https://images.unsplash.com/photo-1661593029081-f682eeef4e35?w=200"
  };

  // Venue information
  const venue = {
    venueName: "Central Park Amphitheater",
    address: "1234 Park Avenue",
    city: "New York",
    state: "NY",
    zipCode: "10019",
    country: "USA"
  };

  // Artists lineup
  const artists: Artist[] = [
    {
      name: "The Electric Souls",
      genre: "Electronic",
      headliner: true,
      performanceDay: 1,
      imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400"
    },
    {
      name: "Maya Rivers",
      genre: "Indie Pop",
      headliner: true,
      performanceDay: 2,
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
    },
    {
      name: "Phoenix Rising",
      genre: "Rock",
      headliner: true,
      performanceDay: 3,
      imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400"
    },
    {
      name: "DJ Nexus",
      genre: "House",
      performanceDay: 1,
      imageUrl: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400"
    },
    {
      name: "Luna & The Waves",
      genre: "Alternative",
      performanceDay: 2,
      imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400"
    },
    {
      name: "Urban Beats Collective",
      genre: "Hip Hop",
      performanceDay: 3,
      imageUrl: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400"
    }
  ];

  // Event media attachments
  const mediaAttachments: EventMediaAttachment[] = [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Official Festival Trailer 2025'
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
      title: 'Behind The Scenes - Artist Lineup'
    },
    {
      type: 'facebook',
      url: 'https://facebook.com/events/summer-music-festival-2025'
    },
    {
      type: 'instagram',
      url: 'https://instagram.com/summermusicfest2025'
    }
  ];

  // Ticket data for each day
  const ticketData: DayTickets[] = [
    {
      date: "July 15, 2025",
      dayNumber: 1,
      tiers: [
        {
          name: "Pre-Sale (Early Bird)",
          price: 99,
          totalTickets: 500,
          soldTickets: 500,
          isSoldOut: true,
          description: "Limited pre-sale tickets at the lowest price. Sold out!"
        },
        {
          name: "Early Bird",
          price: 129,
          totalTickets: 800,
          soldTickets: 720,
          isSoldOut: false,
          description: "Save big with early bird pricing. Limited availability!"
        },
        {
          name: "General Admission",
          price: 149,
          totalTickets: 2000,
          soldTickets: 450,
          isSoldOut: false,
          description: "Standard entry to the festival with access to all stages."
        },
        {
          name: "VIP Pass",
          price: 299,
          totalTickets: 300,
          soldTickets: 85,
          isSoldOut: false,
          description: "Exclusive lounge access, premium viewing areas, complimentary drinks, and VIP parking."
        }
      ]
    },
    {
      date: "July 16, 2025",
      dayNumber: 2,
      tiers: [
        {
          name: "Pre-Sale (Early Bird)",
          price: 99,
          totalTickets: 500,
          soldTickets: 500,
          isSoldOut: true,
          description: "Limited pre-sale tickets at the lowest price. Sold out!"
        },
        {
          name: "Early Bird",
          price: 129,
          totalTickets: 800,
          soldTickets: 650,
          isSoldOut: false,
          description: "Save big with early bird pricing. Limited availability!"
        },
        {
          name: "General Admission",
          price: 149,
          totalTickets: 2000,
          soldTickets: 520,
          isSoldOut: false,
          description: "Standard entry to the festival with access to all stages."
        },
        {
          name: "VIP Pass",
          price: 299,
          totalTickets: 300,
          soldTickets: 92,
          isSoldOut: false,
          description: "Exclusive lounge access, premium viewing areas, complimentary drinks, and VIP parking."
        }
      ]
    },
    {
      date: "July 17, 2025",
      dayNumber: 3,
      tiers: [
        {
          name: "Pre-Sale (Early Bird)",
          price: 99,
          totalTickets: 500,
          soldTickets: 500,
          isSoldOut: true,
          description: "Limited pre-sale tickets at the lowest price. Sold out!"
        },
        {
          name: "Early Bird",
          price: 129,
          totalTickets: 800,
          soldTickets: 600,
          isSoldOut: false,
          description: "Save big with early bird pricing. Almost gone!"
        },
        {
          name: "General Admission",
          price: 149,
          totalTickets: 2000,
          soldTickets: 380,
          isSoldOut: false,
          description: "Standard entry to the festival with access to all stages."
        },
        {
          name: "VIP Pass",
          price: 299,
          totalTickets: 300,
          soldTickets: 68,
          isSoldOut: false,
          description: "Exclusive lounge access, premium viewing areas, complimentary drinks, and VIP parking."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <Header />
      
      {/* Dev Toggle for Testing */}
      <div className="bg-yellow-50 border-b border-yellow-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Switch 
              id="sales-toggle" 
              checked={salesStarted}
              onCheckedChange={setSalesStarted}
            />
            <Label htmlFor="sales-toggle" className="cursor-pointer">
              Toggle: {salesStarted ? 'Sales Started (See "Get Tickets")' : 'Sales Not Started (See Countdown)'}
            </Label>
          </div>
        </div>
      </div>
      
      {/* Hero Image Section */}
      <div className="bg-gradient-to-br from-[#e6f4ff] via-[#f0f8ff] to-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <HeroCarousel images={event.imageUrls} />
        </div>
      </div>

      {/* Event Details Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left Side - Event Info */}
            <div className="flex-1 animate-fade-in-up">
              <div className="flex items-start gap-3 mb-5">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#e6f4ff] to-[#d9efff] text-[#005aa3] rounded-full text-sm">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Sales end soon</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mb-3 tracking-wide uppercase">
                {event.eventDates[0].date}
              </div>
              
              <h1 className="text-gray-900 text-4xl mb-6 tracking-tight font-semibold" style={{ letterSpacing: '-0.02em' }}>
                {event.name}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-gray-600 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#0096ff]" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#006fcc]" />
                  <span>{event.eventDates.length} Days Event</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Badge className="bg-[#0096ff] hover:bg-[#007ed6] px-3 py-1 text-sm text-white shadow-sm border-0">{event.type}</Badge>
                <Badge className="border border-[#0096ff] text-[#0096ff] bg-transparent hover:bg-[#0096ff]/10 px-3 py-1 text-sm border-0">{event.category}</Badge>
              </div>
            </div>

            {/* Right Side - Ticket Purchase */}
            <div className="lg:w-80 animate-scale-in" ref={stickyCardRef}>
              <Card className="border border-gray-200 sticky top-4 shadow-md hover:shadow-lg rounded-2xl overflow-hidden bg-white">
                <CardContent className="p-6">
                  {/* Ticket Purchase or Countdown */}
                  {new Date() >= event.ticketSaleDate ? (
                    <div className="mb-5">
                      <div className="text-xs text-gray-600 mb-2 uppercase tracking-wide">Starting from</div>
                      <div className="text-gray-900 text-3xl font-semibold mb-5">${event.ticketPrice}</div>
                      <Button 
                        onClick={() => { setDialogMode('buy'); setIsTicketDialogOpen(true); }}
                        className="w-full bg-gradient-to-r from-[#0096ff] to-[#33aaff] hover:from-[#33aaff] hover:to-[#66bfff] shadow-lg hover:shadow-xl transition-all h-12 text-white"
                        size="lg"
                      >
                        <Ticket className="h-4 w-4 mr-2" />
                        Get Tickets
                      </Button>
                    </div>
                  ) : (
                    <div className="mb-5">
                      <div className="text-xs text-gray-600 mb-2 uppercase tracking-wide">Ticket sales start in</div>
                      <div className="relative">
                        <div className="text-gray-900 text-3xl font-semibold my-4 animate-pulse-glow inline-block">
                          {(() => {
                            const now = new Date();
                            const diff = event.ticketSaleDate.getTime() - now.getTime();
                            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                            return `${days} days`;
                          })()}
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 leading-relaxed mb-4">
                        Sales begin on {event.ticketSaleDate.toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <Button 
                        onClick={() => { setDialogMode('remind'); setIsTicketDialogOpen(true); }}
                        className="w-full bg-gradient-to-r from-[#33aaff] to-[#66bfff] hover:from-[#4db5ff] hover:to-[#80ccff] shadow-lg hover:shadow-xl transition-all h-12 text-white"
                        size="lg"
                      >
                        <Ticket className="h-4 w-4 mr-2" />
                        Remind Me
                      </Button>
                    </div>
                  )}

                  <Separator className="mb-5" />

                  {/* Share Button */}
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-[#0096ff]/30 transition-all text-gray-700 hover:text-[#0096ff] text-sm">
                    <Share2 className="h-4 w-4" />
                    <span>Share Event</span>
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Countdown Timer */}
        <div className="mb-10 animate-fade-in-up">
          <CountdownTimer targetDate={event.eventDate} />
        </div>

        {/* Subtle separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10"></div>

        {/* Event Schedule */}
        <EventSchedule eventDates={event.eventDates} />

        {/* Subtle separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10"></div>

        {/* Event Details */}
        <Card className="mb-10 border border-gray-200 shadow-md hover:shadow-lg rounded-2xl overflow-hidden bg-white">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-10 bg-[#0096ff] rounded-full"></div>
              <h2 className="text-gray-900 text-xl font-semibold">About This Event</h2>
            </div>
            <div className="text-gray-700 whitespace-pre-line leading-relaxed text-base space-y-3">
              {event.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="leading-loose">
                  {paragraph.split(/(world-renowned artists|memories that last a lifetime)/).map((part, i) => 
                    part === 'world-renowned artists' || part === 'memories that last a lifetime' ? 
                      <strong key={i} className="text-gray-900">{part}</strong> : part
                  )}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Artists Lineup */}
        <ArtistsLineup artists={artists} />

        {/* Subtle separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10"></div>

        {/* Event Media & Links */}
        <EventMedia attachments={mediaAttachments} />

        {/* Subtle separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10"></div>

        {/* Venue */}
        <div className="mb-10">
          <VenueInfo 
            venueName={venue.venueName}
            address={venue.address}
            city={venue.city}
            state={venue.state}
            zipCode={venue.zipCode}
            country={venue.country}
          />
        </div>

        {/* Subtle separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10"></div>

        {/* Organizer Info */}
        <div className="mb-10">
          <OrganizerInfo 
            name={organizer.name}
            totalEvents={organizer.totalEvents}
            yearsOnPlatform={organizer.yearsOnPlatform}
            profileImage={organizer.profileImage}
          />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8"></div>

        {/* Social Share */}
        <div className="pb-4">
          <SocialShare />
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating Ticket Button - Only show when sticky card is not visible */}
      {showFloatingButton && (
        <FloatingTicketButton 
          startingPrice={event.ticketPrice}
          ticketSaleDate={event.ticketSaleDate}
          onBuyClick={() => {
            if (new Date() >= event.ticketSaleDate) {
              setDialogMode('buy');
            } else {
              setDialogMode('remind');
            }
            setIsTicketDialogOpen(true);
          }}
        />
      )}

      {/* Ticket Purchase Dialog */}
      <TicketPurchaseDialog
        open={isTicketDialogOpen}
        onOpenChange={setIsTicketDialogOpen}
        tickets={ticketData}
        mode={dialogMode}
      />
    </div>
  );
}
