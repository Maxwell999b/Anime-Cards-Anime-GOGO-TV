import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import AnimeCards from "./components/AnimeCards";
import AnimeDetailsPage from "./components/AnimeDetailsPage";
import MangaCards from "./components/MangaCards"; // Import MangaCards component
import MangaDetailsPage from "./components/MangaDetailsPage"; // Import MangaDetailsPage component
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
    <Router>
      <div className="App">
        <Navbar
          lightMode={lightMode}
          toggleLightMode={toggleLightMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Routes>
          <Route path="/" element={<AnimeCards searchTerm={searchTerm} />} />
          <Route path="/anime/:id" element={<AnimeDetailsPage />} />
          <Route path="/manga" element={<MangaCards searchTerm={searchTerm} />} /> {/* Add MangaCards route */}
          <Route path="/manga/:id" element={<MangaDetailsPage />} /> {/* Add MangaDetailsPage route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
