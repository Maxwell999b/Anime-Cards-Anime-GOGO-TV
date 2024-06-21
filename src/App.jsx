import { useState, useEffect } from "react";
import "./index.css";
import Info from "../components/Info";
import Bio from "../components/Bio";
import Footer from "../components/Footer";

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
      <Info lightMode={lightMode} toggleLightMode={toggleLightMode} />
      <Bio />
      <Footer />
    </div>
  );
}
