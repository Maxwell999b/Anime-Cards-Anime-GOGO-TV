import Github from "../assets/github-square-brands.svg";
import Icon from "../assets/pnga2.png";

export default function Footer() {
  return (
    <footer className="footer">
      <img className="icon-sizing" src={Icon} alt="Icon" />

      <div className="footer--copyright">
        <p>
          &copy;2024 -<span style={{ color: "red" }}>Anime GOGO TV.</span> All rights reserved.
        </p>
      </div>
      <a className="footer--links" href="https://github.com/Maxwell999b" target="_blank" rel="noreferrer">
        <img className="footer--links__icon" src={Github} alt="Github" />
      </a>
    </footer>
  );
}
