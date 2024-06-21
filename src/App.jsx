import { useState, useEffect } from "react";
import "./index.css";
import Cards from "./components/Cards";
import SunIcon from "./assets/brand-sun.svg";
import MoonIcon from "./assets/brand-moon.svg";
import Footer from "./components/Footer";
// import AnimeCards from "./components/AnimeCards";

export default function App() {
  const [lightMode, setLightMode] = useState(false);

  const toggleLightMode = () => {
    setLightMode(!lightMode);
  };

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    const bodyElement = document.body;

    if (lightMode) {
      htmlElement.classList.add("light-mode");
      bodyElement.classList.add("light-mode");
    } else {
      htmlElement.classList.remove("light-mode");
      bodyElement.classList.remove("light-mode");
    }
  }, [lightMode]);

  return (
    <div className="App">
      <nav className="navbar">
        <button className="toggle-mode" onClick={toggleLightMode}>
          {lightMode ? <img src={MoonIcon} alt="Dark Mode" /> : <img src={SunIcon} alt="Light Mode" />}
        </button>
      </nav>
      <Cards />
      <Footer />
    </div>
  );
}
