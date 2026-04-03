# PackRight ✈️🌍

PackRight is a next-generation travel itinerary and packing application. Stop relying on generic travel checklists! PackRight uses real-time weather forecasting, live destination cost algorithms, and integrated cultural insights to generate a highly customized travel survival guide tailored to your specific trip.

### ✨ Features
* **Smart Packing Engine:** Automatically generates categorized packing lists (Adventure, Beach, Cold, Rain) based strictly on live weather data fetching for your destination.
* **Cinematic Itinerary Generator:** Creates dynamic, day-by-day routing complete with estimated daily budgets and local "Instagram Spot" highlights.
* **Aesthetic Visuals:** Integration with Unsplash (and dynamic fallbacks) to populate your trip planner with stunning, composition-focused landscape photography of your chosen city. 
* **Universal Live Currency Converter:** Converts any major global fiat currency on the fly using real-time data from the ExchangeRate API.
* **Local Culture Insights:** Dive into the destination before you arrive with curated guides on must-try local street food, interesting historical facts, and critical etiquette tips.
* **Print-Optimized:** Hides the heavy UI elements and dynamically stacks the itinerary and packing list for a pristine, ink-saving printable format.

### 🛠️ Tech Stack
* **React + Vite:** Lightning-fast frontend tooling and component rendering.
* **Vanilla CSS:** Custom semantic design system with glassmorphism, responsive grid layouts, and smooth micro-animations. No heavy CSS frameworks.
* **External APIs:** Unsplash API (Image Generation), Open-Meteo (Live Weather), ExchangeRate-API (Live Currency).

### 🚀 Running Locally
1. Clone the repository
2. Run `npm install`
3. Add an Unsplash API key to your `.env` file under `VITE_UNSPLASH_KEY` (or use the fallback data).
4. Run `npm run dev` to start the development server.

--- 
*Built with modern UI/UX design principles to deliver a premium, product-ready travel planning experience.*
