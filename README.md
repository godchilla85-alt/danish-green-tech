## 🇩🇰 Danish Green Energy Dashboard
A high-end, real-time analytics platform monitoring live carbon intensity, renewable infrastructure capacity, grid demand, and energy market trends across Denmark.

## 📊 Overview & Purpose
The Danish Green Energy Dashboard is an enterprise-grade tracking tool designed to bridge the gap between complex raw energy data and intuitive UI visualization. By connecting directly to the Energi Data Service (EDS) API, the platform provides individuals, businesses, and developers with actionable insights into the current state and near-future trends of the Danish power grid.

## Key Metrics Monitored:
- Live Carbon Footprint: Real-time $CO_2$ emissions (g/kWh) split by price regions DK1 (Jutland & Funen) and DK2 (Zealand & Copenhagen).
- Grid Demand: Instantaneous total electricity consumption across the entire network ($MWh/h$).
- Renewable Asset Infrastructure: Total installed green power capacity ($MW$) broken down into Onshore Wind, Offshore Wind, and Solar installations.
- Market Price Correlations: Hourly spot-market energy trading values paired with multi-hour green generation forecasts.

## 🛠️ Tech Stack
The architecture relies on modern, type-safe web technologies configured for optimal user experience and fast server-side processing:

- Framework: Next.js (App Router, React 19)
- Language: TypeScript
- Styles & Layout: Tailwind CSS (featuring Glassmorphism overlays and technical dark-mode sidebars)
- State Management & Caching: TanStack Query (@tanstack/react-query) for stale-time optimizations and robust UI loader patterns
- Data Visualization: Recharts (Area, Line, and Bar charts featuring responsive layout constraints and custom hover tooltips)

## 📈 Development Process
I developed this dashboard iteratively, prioritizing modular component design and architectural stability:

- UI Redesign & Vibe-Shift: We transitioned from a standard minimalist theme to a deep, technical glass-dashboard layout to maximize readability and bring a high-end feel.
- API Layer Isolation: Built internal Next.js API endpoints (/api/...) to proxy dänische Energi Data Service queries, circumventing potential CORS issues and implementing structured data mappings.
- Data Synchronization: Integrated TanStack Query to manage fetch lifecycles efficiently, cutting down redundant server requests with customized caching strategies (staleTime).
- Error Isolation & Fallbacks: Designed robust front-end array formatters to catch and absorb inconsistencies in API property casing or timeline gaps, rendering dependable fallback test-structures if structural boundaries shift.

## 🗺️ Upcoming Features
- Interactive Danish Heatmap: A GeoJSON-powered map displaying real-time power consumption and grid load across individual municipalities (Kommuner).
- Smart Automation API: Webhook endpoints letting smart-home owners trigger high-load appliances (e.g., EV Chargers, Heat Pumps) automatically when spot prices drop below a custom threshold or when green power peaks.
- Historical Breakdown Archives: Calendar queries to let users look back through weeks or years of historical emission data.

## 💡 Potential Areas for Improvement
- Dynamic Data Fallbacks: Replacing static percentage allocations on the deep-dive subpages with dynamic data aggregations extracted entirely from the live data streams.
- Unit Tests: Setting up rigorous unit testing using Vitest to secure component UI switches (e.g., testing color indicators when $CO_2$ values switch between "Clean", "Moderate", and "Dirty").
- Edge Handlers: Moving proxy routes onto Next.js Edge Runtime handlers to minimize response latencies for international users.

## 🚀 Getting Started
Follow these steps to spin up the project environment on your local system:

Prerequisites
Make sure you have Node.js (v18.x or later) and npm installed.

Installation Steps
Clone the repository:

```bash
git clone https://github.com/your-username/danish-green-tech.git
cd danish-green-tech
Install project dependencies:
```

```bash
npm install
Run the local development server:
```

```bash
npm run dev
```

View the dashboard:
Open your browser and navigate to http://localhost:3000. The hot-reloading server will render adjustments instantly.
