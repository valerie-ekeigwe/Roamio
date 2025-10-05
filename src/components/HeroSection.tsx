import { Globe2, Satellite, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted?: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/10 border-b border-border/50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-accent/30 to-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Icon and badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
              <Satellite className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Powered by NASA GIBS</span>
            </div>
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Explore Earth
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent via-primary to-foreground bg-clip-text text-transparent">
                Through NASA's Eyes
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Turn satellite data into actionable insights for outdoor exploration.
              Plan your adventures with real-time weather analysis and historical Earth observation.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Globe2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Start Exploring
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                <Satellite className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Satellite</h3>
              <p className="text-sm text-muted-foreground">
                Access live NASA imagery with historical data going back years
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Smart Analysis</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered trip scoring based on weather and cloud conditions
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card/50 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4 mx-auto">
                <Globe2 className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold mb-2">Global Coverage</h3>
              <p className="text-sm text-muted-foreground">
                Explore any location on Earth with detailed weather insights
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
