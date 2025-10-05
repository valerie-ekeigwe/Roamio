import { Globe2, Satellite, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted?: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Mission badge */}
          <div className="flex justify-center mb-8 animate-float">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
                NASA GIBS Integration
              </span>
              <div className="w-1 h-1 bg-accent rounded-full" />
              <span className="text-xs font-mono text-accent">v2.0</span>
            </div>
          </div>

          {/* Main heading */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight">
              <span className="block bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent font-semibold">
                Explore Earth
              </span>
              <span className="block mt-2 text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-muted-foreground via-accent to-muted-foreground bg-clip-text text-transparent font-light">
                from orbit
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Intelligence-driven exploration powered by real-time NASA satellite data, multi-layer Earth observation, and orbital tracking for your next adventure.
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg"
              onClick={onGetStarted}
              className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-medium shadow-[0_0_40px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_60px_-5px_hsl(var(--primary)/0.7)] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Satellite className="w-5 h-5" />
                Begin Mission
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="glass-card border-border/50 hover:border-primary/50 px-8 py-6 text-base font-medium"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-2xl text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4">
                <Globe2 className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Global
              </div>
              <p className="text-sm text-muted-foreground font-light">
                Satellite Coverage
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mx-auto mb-4">
                <Satellite className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Real-time
              </div>
              <p className="text-sm text-muted-foreground font-light">
                Weather Data
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                AI-Powered
              </div>
              <p className="text-sm text-muted-foreground font-light">
                Trip Analysis
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-20 animate-bounce">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-xs uppercase tracking-wider font-medium">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
