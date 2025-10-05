import { Maximize2, Minimize2, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MapControlsProps {
  onFullscreenToggle?: () => void;
  isFullscreen?: boolean;
  onLayerChange?: (layer: string) => void;
  currentLayer?: string;
}

const MapControls = ({ 
  onFullscreenToggle, 
  isFullscreen = false,
  onLayerChange,
  currentLayer = 'MODIS_Terra_CorrectedReflectance_TrueColor'
}: MapControlsProps) => {
  const layers = [
    { id: 'MODIS_Terra_CorrectedReflectance_TrueColor', name: 'True Color (MODIS)' },
    { id: 'VIIRS_NOAA20_CorrectedReflectance_TrueColor', name: 'True Color (VIIRS)' },
    { id: 'BlueMarble_NextGeneration', name: 'Blue Marble' },
  ];

  return (
    <div className="absolute top-4 right-4 z-[1000] flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            size="icon" 
            variant="secondary"
            className="shadow-lg hover:shadow-xl transition-all duration-300 bg-card/95 backdrop-blur-md border border-border hover:border-primary/50"
          >
            <Layers className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-popover/95 backdrop-blur-md border-border">
          {layers.map((layer) => (
            <DropdownMenuItem
              key={layer.id}
              onClick={() => onLayerChange?.(layer.id)}
              className={currentLayer === layer.id ? 'bg-primary/20' : ''}
            >
              {layer.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button 
        size="icon" 
        variant="secondary"
        onClick={onFullscreenToggle}
        className="shadow-lg hover:shadow-xl transition-all duration-300 bg-card/95 backdrop-blur-md border border-border hover:border-primary/50"
      >
        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
      </Button>
    </div>
  );
};

export default MapControls;
