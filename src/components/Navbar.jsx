import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar__inner">
        <a href="#" className="navbar__logo">
          <span className="navbar__logo-dot" />
          PACT
        </a>
        <ul className="navbar__links">
          <li>
            <a href="#how-it-works">How It Works</a>
          </li>
          {/* <li><a href="#permissions">Permissions</a></li> */}
          <li>
            <a href="#shield">Shield</a>
          </li>
          {/* <li><a href="#privacy">Privacy</a></li> */}
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
