import PropTypes from "prop-types";
import PhotoFront from "../assets/Pic-main-back.jpg";
import PhotoBack from "../assets/Pic-main-front.jpg";
import LinkedIn from "../assets/linkedin-brands.svg";
import Whatsapp from "../assets/brand-whatsapp.svg";
import SunIcon from "../assets/brand-sun.svg";
import MoonIcon from "../assets/brand-moon.svg";

function Info({ lightMode, toggleLightMode }) {
  return (
    <main className="info">
      <div className="info--card">
        <div className="info--card__inner">
          <div className="info--card__front">
            <img className="info--photo" src={PhotoFront} alt="Abdulrahman Ahmed" />
          </div>
          <div className="info--card__back">
            <img className="info--photo" src={PhotoBack} alt="Abdulrahman Ahmed" />
          </div>
        </div>
      </div>
      <div className="info--details">
        <span className="info--name">
          <h1 className="info--name">
            Abdulrahman Ahmed
            <button className="toggle-mode" onClick={toggleLightMode}>
              {lightMode ? <img src={MoonIcon} alt="Dark Mode" /> : <img src={SunIcon} alt="Light Mode" />}
            </button>
          </h1>
        </span>
        <h2 className="info--position">Frontend Developer</h2>
        <a
          className="info--website"
          href="https://maxwell999b.github.io/Front-End-Portfolio/"
          target="_blank"
          rel="noreferrer">
          <p className="info--website__text">
            A A Y A M <span className="info--position-2">@Portfolio</span>
          </p>
        </a>
        <div className="info--connect">
          <a className="info--connect__email" href="https://api.whatsapp.com/send?phone=201005059834">
            <img className="info--connect__email__icon" src={Whatsapp} alt="Email" />
            <span>Whatsapp</span>
          </a>
          <a
            className="info--connect__linkedin"
            href="https://www.linkedin.com/in/maxwell999b/"
            target="_blank"
            rel="noreferrer">
            <img className="info--connect__linkedin__icon" src={LinkedIn} alt="Linkedin" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </main>
  );
}

// Prop types validation
Info.propTypes = {
  lightMode: PropTypes.bool.isRequired,
  toggleLightMode: PropTypes.func.isRequired,
};

export default Info;
