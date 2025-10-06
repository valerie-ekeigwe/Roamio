<div align="center">
  <h1>🌍 Roamio</h1>
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

[ **Live Demo**](https://r0amio.netlify.app/) | [📖 **Documentation**](./DEPLOYMENT.md) |

## ✨ Features

###  Multi-Layer Satellite Data Visualization
Powered by NASA's Global Imagery Browse Services (GIBS), Roamio provides access to **7 real-time Earth observation layers**:

- **🌊 Sea Surface Temperature (MODIS Aqua)** - Ocean temperature mapping for marine conditions
- **💨 Aerosol Optical Depth** - Air quality monitoring and pollution tracking
- **🌡️ Land Surface Temperature** - Ground heat mapping for hiking and camping safety
- **🌱 Vegetation Health (NDVI)** - Plant vitality index for landscape assessment
- **❄️ Snow Cover** - Real-time snow depth and coverage for winter sports
- **🔥 Active Fires** - Wildfire detection and tracking for safety alerts
- **☁️ Cloud Cover** - Atmospheric conditions for photography and outdoor planning

**Interactive Controls:**
- Layer opacity sliders for custom visualization blending
- Color-coded legends with measurement scales
- Historical data access (2012-present for most layers)
- 1km spatial resolution imagery

### Orbital Pass Predictor
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

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library

### APIs & Data
- **NASA GIBS** - Global Imagery Browse Services for satellite imagery
- **Open-Meteo** - Weather forecasting and historical data
- **Nominatim** - Reverse geocoding for location names

### Libraries
- **Leaflet** - Interactive mapping
- **TanStack Query** - Data fetching and caching
- **React Router** - Client-side routing
- **date-fns** - Date manipulation
- **Lucide React** - Beautiful icons

##  Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/roamio.git
   cd roamio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:8080
   ```

### Build for Production

```bash
npm run build
# or
bun run build
```

The built files will be in the `dist` directory.

##  How It Works

### Step-by-Step Workflow
1. ** Select a Date** - Choose any date from 2012 to present for historical analysis, or use today's date for current conditions
2. ** Click the Map** - Click anywhere on Earth to analyze that location's environmental conditions
3. ** View Satellite Layers** - Toggle between 7 NASA GIBS layers to see different environmental factors
4. ** Check Satellite Passes** - View upcoming ISS and satellite flyover times for your selected location
5. ** Analyze Weather** - Review real-time weather data and trip suitability scores
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

## 📁 Project Structure

```
roamio/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── EarthMap.tsx    # Interactive map component
│   │   ├── TripScore.tsx   # Score display component
│   │   └── DateSelector.tsx # Date picker component
│   ├── hooks/              # Custom React hooks
│   │   ├── useWeatherData.ts
│   │   └── use-toast.ts
│   ├── lib/                # Utilities
│   │   ├── geocoding.ts    # Location name fetching
│   │   └── utils.ts        # Helper functions
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Main application page
│   │   └── NotFound.tsx    # 404 page
│   ├── App.tsx             # App root
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles & design system
├── public/                 # Static assets
└── vite.config.ts         # Vite configuration
```

## Contributing

Contributions are welcome! Feel free to:
-  Report bugs
-  Suggest new features
-  Submit pull requests
-  Improve documentation

Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- **NASA GIBS** - For providing free access to satellite imagery
- **Open-Meteo** - For weather forecasting API
- **OpenStreetMap Contributors** - For mapping data
- **shadcn** - For the beautiful UI component library

##  Roadmap

### Phase 1 - Completed
- [x] Multi-layer satellite data visualization dashboard
- [x] ISS and satellite pass predictor
- [x] Interactive layer controls with opacity

###  Phase 2 - In Progress
- [ ] 3D terrain & elevation visualization
- [ ] Advanced weather timeline (24-hour animation)
- [ ] Environmental impact dashboard
- [ ] 7-day weather forecast charts

###  Phase 3 - Planned
- [ ] Interactive data story mode (curated Earth changes)
- [ ] Location comparison view (split-screen)
- [ ] AI-powered insights panel
- [ ] Location search with autocomplete
- [ ] Favorite locations bookmarking
- [ ] Export trip reports as PDF
- [ ] PWA support for offline usage
- [ ] Social sharing features


