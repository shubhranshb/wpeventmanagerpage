import { useState, useRef, useEffect } from 'react';
import { Header } from '../components/Header';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Footer } from '../components/Footer';
import { CountdownTimer } from '../components/CountdownTimer';
import { FloatingTicketButton } from '../components/FloatingTicketButton';
import { VenueInfo } from '../components/VenueInfo';
import { OrganizerInfo } from '../components/OrganizerInfo';
import { SocialShare } from '../components/SocialShare';
import { ArtistsLineup, Artist } from '../components/ArtistsLineup';
import { EventMedia, EventMediaAttachment } from '../components/EventMedia';
import { HeroCarousel } from '../components/HeroCarousel';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { MapPin, CalendarDays, Clock, Users, Share2, Ticket } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';
import { DayTickets } from '../components/TicketPurchaseDialog';

export function SingleDayEventPage() {
  const navigate = useNavigate();
  const [salesStarted, setSalesStarted] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const stickyCardRef = useRef<HTMLDivElement>(null);

  // Track visibility of sticky card button
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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

  // Single day event data
  const eventDates = [{ date: "February 15, 2026", startTime: "6:00 PM", endTime: "11:00 PM" }];

  const event = {
    name: "Summer Music Concert 2026",
    type: "Music Festival",
    category: "Entertainment",
    location: "Central Park Amphitheater, New York",
    eventDates: eventDates,
    description: `Join us for the most anticipated music concert of the year! Experience an unforgettable evening of live performances from world-renowned artists on our main stage.

Featuring diverse genres from rock to electronic, indie to hip-hop, this concert promises something for everyone. Enjoy gourmet food trucks, interactive art installations, and create memories that will last a lifetime.

The venue opens 2 hours before the performance, giving you plenty of time to explore, grab refreshments, and find the perfect spot. VIP packages include exclusive lounge access, premium viewing areas, and complimentary drinks.

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

  const venue = {
    venueName: "Central Park Amphitheater",
    address: "1234 Park Avenue",
    city: "New York",
    state: "NY",
    zipCode: "10019",
    country: "USA"
  };

  // Artists lineup - all on same day
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
      performanceDay: 1,
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
    },
    {
      name: "Phoenix Rising",
      genre: "Rock",
      headliner: true,
      performanceDay: 1,
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
      genre: "Jazz",
      performanceDay: 1,
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
    },
    {
      name: "The Midnight Groovers",
      genre: "Funk",
      performanceDay: 1,
      imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400"
    }
  ];

  const mediaAttachments: EventMediaAttachment[] = [
    {
      type: 'youtube',
      title: 'Event Trailer',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800'
    },
    {
      type: 'facebook',
      title: 'Facebook Event Page',
      url: 'https://facebook.com/events/summermusicfest2025'
    },
    {
      type: 'instagram',
      title: 'Instagram Page',
      url: 'https://instagram.com/summermusicfest2025'
    }
  ];

  // Ticket data for single day
  const ticketData: DayTickets[] = [
    {
      date: "February 15, 2026",
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
          description: "Standard entry to the event with access to all areas."
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
    }
  ];

  const handleBuyTickets = () => {
    navigate('/tickets/booking', {
      state: {
        selectedDay: ticketData[0],
        selectedTier: ticketData[0].tiers[2], // Default to General Admission
        ticketCount: 1,
        hasSeating: false // Can be set to true for seated events
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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

      {/* Event Header Section */}
      <div className="bg-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Event Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                {!salesStarted && (
                  <Badge className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs border-0">
                    Sales end soon
                  </Badge>
                )}
              </div>

              <h1 className="text-gray-900 text-4xl mb-6 tracking-tight font-semibold" style={{ letterSpacing: '-0.02em' }}>
                {event.name}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-gray-700 mb-6 text-base">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#8b5cf6]/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-[#8b5cf6]" />
                  </div>
                  <span className="font-medium">{event.location}</span>
                </div>
                <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#8b5cf6]/10 rounded-lg">
                    <CalendarDays className="h-6 w-6 text-[#8b5cf6]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{event.eventDates[0].date}</span>
                    <span className="text-sm text-gray-500">{event.eventDates[0].startTime} - {event.eventDates[0].endTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mb-8">
                <Badge className="bg-[#8b5cf6] hover:bg-[#7c3aed] px-3 py-1 text-sm text-white shadow-sm border-0">{event.type}</Badge>
                <Badge className="bg-[#f3e8ff] text-[#8b5cf6] hover:bg-[#e9d5ff] px-4 py-1.5 text-sm font-medium border-0">
                  {event.category}
                </Badge>
              </div>
            </div>

            {/* Right Side - Ticket Purchase */}
            <div className="lg:w-80 animate-scale-in" ref={stickyCardRef}>
              <div className="bg-white border border-gray-200 shadow-md hover:shadow-lg rounded-2xl overflow-hidden">
                <div className="p-6">
                  <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Starting from</div>
                  <div className="text-3xl font-semibold text-gray-900 mb-6">${event.ticketPrice}</div>
                  
                  {salesStarted ? (
                    <Button
                      onClick={handleBuyTickets}
                      className="w-full h-12 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-md shadow-[#8b5cf6]/20 mb-3"
                    >
                      <Ticket className="h-4 w-4 mr-2" />
                      Get Tickets
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        // Show reminder confirmation or open reminder dialog
                        alert('Reminder set! We\'ll notify you when tickets go on sale.');
                      }}
                      className="w-full h-12 bg-gray-500 hover:bg-gray-600 text-white shadow-md mb-3"
                      disabled={false}
                    >
                      <Ticket className="h-4 w-4 mr-2" />
                      Remind Me
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="w-full h-12 border-2"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Event
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Countdown Timer */}
        {!salesStarted && <CountdownTimer targetDate={event.ticketSaleDate} />}

        {/* Subtle separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10"></div>

        {/* Overview */}
        <div className="mb-10">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 bg-gradient-to-b from-[#8b5cf6] to-[#a78bfa] rounded-full"></div>
              <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
            </div>
            <div className="mt-3 h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent"></div>
          </div>
          <div className="pt-2">
            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>
        </div>

        {/* Subtle separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10"></div>

        {/* Artists Lineup */}
        <ArtistsLineup artists={artists} isSingleDay={true} />

        {/* Subtle separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10"></div>

        {/* Event Media & Links */}
        <EventMedia attachments={mediaAttachments} />

        {/* Subtle separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10"></div>

        {/* Venue Information */}
        <VenueInfo
          venueName={venue.venueName}
          address={venue.address}
          city={venue.city}
          state={venue.state}
          zipCode={venue.zipCode}
          country={venue.country}
        />

        {/* Subtle separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10"></div>

        {/* About the Organizer */}
        <OrganizerInfo
          name={organizer.name}
          totalEvents={organizer.totalEvents}
          yearsOnPlatform={organizer.yearsOnPlatform}
          profileImage={organizer.profileImage}
        />
      </div>

      {/* Floating Ticket Button */}
      {showFloatingButton && (
        <FloatingTicketButton
          price={event.ticketPrice}
          onClick={handleBuyTickets}
        />
      )}

      <Footer />
    </div>
  );
}

