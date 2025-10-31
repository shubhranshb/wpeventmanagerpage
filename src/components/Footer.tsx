import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-gray-600">
            2023 © WP Event Manager, All Rights Reserved.
          </div>

          {/* Powered By */}
          <div className="text-sm text-gray-600">
            Powered by{' '}
            <a 
              href="#" 
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Event Listing WordPress Theme
            </a>
            {' '}|{' '}
            <a 
              href="#" 
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              WP Event Manager
            </a>
            .
          </div>

          {/* Scroll to Top Button */}
          <Button
            onClick={scrollToTop}
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-700 hover:bg-gray-800 text-white"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
