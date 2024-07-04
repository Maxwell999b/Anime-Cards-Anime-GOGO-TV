import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import AnimeCards from "./components/AnimeCards";
import AnimeDetailsPage from "./components/AnimeDetailsPage";
import MangaCards from "./components/MangaCards";
import MangaDetailsPage from "./components/MangaDetailsPage";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import { useEffect, useState } from "react";

export default function App() {
  // // Function to adjust zoom level based on screen width
  // const adjustZoomLevel = () => {
  //   const screenWidth = window.innerWidth;

  //   if (screenWidth <= 480) {
  //     document.body.style.zoom = "100%"; // Zoom level for mobile devices
  //   } else if (screenWidth <= 768) {
  //     document.body.style.zoom = "88%"; // Zoom level for small tablets
  //   } else if (screenWidth <= 1024) {
  //     document.body.style.zoom = "100%"; // Zoom level for tablets
  //   } else if (screenWidth <= 1200) {
  //     document.body.style.zoom = "100%"; // Zoom level for small desktops
  //   } else if (screenWidth <= 1280) {
  //     document.body.style.zoom = "100%"; // Zoom level for very large desktops
  //   } else {
  //     document.body.style.zoom = "100%"; // Default zoom level for larger screens
  //   }
  // };

  // // Call adjustZoomLevel initially and on window resize
  // useEffect(() => {
  //   adjustZoomLevel();
  //   window.addEventListener("resize", adjustZoomLevel);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("resize", adjustZoomLevel);
  //   };
  // }, []);

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
        <div className="content">
          <Routes>
            <Route path="/" element={<AnimeCards searchTerm={searchTerm} />} />
            <Route path="/anime/:id" element={<AnimeDetailsPage />} />
            <Route path="/manga" element={<MangaCards searchTerm={searchTerm} />} />
            <Route path="/manga/:id" element={<MangaDetailsPage />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}
