import { useQuery } from '@tanstack/react-query';

interface WeatherData {
  cloudCover: number;
  precipitation: number;
  score: number;
}

const fetchWeatherData = async (
  lat: number,
  lng: number,
  date: Date
): Promise<WeatherData> => {
  const dateStr = date.toISOString().split('T')[0];
  
  // Open-Meteo API - free and no API key required
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=cloudcover,precipitation_probability&start_date=${dateStr}&end_date=${dateStr}&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();
  
  // Calculate average cloud cover and precipitation for the day
  const cloudCover = Math.round(
    data.hourly.cloudcover.reduce((a: number, b: number) => a + b, 0) /
      data.hourly.cloudcover.length
  );
  
  const precipitation = Math.round(
    data.hourly.precipitation_probability.reduce((a: number, b: number) => a + b, 0) /
      data.hourly.precipitation_probability.length
  );

  // Calculate trip score (0-100)
  // Lower cloud cover and precipitation = higher score
  const cloudScore = 100 - cloudCover;
  const precipScore = 100 - precipitation;
  const score = Math.round((cloudScore * 0.6 + precipScore * 0.4));

  return {
    cloudCover,
    precipitation,
    score,
  };
};

export const useWeatherData = (lat: number | null, lng: number | null, date: Date) => {
  return useQuery({
    queryKey: ['weather', lat, lng, date.toISOString().split('T')[0]],
    queryFn: () => fetchWeatherData(lat!, lng!, date),
    enabled: lat !== null && lng !== null,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
