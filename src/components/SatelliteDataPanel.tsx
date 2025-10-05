import { useState } from 'react';
import { Layers, Cloud, Droplets, Thermometer, Sprout, Snowflake, Flame, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface SatelliteLayer {
  id: string;
  name: string;
  icon: React.ReactNode;
  product: string;
  description: string;
  legend: { color: string; label: string; value?: string }[];
}

const SATELLITE_LAYERS: SatelliteLayer[] = [
  {
    id: 'modis-sst',
    name: 'Sea Surface Temp',
    icon: <Thermometer className="w-4 h-4" />,
    product: 'MODIS_Terra_L3_SST_Thermal_8Day',
    description: 'Ocean temperature from NASA MODIS',
    legend: [
      { color: '#000080', label: 'Cold', value: '-2°C' },
      { color: '#0080FF', label: 'Cool', value: '10°C' },
      { color: '#00FF00', label: 'Moderate', value: '20°C' },
      { color: '#FFFF00', label: 'Warm', value: '25°C' },
      { color: '#FF0000', label: 'Hot', value: '32°C' },
    ],
  },
  {
    id: 'modis-aod',
    name: 'Air Quality (AOD)',
    icon: <Wind className="w-4 h-4" />,
    product: 'MODIS_Combined_Value_Added_AOD',
    description: 'Aerosol Optical Depth - pollution & air quality',
    legend: [
      { color: '#00FF00', label: 'Clean', value: '0-0.1' },
      { color: '#FFFF00', label: 'Moderate', value: '0.1-0.3' },
      { color: '#FF8000', label: 'Unhealthy', value: '0.3-0.5' },
      { color: '#FF0000', label: 'Hazardous', value: '0.5+' },
    ],
  },
  {
    id: 'modis-lst',
    name: 'Land Surface Temp',
    icon: <Thermometer className="w-4 h-4" />,
    product: 'MODIS_Terra_Land_Surface_Temp_Day',
    description: 'Ground temperature from satellite',
    legend: [
      { color: '#0000FF', label: 'Freezing', value: '-25°C' },
      { color: '#00FFFF', label: 'Cold', value: '0°C' },
      { color: '#00FF00', label: 'Mild', value: '15°C' },
      { color: '#FFFF00', label: 'Warm', value: '30°C' },
      { color: '#FF0000', label: 'Hot', value: '45°C' },
    ],
  },
  {
    id: 'modis-ndvi',
    name: 'Vegetation Health',
    icon: <Sprout className="w-4 h-4" />,
    product: 'MODIS_Terra_NDVI_8Day',
    description: 'Plant health & greenness index',
    legend: [
      { color: '#8B4513', label: 'Barren', value: '-0.1' },
      { color: '#FFD700', label: 'Sparse', value: '0.2' },
      { color: '#90EE90', label: 'Moderate', value: '0.5' },
      { color: '#008000', label: 'Dense', value: '0.8+' },
    ],
  },
  {
    id: 'modis-snow',
    name: 'Snow Cover',
    icon: <Snowflake className="w-4 h-4" />,
    product: 'MODIS_Terra_Snow_Cover',
    description: 'Snow and ice coverage',
    legend: [
      { color: '#FFFFFF', label: 'Snow/Ice', value: '100%' },
      { color: '#ADD8E6', label: 'Partial', value: '50%' },
      { color: '#87CEEB', label: 'Minimal', value: '10%' },
      { color: 'transparent', label: 'None', value: '0%' },
    ],
  },
  {
    id: 'viirs-fires',
    name: 'Active Fires',
    icon: <Flame className="w-4 h-4" />,
    product: 'VIIRS_NOAA20_Thermal_Anomalies_375m_All',
    description: 'Real-time fire detection',
    legend: [
      { color: '#FF0000', label: 'Active Fire', value: 'High' },
      { color: '#FF8000', label: 'Hot Spot', value: 'Medium' },
      { color: '#FFFF00', label: 'Warm', value: 'Low' },
    ],
  },
  {
    id: 'modis-clouds',
    name: 'Cloud Cover',
    icon: <Cloud className="w-4 h-4" />,
    product: 'MODIS_Terra_CorrectedReflectance_TrueColor',
    description: 'True color satellite imagery',
    legend: [
      { color: '#FFFFFF', label: 'Dense Clouds' },
      { color: '#E0E0E0', label: 'Light Clouds' },
      { color: '#0066CC', label: 'Water' },
      { color: '#228B22', label: 'Land' },
    ],
  },
];

interface SatelliteDataPanelProps {
  onLayerChange?: (layerId: string, product: string) => void;
  selectedDate: Date;
}

const SatelliteDataPanel = ({ onLayerChange, selectedDate }: SatelliteDataPanelProps) => {
  const [selectedLayer, setSelectedLayer] = useState<string>('modis-lst');
  const [opacity, setOpacity] = useState([70]);

  const handleLayerSelect = (layerId: string) => {
    setSelectedLayer(layerId);
    const layer = SATELLITE_LAYERS.find(l => l.id === layerId);
    if (layer && onLayerChange) {
      onLayerChange(layerId, layer.product);
    }
  };

  const currentLayer = SATELLITE_LAYERS.find(l => l.id === selectedLayer);

  return (
    <div className="glass-card rounded-2xl p-6 border border-border/30">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <Layers className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-sm font-semibold uppercase tracking-wider">
          Satellite Layers
        </h2>
      </div>

      {/* Layer Grid */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {SATELLITE_LAYERS.map((layer) => (
          <button
            key={layer.id}
            onClick={() => handleLayerSelect(layer.id)}
            className={cn(
              "relative p-3 rounded-xl transition-all duration-300 text-left group",
              selectedLayer === layer.id
                ? "bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/50 shadow-[var(--shadow-glow-cyan)]"
                : "glass-card hover:border-primary/30"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className={cn(
                "transition-colors",
                selectedLayer === layer.id ? "text-primary" : "text-muted-foreground"
              )}>
                {layer.icon}
              </div>
              <span className={cn(
                "text-xs font-semibold transition-colors",
                selectedLayer === layer.id ? "text-primary" : "text-foreground"
              )}>
                {layer.name}
              </span>
            </div>
            {selectedLayer === layer.id && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Selected Layer Info */}
      {currentLayer && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div className="flex items-start gap-3 mb-3">
              <div className="text-primary mt-0.5">
                {currentLayer.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {currentLayer.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {currentLayer.description}
                </p>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                Legend
              </div>
              <div className="space-y-1.5">
                {currentLayer.legend.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className="w-6 h-3 rounded border border-border/30"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-foreground flex-1">
                      {item.label}
                    </span>
                    {item.value && (
                      <span className="text-xs font-mono text-muted-foreground">
                        {item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Opacity Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Layer Opacity
              </span>
              <span className="text-xs font-mono text-primary">
                {opacity[0]}%
              </span>
            </div>
            <Slider
              value={opacity}
              onValueChange={setOpacity}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          {/* Data Source Info */}
          <div className="pt-3 border-t border-border/30">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
              <span className="uppercase tracking-wider font-mono">
                NASA GIBS • {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SatelliteDataPanel;
