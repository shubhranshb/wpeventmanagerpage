import { useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { CalendarDays, Music2, Sparkles } from 'lucide-react';

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#e6f4ff] via-[#f0f8ff] to-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Choose Your Event Type
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Select the type of event experience you're looking for
          </p>
        </div>
      </div>

      {/* Event Type Selection */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Multi-Day Festival */}
          <Card 
            className="p-8 cursor-pointer hover:shadow-xl transition-all border-2 border-gray-200 hover:border-[#8b5cf6] group"
            onClick={() => navigate('/festival')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Music2 className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Multi-Day Festival
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Experience multiple days of performances, diverse lineups, and extended festivities. Perfect for music festivals and multi-day celebrations.
              </p>
              <div className="flex items-center gap-2 text-[#8b5cf6] mb-4">
                <CalendarDays className="h-5 w-5" />
                <span className="font-medium">3+ Days</span>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] hover:from-[#7c3aed] hover:to-[#8b5cf6] text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/festival');
                }}
              >
                Explore Festival
              </Button>
            </div>
          </Card>

          {/* Single-Day Show */}
          <Card 
            className="p-8 cursor-pointer hover:shadow-xl transition-all border-2 border-gray-200 hover:border-[#8b5cf6] group"
            onClick={() => navigate('/show')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Single-Day Show
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Enjoy a focused, single-day event with curated performances. Ideal for concerts, shows, and special one-day experiences.
              </p>
              <div className="flex items-center gap-2 text-[#8b5cf6] mb-4">
                <CalendarDays className="h-5 w-5" />
                <span className="font-medium">1 Day</span>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] hover:from-[#7c3aed] hover:to-[#8b5cf6] text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/show');
                }}
              >
                Explore Show
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
