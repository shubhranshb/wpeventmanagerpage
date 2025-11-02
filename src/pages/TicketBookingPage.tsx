import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Card } from '../components/ui/card';
import { CalendarDays, Clock, MapPin, Ticket, ArrowLeft, Users, CheckCircle2 } from 'lucide-react';
import { SeatSelection } from '../components/SeatSelection';
import { DayTickets, TicketTier } from '../components/TicketPurchaseDialog';

interface BookingState {
  selectedDay?: DayTickets;
  allDays?: DayTickets[]; // Add all days for multi-day events
  selectedTier?: TicketTier;
  ticketCount?: number;
  hasSeating?: boolean;
}

export function TicketBookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = (location.state as BookingState) || {};
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [ticketQuantity, setTicketQuantity] = useState(bookingData.ticketCount || 1);
  const [selectedDay, setSelectedDay] = useState<DayTickets | undefined>(bookingData.selectedDay);
  const [selectedTier, setSelectedTier] = useState<TicketTier | undefined>(bookingData.selectedTier);
  
  // Get all available days (for multi-day events) or just the selected day
  const allDays = bookingData.allDays || (bookingData.selectedDay ? [bookingData.selectedDay] : []);
  const isMultiDay = allDays.length > 1;
  
  // If no selectedDay passed, create mock data
  const defaultDay: DayTickets = {
    date: "February 15, 2026",
    dayNumber: 1,
    tiers: [
      {
        name: "General Admission",
        price: 149,
        totalTickets: 2000,
        soldTickets: 450,
        isSoldOut: false,
        description: "Standard entry to the event with access to all areas."
      }
    ]
  };

  // Determine if current tier requires seating
  const hasSeating = selectedTier?.requiresSeating || bookingData.hasSeating || false;
  
  // Determine initial step: if multi-day, always start with day selection
  // Otherwise, if tier requires seating, go to seats, else tickets
  const getInitialStep = (): 'day' | 'tickets' | 'seats' | 'review' => {
    if (isMultiDay) {
      return 'day'; // Always show day selection for multi-day events
    }
    if (hasSeating && selectedTier) {
      return 'seats';
    }
    return 'tickets';
  };
  
  const [currentStep, setCurrentStep] = useState<'day' | 'tickets' | 'seats' | 'review'>(getInitialStep());

  // Initialize selectedDay only for single-day events
  useEffect(() => {
    if (!isMultiDay && !selectedDay) {
      if (allDays.length > 0) {
        setSelectedDay(allDays[0]);
      } else {
        setSelectedDay(defaultDay);
      }
    }
  }, [isMultiDay]);

  // When day changes, reset tier selection
  const handleDaySelect = (day: DayTickets) => {
    setSelectedDay(day);
    setSelectedTier(undefined);
    setCurrentStep('tickets');
  };

  // When tier is selected, check if it requires seating
  const handleTierSelect = (tier: TicketTier) => {
    setSelectedTier(tier);
    if (tier.requiresSeating) {
      setCurrentStep('seats');
    }
  };

  // Mock event data
  const event = {
    name: "Summer Music Festival 2026",
    location: "Central Park Amphitheater, New York",
    date: selectedDay?.date || defaultDay.date,
    time: "6:00 PM - 11:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200"
  };

  const handleProceed = () => {
    if (currentStep === 'day') {
      // Can only proceed if a day is selected
      if (selectedDay) {
        setCurrentStep('tickets');
      }
    } else if (currentStep === 'tickets') {
      if (selectedTier?.requiresSeating) {
        setCurrentStep('seats');
      } else {
        setCurrentStep('review');
      }
    } else if (currentStep === 'seats') {
      setCurrentStep('review');
    }
  };

  const totalPrice = selectedTier 
    ? (selectedTier.price * ticketQuantity) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Event
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Info Card */}
            <Card className="p-6 bg-white">
              <div className="flex gap-6">
                <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={event.imageUrl}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-4">{event.name}</h1>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[#0096ff]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#0096ff]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#0096ff]" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Step 0: Day Selection (for multi-day events) */}
            {currentStep === 'day' && isMultiDay && (
              <Card className="p-6 bg-white">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Date</h2>
                <div className="space-y-3">
                  {allDays.map((day, index) => (
                    <div
                      key={index}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedDay?.date === day.date
                          ? 'border-[#0096ff] bg-[#e6f4ff]'
                          : 'border-gray-200 hover:border-[#0096ff]/50'
                      }`}
                      onClick={() => handleDaySelect(day)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">
                            Day {day.dayNumber} - {day.date}
                          </div>
                          <div className="text-sm text-gray-600">
                            {day.tiers.filter(t => !t.isSoldOut).length} ticket types available
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">
                            ${Math.min(...day.tiers.filter(t => !t.isSoldOut).map(t => t.price))}
                          </div>
                          <div className="text-xs text-gray-500">Starting from</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Step 1: Ticket Selection */}
            {currentStep === 'tickets' && selectedDay && (
              <Card className="p-6 bg-white">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Select Tickets {isMultiDay && `- ${selectedDay.date}`}
                </h2>
                <div className="space-y-4">
                  {selectedDay.tiers.map((tier, index) => (
                    <div
                      key={index}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedTier?.name === tier.name
                          ? 'border-[#0096ff] bg-[#e6f4ff]'
                          : 'border-gray-200 hover:border-[#0096ff]/50'
                      }`}
                      onClick={() => handleTierSelect(tier)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{tier.name}</h3>
                            {tier.isSoldOut && (
                              <Badge className="bg-red-500">Sold Out</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{tier.description}</p>
                          {selectedTier?.name === tier.name && (
                            <div className="mt-4">
                              <label className="text-sm text-gray-700 mb-2 block">Quantity</label>
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setTicketQuantity(Math.max(1, ticketQuantity - 1));
                                  }}
                                >
                                  -
                                </Button>
                                <span className="w-12 text-center font-medium">{ticketQuantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setTicketQuantity(ticketQuantity + 1);
                                  }}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold text-gray-900">${tier.price}</div>
                          <div className="text-xs text-gray-500">per ticket</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Step 2: Seat Selection */}
            {currentStep === 'seats' && selectedTier?.requiresSeating && (
              <Card className="p-6 bg-white">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Seats</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Select {ticketQuantity} {ticketQuantity === 1 ? 'seat' : 'seats'} from the available seats below.
                </p>
                <SeatSelection
                  selectedSeats={selectedSeats}
                  onSeatSelect={setSelectedSeats}
                  maxSeats={ticketQuantity}
                />
              </Card>
            )}

            {/* Step 3: Review */}
            {currentStep === 'review' && (
              <Card className="p-6 bg-white">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Booking</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">{selectedTier?.name}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {selectedDay?.date || event.date} · {event.time}
                      </div>
                      {selectedTier?.requiresSeating && selectedSeats.length > 0 && (
                        <div className="text-sm text-gray-600 mt-2">
                          Seats: {selectedSeats.join(', ')}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        ${selectedTier?.price} × {ticketQuantity}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentStep === 'review') {
                    setCurrentStep(selectedTier?.requiresSeating ? 'seats' : 'tickets');
                  } else if (currentStep === 'seats') {
                    setCurrentStep('tickets');
                  } else if (currentStep === 'tickets' && isMultiDay) {
                    setCurrentStep('day');
                  } else {
                    navigate(-1);
                  }
                }}
              >
                Back
              </Button>
              <Button
                onClick={handleProceed}
                disabled={
                  (currentStep === 'day' && !selectedDay) ||
                  (currentStep === 'tickets' && !selectedTier) ||
                  (currentStep === 'seats' && selectedSeats.length !== ticketQuantity)
                }
                className="bg-gradient-to-r from-[#0096ff] to-[#33aaff] hover:from-[#33aaff] hover:to-[#66bfff] text-white"
              >
                {currentStep === 'review' ? 'Proceed to Payment' : 'Continue'}
              </Button>
            </div>
          </div>

          {/* Order Summary - Right Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <Separator className="mb-4" />
              
              <div className="space-y-3 mb-4">
                {selectedTier && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {selectedTier.name} × {ticketQuantity}
                    </span>
                    <span className="font-medium text-gray-900">
                      ${(selectedTier.price * ticketQuantity).toFixed(2)}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm pt-2 border-t">
                  <span className="text-gray-600">Convenience Fee</span>
                  <span className="font-medium text-gray-900">$5.00</span>
                </div>
                
                <div className="flex items-center justify-between text-sm pt-2 border-t">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium text-gray-900">
                    ${((totalPrice + 5) * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>

              <Separator className="my-4" />
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-[#0096ff]">
                  ${((totalPrice + 5) * 1.1).toFixed(2)}
                </span>
              </div>

              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Mobile ticket delivery</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

