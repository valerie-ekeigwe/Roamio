export interface LocationName {
  name: string;
  city?: string;
  country?: string;
  displayName: string;
}

export async function fetchLocationName(lat: number, lng: number): Promise<LocationName> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`,
      {
        headers: {
          'User-Agent': 'Roamio Earth Explorer',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Geocoding failed');
    }

    const data = await response.json();
    
    const city = data.address?.city || 
                 data.address?.town || 
                 data.address?.village || 
                 data.address?.county ||
                 data.address?.state;
    
    const country = data.address?.country;
    
    let displayName = '';
    if (city && country) {
      displayName = `${city}, ${country}`;
    } else if (city) {
      displayName = city;
    } else if (country) {
      displayName = country;
    } else {
      displayName = data.display_name?.split(',').slice(0, 2).join(',') || 'Unknown Location';
    }

    return {
      name: data.name || '',
      city,
      country,
      displayName,
    };
  } catch (error) {
    console.error('Error fetching location name:', error);
    return {
      name: '',
      displayName: `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`,
    };
  }
}
