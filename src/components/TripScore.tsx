import { Cloud, Droplets } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TripScoreProps {
  score: number | null;
  cloudCover: number | null;
  precipitation: number | null;
  loading: boolean;
}

const TripScore = ({ score, cloudCover, precipitation, loading }: TripScoreProps) => {
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
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border animate-pulse">
        <div className="h-32 flex items-center justify-center">
          <p className="text-muted-foreground">Calculating...</p>
        </div>
      </Card>
    );
  }

  if (score === null) {
    return (
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
        <div className="h-32 flex items-center justify-center">
          <p className="text-muted-foreground text-center">
            Click on the map to analyze a location
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Trip Score</p>
          <div
            className={`inline-block px-8 py-4 rounded-2xl bg-gradient-to-br ${getScoreColor(
              score
            )} shadow-lg`}
          >
            <div className="text-5xl font-bold">{score}</div>
            <div className="text-sm font-medium mt-1 opacity-90">
              {getScoreLabel(score)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Cloud className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Cloud Cover</p>
              <p className="text-lg font-semibold">{cloudCover}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Droplets className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Precipitation</p>
              <p className="text-lg font-semibold">{precipitation}%</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TripScore;
