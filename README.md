# 🌍 Country Explorer

A modern, responsive React application for exploring countries, searching and filtering by various criteria, and saving your favorite countries. Built for the SLIIT SE3040 Assignment 02 using the REST Countries API.

## Features

- Browse and search countries by name, region, or language
- View detailed information about each country (name, capital, region, population, flag, languages, etc.)
- Register and log in to manage a personal list of favorite countries
- Enjoy a responsive, theme-adaptive UI (light/dark mode)
- Experience seamless navigation and dynamic updates without page reloads

## 🚀 Live Demo

**Deployed Application:**  
[https://ashehxn-country-explorer-af.netlify.app/]

## 📦 Technology Stack

- **Frontend:** React (functional components)
- **CSS Framework:** Material-UI (MUI)
- **Routing:** React Router
- **State Management:** React Context API
- **Testing:** Jest & React Testing Library
- **API:** [REST Countries API v3.1](https://restcountries.com/)
- **Session Management:** Custom (localStorage)
- **Version Control:** Git & GitHub

## 🛠️ Setup & Installation

1. **Clone the repository**
```
git clone https://github.com/ashehxn/country-explorer.git
cd country-explorer
```

2. **Install dependencies**
```
npm install
```

3. **Start the development server**
```
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Build for Production

```
npm run build
```

The optimized build will be in the `dist/` directory.

## 🧪 Testing

Run all tests:
```
npm test
```

Watch mode:
```
npm run test:watch
```

- Unit and integration tests are provided for all critical components and flows.
- Tests are located in the `/src` directory under `__tests__` and `integration-tests`.

## 📝 Usage Instructions

1. **Register/Login:**  
   Create a new account or log in to access all features.

2. **Explore Countries:**  
   Use the navigation bar to browse, search, and filter countries by region or language.

3. **View Details:**  
   Click on any country to see detailed information.

4. **Favorites:**  
   Add countries to your favorites and view them in the dedicated section.

5. **Theme Switch:**  
   Toggle between light and dark mode using the theme switcher in the top bar.

## 🌐 REST Countries API Endpoints Used

- `GET /all` - List all countries
- `GET /name/{name}` - Search countries by name
- `GET /region/{region}` - Filter by region
- `GET /alpha/{code}` - Get country details by code

API integration is handled in `src/services/api.js`. All data is fetched and displayed dynamically.

## 🗂️ Project Structure

```
src/
├── components/ # React components
├── context/    # Context providers
├── services/   # API services
├── assets/     # Images and static assets
├── tests/      # Unit and integration tests
├── App.jsx     # Main app component
└── main.jsx    # Entry point
```

## 🧩 Design & Responsiveness

- Modern, clean UI inspired by Sitemark templates
- Fully responsive for mobile, tablet, and desktop
- Light and dark theme support

## 🧑‍💻 Development Notes

- **Version Control:**  
  Regular commits with clear messages are maintained throughout development.
- **Session Management:**  
  User sessions are managed using React Context and localStorage.
- **Testing:**  
  Comprehensive unit and integration tests cover all critical flows.

## 📝 Report

### APIs Used
- [REST Countries API](https://restcountries.com/) for all country data

### Challenges Faced
- **API Data Structure:** Handling missing or inconsistent data from the API.
- **Session Persistence:** Ensuring user sessions persist across reloads.
- **Testing Modern React:** Adapting tests for React 19 and latest MUI.

### Solutions
- Implemented robust error handling and default fallbacks in UI.
- Used localStorage and React Context for reliable session management.
- Upgraded all testing libraries for compatibility.

## 🙏 Acknowledgments

- [REST Countries API](https://restcountries.com/)
- [Material UI](https://mui.com/)
- [React](https://react.dev/)

---

**_Deployed Application:_**  
[https://ashehxn-country-explorer-af.netlify.app/]
