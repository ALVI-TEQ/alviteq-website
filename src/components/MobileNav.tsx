"use client";

import Link from "next/link";
import { useRef } from "react";

const links = [
  ["Products", "/products"], ["OwnKeep", "/products/ownkeep"],
  ["ALVITEQ HMS", "/products/hospital-management-system"], ["About", "/about"],
  ["Technology", "/technology"], ["Trust", "/trust"], ["Careers", "/careers"],
  ["Contact", "/contact"],
];

export default function MobileNav() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const closeMenu = () => { if (detailsRef.current) detailsRef.current.open = false; };

  return <details className="mobile-nav" ref={detailsRef} onKeyDown={(event) => {
    if (event.key === "Escape" && detailsRef.current?.open) {
      event.preventDefault();
      closeMenu();
      summaryRef.current?.focus();
    }
  }}>
    <summary ref={summaryRef}>Menu</summary>
    <div>{links.map(([label, href]) => <Link key={href} href={href} onClick={closeMenu}>{label}</Link>)}</div>
  </details>;
}
