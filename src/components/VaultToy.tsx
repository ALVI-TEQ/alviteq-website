"use client";
import React, { useState, useRef, MouseEvent } from 'react';

export default function VaultToy() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation is 15 degrees
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        margin: "3rem auto",
        maxWidth: "350px",
        cursor: "crosshair"
      }}
    >
      <div
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isHovered ? "transform 0.1s ease" : "transform 0.5s ease",
          background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "1.5rem",
          padding: "2.5rem 1.5rem",
          boxShadow: isHovered 
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(74, 144, 226, 0.2)" 
            : "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          transformStyle: "preserve-3d",
        }}
      >
        <div style={{ transform: "translateZ(50px)" }}>
          <div style={{ 
            fontSize: "3rem", 
            marginBottom: "1rem",
            textShadow: isHovered ? "0 0 20px rgba(255,255,255,0.5)" : "none",
            transition: "all 0.3s ease"
          }}>
            {isHovered ? "🔓" : "🔒"}
          </div>
          <h3 style={{ margin: 0, color: "#fff", fontSize: "1.2rem", fontWeight: 500 }}>
            {isHovered ? "Vault Unlocked" : "Interactive Vault"}
          </h3>
          <p style={{ color: "#a0a0a0", marginTop: "0.5rem", fontSize: "0.9rem", lineHeight: 1.5 }}>
            Move your mouse around to inspect the cryptographic seal.
          </p>
        </div>
      </div>
    </div>
  );
}
