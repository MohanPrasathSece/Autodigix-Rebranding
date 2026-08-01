import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Reveal } from "../Reveal";

function InteractiveParticlesScroll({ scrollProgress }: { scrollProgress: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    let animationId: number;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const count = 1200;
    interface Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      // Target shapes
      gX: number;
      gY: number;
      gZ: number;
      wX: number;
      wY: number;
      wZ: number;
      hX: number;
      hY: number;
      hZ: number;
    }
    const particles: Particle[] = [];

    // Initialize shapes
    for (let i = 0; i < count; i++) {
      // Globe targets
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 160;
      const gX = r * Math.sin(phi) * Math.cos(theta);
      const gY = r * Math.sin(phi) * Math.sin(theta);
      const gZ = r * Math.cos(phi);

      // Wave Grid targets
      const cols = 40;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const wSpacing = 16;
      const wX = (col - cols / 2) * wSpacing;
      const wY = Math.sin(col * 0.15) * 40 + Math.cos(row * 0.15) * 40;
      const wZ = (row - count / cols / 2) * wSpacing;

      // Helix targets
      const strand = i % 2 === 0 ? 0 : Math.PI;
      const hAngle = (i / count) * Math.PI * 10 + strand;
      const hR = 90;
      const hX = hR * Math.cos(hAngle);
      const hY = (i / count) * 360 - 180;
      const hZ = hR * Math.sin(hAngle);

      particles.push({
        x: gX,
        y: gY,
        z: gZ,
        vx: 0,
        vy: 0,
        vz: 0,
        gX,
        gY,
        gZ,
        wX,
        wY,
        wZ,
        hX,
        hY,
        hZ,
      });
    }

    let rotX = 0;
    let rotY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Scroll progress mapping (0 to 1)
      const p = scrollProgress.get();
      rotY += 0.003;
      rotX = Math.sin(rotY * 0.5) * 0.15;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      particles.forEach((pt) => {
        let tx = 0,
          ty = 0,
          tz = 0;

        // Interpolation logic between shapes
        if (p < 0.5) {
          const t = p * 2; // scale 0-0.5 to 0-1
          tx = pt.gX * (1 - t) + pt.wX * t;
          ty = pt.gY * (1 - t) + pt.wY * t;
          tz = pt.gZ * (1 - t) + pt.wZ * t;
        } else {
          const t = (p - 0.5) * 2; // scale 0.5-1 to 0-1
          tx = pt.wX * (1 - t) + pt.hX * t;
          ty = pt.wY * (1 - t) + pt.hY * t;
          tz = pt.wZ * (1 - t) + pt.hZ * t;
        }

        // Spring physics to transition coordinates smoothly
        pt.x += (tx - pt.x) * 0.08;
        pt.y += (ty - pt.y) * 0.08;
        pt.z += (tz - pt.z) * 0.08;

        // Apply 3D rotation coordinates
        let x1 = pt.x * cosY - pt.z * sinY;
        let z1 = pt.x * sinY + pt.z * cosY;
        let y1 = pt.y * cosX - z1 * sinX;
        let z2 = pt.y * sinX + z1 * cosX;

        // Camera project
        const fov = 350;
        const cameraD = 480;
        const scale = fov / (cameraD + z2);
        const projX = x1 * scale + width / 2;
        const projY = y1 * scale + height / 2;

        // Mouse repulsion physics
        if (mouseRef.current.active) {
          const dx = projX - mouseRef.current.x;
          const dy = projY - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const force = (90 - dist) / 90;
            pt.x += (dx / dist) * force * 12;
            pt.y += (dy / dist) * force * 12;
          }
        }

        // Particle transparency based on depth mapping
        const alpha = Math.max(0.15, Math.min(0.85, (z2 + 200) / 400));
        ctx.fillStyle = `rgba(160, 210, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(projX, projY, Math.max(1, scale * 1.5), 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [scrollProgress]);

  return <canvas ref={canvasRef} className="w-full h-full opacity-60 pointer-events-auto" />;
}

export function ExpandingCard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [isMobile ? 1 : 0.78, 1, 1]);
  const radius = useTransform(
    scrollYProgress,
    [0, 0.5],
    [isMobile ? "0px" : "56px", isMobile ? "0px" : "8px"],
  );
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", isMobile ? "0%" : "10%"]);

  return (
    <section ref={ref} className="relative pt-20 md:pt-20 md:pt-32 bg-[var(--beige)]">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <Reveal>
          <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--ink-soft)] mb-4">
            ◆ Philosophy
          </div>
          <h2 className="font-display text-4xl md:text-8xl text-[var(--ink)] max-w-4xl leading-[1.1] font-light">
            Stronger brand authority & <span className="">sustainability.</span>
          </h2>
          <p className="mt-8 text-[var(--ink-soft)] max-w-2xl text-lg leading-relaxed">
            We focus on revenue-driven performance, conversion optimization, and long-term
            positioning.
          </p>
        </Reveal>
      </div>

      <motion.div
        {...(!isMobile ? { style: { scale, borderRadius: radius } } : {})}
        className="relative mx-auto overflow-hidden bg-[var(--ink)] shadow-soft"
      >
        <div className="absolute inset-0 z-0 opacity-40">
          <InteractiveParticlesScroll scrollProgress={scrollYProgress} />
        </div>
        <motion.div
          style={{ y: imgY }}
          className="absolute inset-0 opacity-[0.03] noise-bg pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[var(--beige)]/5 to-transparent pointer-events-none" />

        <div className="relative px-6 md:px-20 py-20 md:py-48 grid md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.35em] text-[var(--beige-light)]/50 mb-8">
              ◆ AutoDigiX Philosophy
            </div>
            <h3 className="font-display text-4xl md:text-7xl text-[var(--beige-light)] leading-[1.0] font-light">
              Less noise. <br />
              <span className="">More revenue.</span>
            </h3>
            <p className="mt-10 text-[var(--beige-light)]/70 max-w-xl text-lg leading-relaxed">
              We don't sell activity. We deliver outcomes. Our systems are engineered to turn
              attention into qualified pipeline, using data-driven workflows and measurable
              conversion mechanisms.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-px bg-[var(--beige-light)]/10 rounded-2xl overflow-hidden">
            <div className="bg-[var(--ink)] p-8 flex flex-col justify-center border border-[var(--ink-soft)]/20 shadow-inner h-full">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--beige-light)]/60">
                Digital Marketing
              </div>
              <div className="font-display text-2xl md:text-3xl text-[var(--beige-light)] mt-4 font-light">
                Campaigns built for ROI
              </div>
              <div className="mt-4 text-[var(--beige-light)]/70 text-sm leading-relaxed">
                Strategic paid and organic acquisition frameworks designed to scale businesses.
              </div>
            </div>
            <div className="bg-[var(--ink)] p-8 flex flex-col justify-center border border-[var(--ink-soft)]/20 shadow-inner h-full">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--beige-light)]/60">
                AI Automation
              </div>
              <div className="font-display text-2xl md:text-3xl text-[var(--beige-light)] mt-4 font-light">
                Streamlined efficiency
              </div>
              <div className="mt-4 text-[var(--beige-light)]/70 text-sm leading-relaxed">
                Automated workflows that eliminate repetitive tasks and increase operational
                bandwidth.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
