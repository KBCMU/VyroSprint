"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#top" aria-label="Lumina home">
          <span className="mark" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lumina-logo.png" alt="" />
          </span>
          <span>Lumina</span>
        </a>
        <div className="nav__meta">
          <span className="date">May 14, 2026</span>
        </div>
      </div>
    </header>
  );
}
