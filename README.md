<div align="center">
  <h1> Roamio</h1>
  <p><strong>Turn satellite data into actionable insights for outdoor exploration</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-6.0-646cff?style=for-the-badge&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
  </p>
</div>

---

##  About

Roamio transforms NASA's satellite imagery and real-time weather data into an intuitive tool for outdoor enthusiasts, travelers, and explorers. By combining Earth observation data with meteorological analysis, it helps you find the perfect time and place for your next adventure.

** Built for the [NASA Space Apps Challenge](https://www.spaceappschallenge.org/)** - leveraging real-time Earth observation data for actionable outdoor insights.

[ **Live Demo**](https://r0amio.netlify.app) | [📖 **Documentation**](./DEPLOYMENT.md) | [🤝 **Contributing**](./CONTRIBUTING.md)

##  Features

###  Multi-Layer Satellite Data Visualization
Powered by NASA's Global Imagery Browse Services (GIBS), Roamio provides access to **7 real-time Earth observation layers**:

- **Sea Surface Temperature (MODIS Aqua)** - Ocean temperature mapping for marine conditions
- **Aerosol Optical Depth** - Air quality monitoring and pollution tracking
- **Land Surface Temperature** - Ground heat mapping for hiking and camping safety
- **Vegetation Health (NDVI)** - Plant vitality index for landscape assessment
- **Snow Cover** - Real-time snow depth and coverage for winter sports
- **Active Fires** - Wildfire detection and tracking for safety alerts
- **Cloud Cover** - Atmospheric conditions for photography and outdoor planning

**Interactive Controls:**
- Layer opacity sliders for custom visualization blending
- Color-coded legends with measurement scales
- Historical data access (2012-present for most layers)
- 1km spatial resolution imagery

###  Orbital Pass Predictor
Never miss a satellite flyover with precise prediction algorithms:

- **International Space Station (ISS)** - Exact flyover times, elevation angles, and visibility ratings
- **Starlink Constellation** - Track SpaceX satellite trains for spectacular sightings
- **Other LEO Satellites** - Hubble, Chinese Space Station, and more
- **Astrophotography Planning** - Optimal viewing windows with brightness predictions
- **Custom Date Selection** - Plan future observations up to 30 days ahead

###  Weather Intelligence
- Real-time weather analysis powered by Open-Meteo API
- Trip suitability scoring based on conditions
- Historical weather data access

### Interactive Mapping
- Click anywhere on Earth to analyze
- Powered by Leaflet with custom markers
- Reverse geocoding for location names
- Beautiful UI with dark mode and smooth animations


### APIs & Data
- **NASA GIBS** - Global Imagery Browse Services for satellite imagery
- **Open-Meteo** - Weather forecasting and historical data
- **Nominatim** - Reverse geocoding for location names

##  How It Works

### Step-by-Step Workflow
1. **Select a Date** - Choose any date from 2012 to present for historical analysis, or use today's date for current conditions
2. **Click the Map** - Click anywhere on Earth to analyze that location's environmental conditions
3. **View Satellite Layers** - Toggle between 7 NASA GIBS layers to see different environmental factors
4. **Check Satellite Passes** - View upcoming ISS and satellite flyover times for your selected location
5. **Analyze Weather** - Review real-time weather data and trip suitability scores
6. **Plan Better** - Make data-driven decisions about your outdoor adventures

### Trip Score Algorithm
The trip suitability score combines multiple environmental factors:

**Score Breakdown:**
- **70-100** 🟢 **Excellent** - Ideal conditions for all outdoor activities
  - Clear skies (< 20% cloud cover)
  - Moderate temperatures (15-25°C)
  - Low precipitation probability
  - Good air quality

- **40-69** 🟡 **Moderate** - Acceptable with some limitations
  - Partial cloud cover (20-60%)
  - Temperature variations
  - Light precipitation possible
  - Moderate wind conditions

- **0-39** 🔴 **Poor** - Challenging conditions, reconsider timing
  - Heavy cloud cover (> 60%)
  - Extreme temperatures
  - High precipitation probability
  - Poor visibility or air quality

### Data Sources & Attribution
- **NASA GIBS** - Satellite imagery updated daily (1km resolution)
- **Open-Meteo API** - Weather forecasts with hourly granularity
- **Nominatim (OpenStreetMap)** - Reverse geocoding for location names
- **Orbital Data** - TLE (Two-Line Element) datasets for satellite tracking

## Acknowledgments

- **NASA GIBS** - For providing free access to satellite imagery
- **Open-Meteo** - For weather forecasting API
- **OpenStreetMap Contributors** - For mapping data
- **shadcn** - For the beautiful UI component library

