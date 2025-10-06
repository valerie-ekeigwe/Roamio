<div align="center">
  <h1> Roamio</h1> 
  <p>
    <img src="https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-6.0-646cff?style=for-the-badge&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
  </p>
</div>

---

# Roamio

A web app that helps you figure out if it's a good time to go outside, using NASA satellite data and weather info.

[Live site](https://r0amio.netlify.app)

## What is this?

I built this for the NASA Space Apps Challenge hackathon. The idea was pretty simple - I wanted to combine satellite imagery with weather data to help people plan outdoor trips better. Instead of just checking "is it raining?", you can see actual satellite views of an area, check air quality, see if there are fires nearby, etc.

Basically: click anywhere on a map, pick a date, and see what Earth looks like from space at that spot + whether it's a good idea to go there.

## The main features

**Satellite layers from NASA**
- I integrated 7 different data layers from NASA's GIBS service
- You can see things like sea surface temperature, vegetation health, snow cover, active fires
- The opacity sliders let you blend layers together (this took way longer to get right than I expected)
- Works with historical data going back to 2012

**When can I see the ISS?**
- Shows you when the International Space Station flies over your location
- Also tracks Starlink satellites (they look really cool in the night sky)
- I spent like 3 hours debugging the orbital calculations because I kept getting the timezone wrong

**Trip planning scores**
- Takes weather data and gives you a score from 0-100 on how good conditions are
- Honestly the algorithm could be better, but it works for basic stuff like "is it too cloudy for hiking"
- Combines temperature, precipitation, cloud cover, wind speed

**Interactive map stuff**
- Click anywhere to analyze that location
- Gets the actual place name using reverse geocoding
- I added dark mode because why not

## Tech stack

I went with:
- React + TypeScript (I'm trying to get better at TypeScript)
- Vite for the build (it's fast)
- Tailwind CSS (I know, I know, everyone uses it now)
- shadcn/ui components (saved me time during the hackathon)
- Leaflet for the map
- TanStack Query for managing all the API calls

APIs I'm using:
- NASA GIBS for satellite imagery
- Open-Meteo for weather data (it's free!)
- Nominatim for getting location names

## Running it locally

You need Node.js 18+ installed.


```bash
# clone it
git clone https://github.com/valerie-ekeigwe/Roamio.git
cd roamio

# install stuff
npm install

# run it
npm run dev #
```

**How to use it**
- Pick a date (or use today)
- Click somewhere on the map
- Toggle the satellite layers to see different data
- Check the weather and trip score
- See when satellites pass overhead

The trip score uses this logic:
70-100 = Good conditions, go for it
40-69 = Eh, maybe check again tomorrow
0-39 = Probably stay inside

**Known issues**
- Sometimes the satellite imagery takes a while to load (NASA's servers, not mine)
- The mobile experience could be better
- I should probably add loading states in more places
- The date picker could be more intuitive

**Contributing**
If you want to add something or fix bugs, feel free to fork it and make a PR. I'm learning as I go so any feedback is welcome.

**Credits**
- NASA for the free satellite data
- Open-Meteo for weather API
- OpenStreetMap for the geocoding
- The NASA Space Apps Challenge for giving me a deadline to actually finish this

**License**
MIT - do whatever you want with it
