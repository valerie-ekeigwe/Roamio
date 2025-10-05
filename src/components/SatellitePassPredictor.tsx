import { useState, useEffect } from 'react';
import { Satellite, Clock, Eye, MapPin, TrendingUp, Radio } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SatellitePass {
  name: string;
  type: 'ISS' | 'Starlink' | 'Other';
  startTime: Date;
  maxElevation: number;
  duration: number;
  magnitude: number;
  direction: string;
}

interface SatellitePassPredictorProps {
  location: { lat: number; lng: number; name?: string } | null;
  selectedDate: Date;
}

const SatellitePassPredictor = ({ location, selectedDate }: SatellitePassPredictorProps) => {
  const [passes, setPasses] = useState<SatellitePass[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (!location) {
      setPasses([]);
      return;
    }

    setIsCalculating(true);

    // Simulate satellite pass calculations
    // In production, this would use a real satellite tracking API like N2YO or Space-Track
    const simulatePassCalculation = () => {
      const mockPasses: SatellitePass[] = [];
      const baseTime = new Date(selectedDate);
      baseTime.setHours(0, 0, 0, 0);

      // ISS passes (typically 2-4 per day)
      for (let i = 0; i < 3; i++) {
        const startTime = new Date(baseTime);
        startTime.setHours(6 + (i * 8) + Math.random() * 2, Math.floor(Math.random() * 60));
        
        mockPasses.push({
          name: 'International Space Station',
          type: 'ISS',
          startTime,
          maxElevation: 30 + Math.random() * 60,
          duration: 3 + Math.random() * 7,
          magnitude: -3.5 + Math.random() * 1.5,
          direction: ['NW to SE', 'SW to NE', 'W to E'][i],
        });
      }

      // Starlink passes
      for (let i = 0; i < 2; i++) {
        const startTime = new Date(baseTime);
        startTime.setHours(18 + (i * 2), Math.floor(Math.random() * 60));
        
        mockPasses.push({
          name: `Starlink-${Math.floor(Math.random() * 5000)}`,
          type: 'Starlink',
          startTime,
          maxElevation: 20 + Math.random() * 40,
          duration: 2 + Math.random() * 4,
          magnitude: 2.5 + Math.random() * 2,
          direction: ['N to S', 'S to N'][i],
        });
      }

      // Sort by time
      mockPasses.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
      
      setPasses(mockPasses);
      setIsCalculating(false);
    };

    // Simulate API delay
    setTimeout(simulatePassCalculation, 800);
  }, [location, selectedDate]);

  const getVisibilityRating = (magnitude: number, elevation: number): { label: string; color: string } => {
    if (magnitude < -2 && elevation > 50) return { label: 'Excellent', color: 'text-success' };
    if (magnitude < 0 && elevation > 30) return { label: 'Very Good', color: 'text-primary' };
    if (magnitude < 2 && elevation > 20) return { label: 'Good', color: 'text-accent' };
    return { label: 'Fair', color: 'text-muted-foreground' };
  };

  const getSatelliteIcon = (type: SatellitePass['type']) => {
    switch (type) {
      case 'ISS':
        return <Satellite className="w-4 h-4 text-primary" />;
      case 'Starlink':
        return <Radio className="w-4 h-4 text-accent" />;
      default:
        return <Satellite className="w-4 h-4 text-muted-foreground" />;
    }
  };

  if (!location) {
    return (
      <div className="glass-card rounded-2xl p-6 border border-border/30">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Satellite className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-sm font-semibold uppercase tracking-wider">
            Orbital Passes
          </h2>
        </div>
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            Select a location to see satellite passes
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 border border-border/30">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <Satellite className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-sm font-semibold uppercase tracking-wider">
          Orbital Passes
        </h2>
      </div>

      {/* Location Info */}
      <div className="mb-4 p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
        <div className="flex items-center gap-2 text-xs">
          <MapPin className="w-3 h-3 text-primary" />
          <span className="text-foreground font-medium">
            {location.name || 'Selected Location'}
          </span>
        </div>
        <div className="text-[10px] text-muted-foreground font-mono mt-1">
          {location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°
        </div>
      </div>

      {isCalculating ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-muted/20 animate-pulse" />
          ))}
        </div>
      ) : passes.length === 0 ? (
        <div className="text-center py-8">
          <Satellite className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            No visible passes for this date
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {passes.map((pass, idx) => {
            const visibility = getVisibilityRating(pass.magnitude, pass.maxElevation);
            
            return (
              <div
                key={idx}
                className={cn(
                  "p-4 rounded-xl transition-all duration-300 group hover:scale-[1.02]",
                  pass.type === 'ISS'
                    ? "bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30 hover:border-primary/50 hover:shadow-[var(--shadow-glow-cyan)]"
                    : "glass-card hover:border-accent/30"
                )}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getSatelliteIcon(pass.type)}
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {pass.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs font-mono text-muted-foreground">
                          {pass.startTime.toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider",
                    visibility.color,
                    "bg-background/50"
                  )}>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {visibility.label}
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                      Max Elevation
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-primary" />
                      <span className="font-mono font-semibold text-foreground">
                        {Math.round(pass.maxElevation)}°
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                      Duration
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-accent" />
                      <span className="font-mono font-semibold text-foreground">
                        {Math.round(pass.duration)}m
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                      Brightness
                    </div>
                    <div className="font-mono font-semibold text-foreground">
                      {pass.magnitude.toFixed(1)}
                    </div>
                  </div>
                </div>

                {/* Direction */}
                <div className="mt-3 pt-3 border-t border-border/30">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                    Direction
                  </div>
                  <div className="text-xs text-foreground font-medium">
                    {pass.direction}
                  </div>
                </div>

                {/* ISS Special Badge */}
                {pass.type === 'ISS' && (
                  <div className="mt-3 p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex items-center gap-2 text-[10px] text-primary font-semibold uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                      Prime Viewing Opportunity
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-4 pt-4 border-t border-border/30">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <div className="w-1 h-1 bg-accent rounded-full" />
          <span className="uppercase tracking-wider font-mono">
            {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • Best viewing after sunset
          </span>
        </div>
      </div>
    </div>
  );
};

export default SatellitePassPredictor;
