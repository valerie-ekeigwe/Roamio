import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface TripScoreProps {
  score: number | null;
  cloudCover: number | null;
  precipitation: number | null;
  loading: boolean;
}

const TripScore = ({ score, cloudCover, precipitation, loading }: TripScoreProps) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [animateScore, setAnimateScore] = useState(false);

  useEffect(() => {
    if (score !== null) {
      setAnimateScore(true);
      const duration = 800;
      const steps = 30;
      const increment = score / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          setDisplayScore(score);
          clearInterval(timer);
          setTimeout(() => setAnimateScore(false), 300);
        } else {
          setDisplayScore(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [score]);

  const getScoreColor = (s: number) => {
    if (s >= 70) return 'from-success to-success/80';
    if (s >= 40) return 'from-warning to-warning/80';
    return 'from-destructive to-destructive/80';
  };

  const getScoreLabel = (s: number) => {
    if (s >= 70) return 'Excellent';
    if (s >= 40) return 'Moderate';
    return 'Poor';
  };

  if (loading) {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur-md border-border glow-card transition-all duration-300">
        <div className="h-32 flex items-center justify-center">
          <div className="space-y-3 w-full">
            <div className="h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-16 bg-muted rounded-xl animate-pulse"></div>
            <div className="h-3 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (score === null) {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur-md border-border hover:border-primary/50 transition-all duration-300 glow-card">
        <div className="h-32 flex items-center justify-center">
          <p className="text-muted-foreground text-center animate-pulse">
            Click on the map to analyze a location
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card/80 backdrop-blur-md border-border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] glow-card">
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Trip Score</p>
          <div
            className={`inline-block px-8 py-4 rounded-2xl bg-gradient-to-br ${getScoreColor(
              score
            )} shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <div className={`text-5xl font-bold ${animateScore ? 'animate-number-pop' : ''}`}>
              {displayScore}
            </div>
            <div className="text-sm font-medium mt-1 opacity-90">
              {getScoreLabel(score)}
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Cloud className="w-5 h-5 text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
              </div>
              <p className="text-sm font-medium">Cloud Cover</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{ width: `${cloudCover}%` }}
                />
              </div>
              <p className="text-lg font-bold min-w-[3rem] text-right">{cloudCover}%</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Droplets className="w-5 h-5 text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
              </div>
              <p className="text-sm font-medium">Precipitation</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-info to-primary transition-all duration-500"
                  style={{ width: `${precipitation}%` }}
                />
              </div>
              <p className="text-lg font-bold min-w-[3rem] text-right">{precipitation}%</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TripScore;
