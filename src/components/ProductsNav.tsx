"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ProductsNav() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  function closeMenu() {
    if (detailsRef.current) detailsRef.current.open = false;
  }

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (detailsRef.current?.open && !detailsRef.current.contains(event.target as Node)) closeMenu();
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);

  return <details
    className="products-nav"
    ref={detailsRef}
    onKeyDown={(event) => {
      if (event.key === "Escape" && detailsRef.current?.open) {
        event.preventDefault();
        closeMenu();
        summaryRef.current?.focus();
      }
    }}
  >
    <summary ref={summaryRef}>Products <span aria-hidden="true">⌄</span></summary>
    <div>
      <Link href="/products/ownkeep" onClick={closeMenu}><strong>OwnKeep</strong><small>Private information management</small></Link>
      <Link href="/products/hospital-management-system" onClick={closeMenu}><strong>ALVITEQ HMS</strong><small>Modern hospital operations</small></Link>
      <Link className="all-products-link" href="/products" onClick={closeMenu}>View all products →</Link>
    </div>
  </details>;
}
