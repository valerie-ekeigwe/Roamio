import { Cloud, Droplets, Satellite } from 'lucide-react';
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
      <div className="glass-card p-6 rounded-2xl border border-border/30">
        <div className="h-32 flex items-center justify-center">
          <div className="space-y-3 w-full">
            <div className="h-4 bg-muted/30 rounded animate-pulse" />
            <div className="h-16 bg-muted/30 rounded-xl animate-pulse" />
            <div className="h-3 bg-muted/30 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (score === null) {
    return (
      <div className="glass-card p-8 rounded-2xl border border-border/30 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-muted/20 to-muted/5 flex items-center justify-center mx-auto">
            <Satellite className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <p className="text-sm text-muted-foreground font-light">
            Select coordinates on the map
            <br />
            <span className="text-xs">to initiate analysis</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Score Display */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl" />
        <div className="relative glass-card rounded-2xl p-8 border border-border/30 text-center">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-3">
            Mission Score
          </p>
          <div className="relative inline-block">
            <div
              className={`inline-flex items-center justify-center w-32 h-32 rounded-2xl bg-gradient-to-br ${getScoreColor(
                score
              )} shadow-[var(--shadow-glow-cyan)]`}
            >
              <div className={`text-6xl font-bold ${animateScore ? 'animate-number-pop' : ''}`}>
                {displayScore}
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {getScoreLabel(score)}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        <div className="glass-card rounded-xl p-4 border border-border/30 group hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                <Cloud className="w-3.5 h-3.5 text-primary" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider">Cloud Cover</p>
            </div>
            <p className="text-xl font-bold font-mono">{cloudCover}%</p>
          </div>
          <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out"
              style={{ width: `${cloudCover}%` }}
            />
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-border/30 group hover:border-primary/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-info/10 flex items-center justify-center">
                <Droplets className="w-3.5 h-3.5 text-info" />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider">Precipitation</p>
            </div>
            <p className="text-xl font-bold font-mono">{precipitation}%</p>
          </div>
          <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-info to-primary transition-all duration-700 ease-out"
              style={{ width: `${precipitation}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripScore;
