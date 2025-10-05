import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface EarthMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedDate: Date;
}

const EarthMap = ({ onLocationSelect, selectedDate }: EarthMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const marker = useRef<L.Marker | null>(null);

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

    // Add NASA GIBS layer - MODIS Terra True Color
    const gibsUrl = `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${dateStr}/250m/{z}/{y}/{x}.jpg`;
    
    L.tileLayer(gibsUrl, {
      attribution: 'NASA EOSDIS GIBS',
      bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
      minZoom: 1,
      maxZoom: 8,
      tileSize: 256,
      crossOrigin: true,
      className: 'leaflet-tile',
    }).addTo(map.current);

    // Handle map clicks
    map.current.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      
      // Remove existing marker
      if (marker.current) {
        marker.current.remove();
      }

      // Add new marker with custom animated icon
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative animate-scale-bounce">
            <div class="w-6 h-6 bg-primary rounded-full border-2 border-background shadow-lg"></div>
            <div class="absolute inset-0 w-6 h-6 bg-primary rounded-full animate-ping opacity-75"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      marker.current = L.marker([lat, lng], { icon: customIcon }).addTo(map.current!);
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
    if (!map.current) return;

    const dateStr = selectedDate.toISOString().split('T')[0];
    const gibsUrl = `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${dateStr}/250m/{z}/{y}/{x}.jpg`;

    // Remove all layers and add updated one
    map.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        layer.remove();
      }
    });

    L.tileLayer(gibsUrl, {
      attribution: 'NASA EOSDIS GIBS',
      bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
      minZoom: 1,
      maxZoom: 8,
      tileSize: 256,
      crossOrigin: true,
      className: 'leaflet-tile',
    }).addTo(map.current);
  }, [selectedDate]);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-border shadow-lg glow-card transition-all duration-300">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default EarthMap;
