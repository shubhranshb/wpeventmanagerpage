import { useState } from 'react';
import { Button } from './ui/button';

interface SeatSelectionProps {
  selectedSeats: string[];
  onSeatSelect: (seats: string[]) => void;
  maxSeats: number;
}

interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'selected' | 'sold' | 'unavailable';
  section: string;
}

export function SeatSelection({ selectedSeats, onSeatSelect, maxSeats }: SeatSelectionProps) {
  // Generate mock seat data - VIP only (no General/Standard section)
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const sections = ['VIP', 'Premium']; // Removed 'Standard' section
    
    let seatId = 1;
    sections.forEach((section, sectionIndex) => {
      rows.forEach((row, rowIndex) => {
        for (let num = 1; num <= (section === 'VIP' ? 12 : 16); num++) {
          // Randomly mark some seats as sold
          const isSold = Math.random() < 0.15;
          
          seats.push({
            id: `seat-${seatId++}`,
            row,
            number: num,
            status: isSold ? 'sold' : 'available',
            section
          });
        }
      });
    });
    
    return seats;
  };

  const [seats] = useState<Seat[]>(generateSeats());

  const handleSeatClick = (seatId: string, status: string) => {
    if (status === 'sold' || status === 'unavailable') return;

    const isSelected = selectedSeats.includes(seatId);
    
    if (isSelected) {
      // Deselect seat
      onSeatSelect(selectedSeats.filter(id => id !== seatId));
    } else {
      // Select seat (if under max limit)
      if (selectedSeats.length < maxSeats) {
        onSeatSelect([...selectedSeats, seatId]);
      }
    }
  };

  // Group seats by section and row
  const groupedSeats = seats.reduce((acc, seat) => {
    const key = `${seat.section}-${seat.row}`;
    if (!acc[key]) {
      acc[key] = {
        section: seat.section,
        row: seat.row,
        seats: []
      };
    }
    acc[key].seats.push(seat);
    return acc;
  }, {} as Record<string, { section: string; row: string; seats: Seat[] }>);

  const getSeatColor = (seat: Seat) => {
    if (selectedSeats.includes(seat.id)) {
      return 'bg-[#0096ff] text-white border-[#0096ff] hover:bg-[#007ed6]';
    }
    switch (seat.status) {
      case 'sold':
        return 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed';
      case 'unavailable':
        return 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed';
      default:
        return 'bg-white text-gray-700 border-gray-300 hover:border-[#0096ff] hover:bg-[#e6f4ff]';
    }
  };

  const sections = Array.from(new Set(seats.map(s => s.section)));

  return (
    <div className="space-y-8">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border-2 border-gray-300 bg-white"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border-2 border-[#0096ff] bg-[#0096ff]"></div>
          <span className="text-sm text-gray-600">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border-2 border-gray-300 bg-gray-300"></div>
          <span className="text-sm text-gray-600">Sold</span>
        </div>
      </div>

      {/* Stage Area */}
      <div className="text-center mb-8">
        <div className="inline-block px-12 py-6 bg-gradient-to-r from-[#0096ff] to-[#33aaff] text-white rounded-lg font-semibold text-lg">
          STAGE
        </div>
      </div>

      {/* Seat Map by Section */}
      {sections.map((section) => {
        const sectionSeats = Object.values(groupedSeats).filter(g => g.section === section);
        const rows = Array.from(new Set(sectionSeats.map(g => g.row)));

        return (
          <div key={section} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{section} Section</h3>
              <div className="text-sm text-gray-600">Row</div>
            </div>

            {rows.map((row) => {
              const rowSeats = sectionSeats.find(g => g.row === row)?.seats || [];
              
              return (
                <div key={`${section}-${row}`} className="flex items-center gap-2">
                  <div className="w-12 text-sm font-medium text-gray-700 text-right">{row}</div>
                  <div className="flex-1 flex gap-1 flex-wrap">
                    {rowSeats.map((seat) => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatClick(seat.id, seat.status)}
                        className={`w-8 h-8 rounded border-2 text-xs font-medium transition-all ${getSeatColor(seat)}`}
                        disabled={seat.status === 'sold' || seat.status === 'unavailable'}
                      >
                        {seat.number}
                      </button>
                    ))}
                  </div>
                  <div className="w-12"></div>
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Selected Seats Info */}
      {selectedSeats.length > 0 && (
        <div className="p-4 bg-[#e6f4ff] rounded-lg border border-[#bfe3ff]">
          <div className="text-sm font-medium text-[#005aa3] mb-2">
            Selected Seats ({selectedSeats.length}/{maxSeats}):
          </div>
          <div className="text-sm text-[#005aa3]">
            {selectedSeats.map(id => {
              const seat = seats.find(s => s.id === id);
              return seat ? `${seat.section} ${seat.row}${seat.number}` : null;
            }).filter(Boolean).join(', ')}
          </div>
        </div>
      )}
    </div>
  );
}

