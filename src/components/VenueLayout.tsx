import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function VenueLayout() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Venue Layout</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <div className="max-w-md mx-auto">
            {/* Stage */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center py-4 rounded-t-lg mb-6">
              STAGE
            </div>
            
            {/* VIP Section */}
            <div className="mb-4">
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 text-center">
                <div className="text-sm text-yellow-800 mb-2">VIP Section</div>
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* General Admission */}
            <div className="mb-4">
              <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-4 text-center">
                <div className="text-sm text-blue-800 mb-2">General Admission</div>
                <div className="grid grid-cols-10 gap-1">
                  {Array.from({ length: 80 }).map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Standing Area */}
            <div className="bg-green-100 border-2 border-green-400 rounded-lg p-6 text-center">
              <div className="text-sm text-green-800">Standing Area</div>
              <div className="text-xs text-green-600 mt-1">Open Space</div>
            </div>
            
            {/* Entrances */}
            <div className="flex justify-between mt-6">
              <div className="text-xs text-gray-600 bg-gray-200 px-3 py-1 rounded">← Entrance A</div>
              <div className="text-xs text-gray-600 bg-gray-200 px-3 py-1 rounded">Entrance B →</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
