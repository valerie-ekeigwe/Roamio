import { useState } from 'react';
import { Satellite, Globe2, Info } from 'lucide-react';
import EarthMap from '@/components/EarthMap';
import TripScore from '@/components/TripScore';
import DateSelector from '@/components/DateSelector';
import { useWeatherData } from '@/hooks/useWeatherData';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const { data: weatherData, isLoading } = useWeatherData(
    location?.lat ?? null,
    location?.lng ?? null,
    selectedDate
  );

  const handleLocationSelect = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

  return (
    <div className="min-h-screen bg-gradient-cosmic animate-gradient">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg shadow-lg hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_hsl(var(--primary)/0.6)]">
                <Globe2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Roamio
                </h1>
                <p className="text-sm text-muted-foreground">
                  Earth exploration powered by NASA
                </p>
              </div>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="hover:border-primary/50 hover:bg-primary/10 transition-all duration-300">
                  <Info className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-popover/95 backdrop-blur-md border-border shadow-xl glow-card">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Satellite className="w-4 h-4 text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
                    How it works
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Roamio combines NASA GIBS satellite imagery with Open-Meteo weather data
                    to calculate the best times and locations for outdoor exploration.
                  </p>
                  <div className="pt-2 space-y-1 text-xs text-muted-foreground">
                    <p>• Click anywhere on Earth to analyze</p>
                    <p>• Change dates to explore temporal patterns</p>
                    <p>• Trip Score: 70+ Excellent, 40-69 Moderate, &lt;40 Poor</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 h-[70vh] lg:h-[calc(100vh-180px)]">
            <EarthMap
              onLocationSelect={handleLocationSelect}
              selectedDate={selectedDate}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Satellite className="w-5 h-5 text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
                Date Selection
              </h2>
              <DateSelector date={selectedDate} onDateChange={setSelectedDate} />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Trip Analysis</h2>
              <TripScore
                score={weatherData?.score ?? null}
                cloudCover={weatherData?.cloudCover ?? null}
                precipitation={weatherData?.precipitation ?? null}
                loading={isLoading}
              />
            </div>

            {location && (
              <div className="p-4 rounded-lg bg-card/80 backdrop-blur-md border border-border hover:border-primary/50 transition-all duration-300 glow-card">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  Selected Location
                </h3>
                <p className="text-xs text-muted-foreground">
                  Lat: {location.lat.toFixed(4)}°
                </p>
                <p className="text-xs text-muted-foreground">
                  Lng: {location.lng.toFixed(4)}°
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
