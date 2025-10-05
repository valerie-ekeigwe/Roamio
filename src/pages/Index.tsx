import { useState, useRef } from 'react';
import { Satellite, MapPin, Calendar as CalendarIcon, Layers } from 'lucide-react';
import EarthMap from '@/components/EarthMap';
import TripScore from '@/components/TripScore';
import DateSelector from '@/components/DateSelector';
import HeroSection from '@/components/HeroSection';
import StarField from '@/components/StarField';
import SatelliteDataPanel from '@/components/SatelliteDataPanel';
import SatellitePassPredictor from '@/components/SatellitePassPredictor';
import { useWeatherData } from '@/hooks/useWeatherData';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7); // 7 days ago for GIBS data availability
    return date;
  });
  const [location, setLocation] = useState<{ lat: number; lng: number; name?: string } | null>(null);
  const [showHero, setShowHero] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  const { data: weatherData, isLoading } = useWeatherData(
    location?.lat ?? null,
    location?.lng ?? null,
    selectedDate
  );

  const handleLocationSelect = (lat: number, lng: number, name?: string) => {
    setLocation({ lat, lng, name });
  };

  const handleGetStarted = () => {
    setShowHero(false);
    setTimeout(() => {
      mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="relative min-h-screen">
      {/* Star field background */}
      <StarField />

      {/* Hero Section */}
      {showHero && <HeroSection onGetStarted={handleGetStarted} />}

      {/* Main app interface */}
      <div ref={mapRef} className="relative z-10 min-h-screen bg-background/95">
        {/* Minimal navigation bar */}
        <nav className="sticky top-0 z-50 glass-card border-b border-border/30">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                  <Satellite className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold tracking-tight">Roamio</h1>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                    Mission Control
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card text-xs">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  <span className="font-mono text-muted-foreground">Live Data</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-2xl overflow-hidden border border-border/30 shadow-[var(--shadow-float)]">
                <div className="h-[70vh] lg:h-[calc(100vh-200px)]">
                  <EarthMap
                    onLocationSelect={handleLocationSelect}
                    selectedDate={selectedDate}
                  />
                </div>
              </div>
            </div>

            {/* Control Panel Sidebar */}
            <div className="space-y-6">
              {/* Date Selector */}
              <div className="glass-card rounded-2xl p-6 border border-border/30">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <CalendarIcon className="w-4 h-4 text-accent" />
                  </div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider">
                    Temporal Analysis
                  </h2>
                </div>
                <DateSelector date={selectedDate} onDateChange={setSelectedDate} />
              </div>

              {/* Satellite Data Panel */}
              <SatelliteDataPanel selectedDate={selectedDate} />

              {/* Satellite Pass Predictor */}
              <SatellitePassPredictor location={location} selectedDate={selectedDate} />

              {/* Trip Score */}
              <div className="glass-card rounded-2xl p-6 border border-border/30">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Satellite className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider">
                    Mission Viability
                  </h2>
                </div>
                <TripScore
                  score={weatherData?.score ?? null}
                  cloudCover={weatherData?.cloudCover ?? null}
                  precipitation={weatherData?.precipitation ?? null}
                  loading={isLoading}
                />
              </div>

              {/* Location Info */}
              {location && (
                <div className="glass-card rounded-2xl p-6 border border-border/30 group hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider">
                      Target Coordinates
                    </h3>
                  </div>
                  {location.name && (
                    <p className="text-base font-medium mb-3 text-foreground">{location.name}</p>
                  )}
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">LAT</span>
                      <span className="text-primary font-semibold">{location.lat.toFixed(6)}°</span>
                    </div>
                    <div className="h-px bg-border/50" />
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">LNG</span>
                      <span className="text-primary font-semibold">{location.lng.toFixed(6)}°</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
