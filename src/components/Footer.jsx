import Github from "../assets/github-square-brands.svg";
import Icon from "../assets/pnga2.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <Link to="/">
        <img className="icon-sizing2" src={Icon} alt="Icon" />
      </Link>

      <div className="footer--copyright">
        <p>
          &copy;2024 -<span className="footer-md">Anime GOGO TV.</span>{" "}
          <span className="footer-hidden-small">All rights reserved. </span>
        </p>
      </div>
      <a className="footer--links" href="https://github.com/Maxwell999b" target="_blank" rel="noreferrer">
        <img className="footer--links__icon" src={Github} alt="Github" />
      </a>
    </footer>
  );
}
