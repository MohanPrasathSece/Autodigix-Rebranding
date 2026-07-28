"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import createGlobe from "cobe";

interface InteractiveMarker {
  id: string;
  location: [number, number];
  name: string;
  users: number;
  countryCode: string;
}

interface GlobeInteractiveProps {
  markers?: InteractiveMarker[];
  className?: string;
  speed?: number;
}

const defaultMarkers: InteractiveMarker[] = [
  { id: "nyc", location: [40.71, -74.0], name: "New York", users: 3420, countryCode: "us" },
  { id: "lon", location: [51.5, -0.12], name: "London", users: 2890, countryCode: "gb" },
  { id: "tok", location: [35.68, 139.69], name: "Tokyo", users: 4100, countryCode: "jp" },
  { id: "syd", location: [-33.86, 151.2], name: "Sydney", users: 1540, countryCode: "au" },
  { id: "yyz", location: [43.65, -79.38], name: "Toronto", users: 1200, countryCode: "ca" },
  { id: "ber", location: [52.52, 13.4], name: "Berlin", users: 1850, countryCode: "de" },
  { id: "bom", location: [19.07, 72.87], name: "Mumbai", users: 2650, countryCode: "in" },
  { id: "gru", location: [-23.55, -46.63], name: "São Paulo", users: 2200, countryCode: "br" },
  { id: "sin", location: [1.35, 103.81], name: "Singapore", users: 1950, countryCode: "sg" },
  { id: "dxb", location: [25.2, 55.27], name: "Dubai", users: 1750, countryCode: "ae" },
];

export function GlobeInteractive({
  markers = defaultMarkers,
  className = "",
  speed = 0.003,
}: GlobeInteractiveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId: number;
    let phi = 0;

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0) return;
      if (globe) return; // already initialized

      const isMobile = window.innerWidth < 768;
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.2,
        dark: 0,
        diffuse: 1.5,
        mapSamples: isMobile ? 6000 : 12000,
        mapBrightness: 10,
        baseColor: [1, 1, 1],
        markerColor: isMobile ? [0.28, 0.25, 0.22] : [0.1, 0.2, 0.45],
        glowColor: [0.94, 0.93, 0.91],
        markerElevation: 0,
        markers: markers.map((m) => ({
          location: m.location,
          size: isMobile ? 0.04 : 0.025,
          id: m.id,
        })),
        arcs: [],
        arcColor: [0.15, 0.3, 0.55],
        arcWidth: 0.5,
        arcHeight: 0.25,
        opacity: 0.7,
      });

      function animate() {
        if (!isPausedRef.current) phi += speed;
        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
        });
        animationId = requestAnimationFrame(animate);
      }
      animate();
      setTimeout(() => canvas && (canvas.style.opacity = "1"));
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (globe) globe.destroy();
    };
  }, [markers, speed]);

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <style>{`
        @keyframes fade-slide-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 0.8; transform: translateY(0); }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
          willChange: "opacity, transform",
        }}
      />
      {markers.map((m) => (
        <div
          key={m.id}
          onClick={() => setExpanded(expanded === m.id ? null : m.id)}
          style={{
            position: "absolute",
            // @ts-expect-error CSS Anchor Positioning
            positionAnchor: `--cobe-${m.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            marginBottom: 6,
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            padding: expanded === m.id ? "0.4rem 0.6rem" : "0.3rem 0.5rem",
            background:
              expanded === m.id ? (window.innerWidth < 768 ? "#000" : "#1a1a2e") : "transparent",
            color: "#fff",
            borderRadius: 6,
            cursor: "pointer",
            boxShadow: expanded === m.id ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
            transition:
              "opacity 0.4s, filter 0.4s, transform 0.2s, padding 0.2s, background 0.2s, box-shadow 0.2s",
            zoom: expanded === m.id ? 1.05 : 1,
            pointerEvents: "auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <img
                src={`https://flagcdn.com/w40/${m.countryCode}.png`}
                alt={m.countryCode}
                style={{
                  width: expanded === m.id ? "20px" : "28px",
                  height: "auto",
                  transition: "width 0.2s",
                  borderRadius: "2px",
                  boxShadow: expanded === m.id ? "none" : "0 1px 4px rgba(0,0,0,0.4)",
                }}
              />
            </span>
            {expanded === m.id && (
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                }}
              >
                {m.name}
              </span>
            )}
          </div>
          {expanded === m.id && (
            <span
              style={{
                fontFamily: "system-ui, sans-serif",
                fontSize: "0.55rem",
                opacity: 0.8,
                marginTop: "0.15rem",
                animation: "fade-slide-in 0.2s ease-out",
              }}
            >
              {m.users.toLocaleString()} users
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
