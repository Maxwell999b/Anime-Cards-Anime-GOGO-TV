import "./index.css";
import AnimeCards from "./components/AnimeCards";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
export default function App() {
  const [lightMode, setLightMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
      <Navbar
        lightMode={lightMode}
        toggleLightMode={toggleLightMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <AnimeCards searchTerm={searchTerm} />
      <Footer />
    </div>
  );
}
