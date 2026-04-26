# WeatherScope 🌤️

A modern, premium weather forecasting application built with React and Vite. WeatherScope provides real-time weather data, dynamic background themes, actionable insights, and robust data export capabilities, all wrapped in a sleek glassmorphism UI.

![WeatherScope Preview](https://via.placeholder.com/800x400.png?text=WeatherScope+Preview)

## ✨ Features

- **Real-Time Weather Data:** Get up-to-the-minute current conditions including temperature, wind speed/direction, pressure, visibility, and precipitation.
- **Intelligent Search:** Quickly find any city, landmark, or zip code with real-time auto-complete suggestions.
- **GPS Integration:** Instantly fetch weather for your current location using browser geolocation capabilities.
- **5-Day Forecast:** Detailed daily breakdown of highs, lows, UV index, and precipitation probabilities.
- **Smart Notes & Insights:** Actionable, context-aware tips based on current weather conditions (e.g., "High UV — apply sunscreen", "Strong winds — secure loose items").
- **Dynamic Theming:** The application background automatically adapts to reflect the current weather conditions and time of day.
- **Interactive Google Maps:** Visually confirms the exact location of your searched city with an embedded, dynamic map.
- **Data Export:** Export your fetched weather data seamlessly to **JSON** or **CSV** formats for offline analysis.
- **Premium Aesthetics:** Fully responsive, modern design using CSS glassmorphism, smooth animations, and professional Lucide React icons.

## 🛠️ Technology Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Vanilla CSS (Responsive, CSS Variables, Glassmorphism)
- **Icons:** Lucide React
- **APIs Used:**
  - [Open-Meteo API](https://open-meteo.com/) (Weather Data & Geocoding)
  - [Nominatim / OpenStreetMap](https://nominatim.org/) (Reverse Geocoding)
  - Google Maps (Location display via iframe)

## 🚀 Getting Started

### Requirements

This project requires the following key libraries and packages (all automatically managed and installed via npm, and also listed in `requirements.txt`):
- **react** & **react-dom**: Core UI framework
- **lucide-react**: Professional iconography
- **vite**: Build tool and development server

All exact versions are defined in the `package.json` file.

### Installation

1. **Clone the repository or Download** from GitHub:
   - To clone via Git, run this command in your terminal:
     ```bash
     git clone https://github.com/KavyaSreeBiji/weather-frontend-app.git
     ```
   - Alternatively, you can click the **Code** button on the GitHub repository page and select **Download ZIP**.
2. **Navigate to the project directory:**
   ```bash
   cd weather-frontend-app
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the URL provided in your terminal (usually `http://localhost:5173/`).

## 📁 Project Structure

```text
src/
├── components/          # Reusable React components (SearchBar, Forecast, Insights, etc.)
├── utils/               # Helper functions and API integrations (weatherApi.js, theme.js)
├── App.jsx              # Main application container and state management
├── App.css              # Global styles and dynamic themes
└── main.jsx             # React entry point
```

## 👨‍💻 Developer Information

**Developed by:** Kavya Sree B

*Developed as part of the **Product Manager Accelerator** — a career development program designed to help individuals land roles in product management through hands-on experience, and community networking.*
