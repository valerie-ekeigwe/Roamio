import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Loader2 } from 'lucide-react';
import { fetchLocationName } from '@/lib/geocoding';

interface EarthMapProps {
  onLocationSelect: (lat: number, lng: number, name?: string) => void;
  selectedDate: Date;
}

const EarthMap = ({ onLocationSelect, selectedDate }: EarthMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const marker = useRef<L.Marker | null>(null);
  const tileLayer = useRef<L.TileLayer | null>(null);
  const osmLayer = useRef<L.TileLayer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map with smooth animations
    map.current = L.map(mapContainer.current, {
      center: [20, 0],
      zoom: 3,
      minZoom: 2,
      maxZoom: 8,
      worldCopyJump: true,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
      zoomAnimationThreshold: 4,
      inertia: true,
      inertiaDeceleration: 3000,
      easeLinearity: 0.2,
    });

    // Format date for GIBS
    const dateStr = selectedDate.toISOString().split('T')[0];

    // Add OpenStreetMap as fallback base layer
    osmLayer.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
      opacity: 0.3,
    });
    osmLayer.current.addTo(map.current);

    // Add NASA GIBS layer - MODIS Terra True Color
    const gibsUrl = `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${dateStr}/250m/{z}/{y}/{x}.jpg`;
    
    let errorCount = 0;
    tileLayer.current = L.tileLayer(gibsUrl, {
      attribution: 'NASA EOSDIS GIBS',
      bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
      minZoom: 1,
      maxZoom: 8,
      tileSize: 256,
      crossOrigin: true,
      opacity: 1,
      keepBuffer: 2,
    });

    tileLayer.current.on('loading', () => setIsLoading(true));
    tileLayer.current.on('load', () => {
      setIsLoading(false);
      setUseFallback(false);
    });
    tileLayer.current.on('tileerror', () => {
      errorCount++;
      if (errorCount > 5 && osmLayer.current) {
        setUseFallback(true);
        osmLayer.current.setOpacity(1);
      }
    });

    tileLayer.current.addTo(map.current);

    // Handle map clicks
    map.current.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      
      // Remove existing marker
      if (marker.current) {
        marker.current.remove();
      }

      // Add new marker with custom animated red icon
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative animate-scale-bounce">
            <div class="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
            <div class="absolute inset-0 w-6 h-6 bg-red-500 rounded-full animate-ping opacity-75"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      marker.current = L.marker([lat, lng], { icon: customIcon })
        .bindPopup('Loading location...', { closeButton: false })
        .addTo(map.current!);
      
      // Fetch location name
      fetchLocationName(lat, lng).then(locationData => {
        if (marker.current) {
          marker.current.setPopupContent(locationData.displayName);
          marker.current.openPopup();
        }
        onLocationSelect(lat, lng, locationData.displayName);
      });
      
      onLocationSelect(lat, lng);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update GIBS layer when date changes
  useEffect(() => {
    if (!map.current || !tileLayer.current) return;

    setIsLoading(true);
    const dateStr = selectedDate.toISOString().split('T')[0];
    const gibsUrl = `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${dateStr}/250m/{z}/{y}/{x}.jpg`;

    // Remove old tile layer
    if (tileLayer.current) {
      tileLayer.current.remove();
    }

    // Create and add new tile layer
    let errorCount = 0;
    tileLayer.current = L.tileLayer(gibsUrl, {
      attribution: 'NASA EOSDIS GIBS',
      bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
      minZoom: 1,
      maxZoom: 8,
      tileSize: 256,
      crossOrigin: true,
      opacity: 1,
      keepBuffer: 2,
    });

    tileLayer.current.on('loading', () => setIsLoading(true));
    tileLayer.current.on('load', () => {
      setIsLoading(false);
      setUseFallback(false);
      if (osmLayer.current) osmLayer.current.setOpacity(0.3);
    });
    tileLayer.current.on('tileerror', () => {
      errorCount++;
      if (errorCount > 5 && osmLayer.current) {
        setUseFallback(true);
        osmLayer.current.setOpacity(1);
      }
    });

    tileLayer.current.addTo(map.current);
  }, [selectedDate]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-border shadow-lg glow-card transition-all duration-300">
      <div ref={mapContainer} className="absolute inset-0 bg-card/50" />
      {useFallback && (
        <div className="absolute top-4 left-4 z-[999] px-3 py-1.5 rounded-md bg-yellow-500/90 text-yellow-950 text-xs font-medium shadow-lg">
          Using map fallback
        </div>
      )}
      {isLoading && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-card/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading satellite imagery...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarthMap;
