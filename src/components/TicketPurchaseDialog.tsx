import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { CalendarDays, Users, Ticket, Clock, TrendingUp } from 'lucide-react';

export interface TicketTier {
  name: string;
  price: number;
  totalTickets: number;
  soldTickets: number;
  isSoldOut: boolean;
  description: string;
  requiresSeating?: boolean; // Add this to enable seat selection for specific tiers
}

export interface DayTickets {
  date: string;
  dayNumber: number;
  tiers: TicketTier[];
}

interface TicketPurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tickets: DayTickets[];
  mode?: 'buy' | 'remind';
}

export function TicketPurchaseDialog({ open, onOpenChange, tickets, mode = 'buy' }: TicketPurchaseDialogProps) {
  const getAvailabilityColor = (percentage: number) => {
    if (percentage >= 75) return 'text-red-600';
    if (percentage >= 50) return 'text-orange-600';
    if (percentage >= 25) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-red-500';
    if (percentage >= 50) return 'bg-orange-500';
    if (percentage >= 25) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-4xl max-h-[90vh] overflow-y-auto">
        {mode === 'remind' ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-gray-900">
                <Clock className="h-6 w-6 text-[#0096ff]" />
                Get Notified When Sales Start
              </DialogTitle>
              <DialogDescription>
                Leave your email and we’ll notify you the moment tickets go on sale.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 grid gap-4 p-1">
              <div>
                <label className="block text-xs text-[#6B778C] font-normal mb-2">Email address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0096ff] focus:border-[#0096ff]"
                />
              </div>
              <div className="flex items-center justify-end gap-3">
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button className="bg-gradient-to-r from-[#0096ff] to-[#33aaff] hover:from-[#33aaff] hover:to-[#66bfff] text-white">Notify Me</Button>
              </div>
            </div>
          </>
        ) : (
          <>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <Ticket className="h-6 w-6 text-[#0096ff]" />
            Select Your Tickets
          </DialogTitle>
          <DialogDescription>
            Choose your preferred ticket type and day for the event.
          </DialogDescription>
        </DialogHeader>

        <Accordion type="single" collapsible className="mt-4">
          {tickets.map((day, dayIndex) => {
            // Calculate summary info for each day
            const availableTickets = day.tiers.filter(t => !t.isSoldOut).length;
            const lowestPrice = Math.min(...day.tiers.filter(t => !t.isSoldOut).map(t => t.price));
            
            return (
              <AccordionItem key={dayIndex} value={`day-${dayIndex}`} className="border rounded-lg mb-3 px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#0096ff] text-white px-4 py-2 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          <span className="text-sm">Day {day.dayNumber}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-900">{day.date}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {availableTickets} ticket types available · From ${lowestPrice}
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent>
                  <div className="grid gap-4 pt-4 pb-2">
                    {day.tiers.map((tier, tierIndex) => {
                      const soldPercentage = Math.round((tier.soldTickets / tier.totalTickets) * 100);
                      const remainingTickets = tier.totalTickets - tier.soldTickets;
                      const showProgress = soldPercentage >= 25 || tier.isSoldOut;

                      return (
                        <Card 
                          key={tierIndex} 
                          className={`p-5 transition-all ${
                            tier.isSoldOut 
                              ? 'bg-gray-50 border-gray-300 opacity-75' 
                              : 'hover:shadow-lg hover:border-[#0096ff]/30'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-gray-900">{tier.name}</h3>
                                {tier.isSoldOut && (
                                  <Badge variant="destructive" className="bg-red-500">
                                    Sold Out
                                  </Badge>
                                )}
                                {!tier.isSoldOut && soldPercentage >= 75 && (
                                  <Badge className="bg-orange-500 hover:bg-orange-600">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    Selling Fast
                                  </Badge>
                                )}
                                {tier.name.toLowerCase().includes('early bird') && !tier.isSoldOut && (
                                  <Badge className="bg-green-500 hover:bg-green-600">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Limited Time
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-sm text-gray-600 mb-3">{tier.description}</p>

                              {showProgress && (
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                      <Users className="h-4 w-4 text-gray-400" />
                                      <span className="text-gray-600">
                                        {tier.isSoldOut ? (
                                          'All tickets sold'
                                        ) : (
                                          <>
                                            <span className={getAvailabilityColor(soldPercentage)}>
                                              {remainingTickets} tickets left
                                            </span>
                                            {' '}of {tier.totalTickets}
                                          </>
                                        )}
                                      </span>
                                    </div>
                                    <span className={`${getAvailabilityColor(soldPercentage)}`}>
                                      {soldPercentage}% sold
                                    </span>
                                  </div>
                                  <div className="relative">
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                      <div 
                                        className={`h-full transition-all ${getProgressColor(soldPercentage)}`}
                                        style={{ width: `${soldPercentage}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col items-end gap-3">
                              <div className="text-right">
                                <div className="text-gray-900 text-2xl">${tier.price}</div>
                                <div className="text-xs text-gray-500">per ticket</div>
                              </div>
                              
                              {tier.isSoldOut ? (
                                <Button 
                                  disabled 
                                  variant="outline" 
                                  className="min-w-[120px]"
                                >
                                  Sold Out
                                </Button>
                              ) : (
                                <Button 
                                  className="bg-gradient-to-r from-[#0096ff] to-[#33aaff] hover:from-[#33aaff] hover:to-[#66bfff] min-w-[120px] text-white"
                                >
                                  Select
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <div className="mt-6 p-4 bg-[#e6f4ff] rounded-lg border border-[#bfe3ff]">
          <p className="text-sm text-[#005aa3]">
            <strong>Note:</strong> Ticket prices may increase as we get closer to the event date. 
            Secure your spot now at the best price!
          </p>
        </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
