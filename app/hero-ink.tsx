"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";

export type HeroCopy = {
  eyebrow: string;
  title: [string, string];
  lede: string;
  cta: string;
  cta2: string;
  hint: string;
  hintTouch: string;
  rating: string;
  pins: [string, string, string];
};

type Stamp = { x: number; y: number; born: number; seed: number; rmax: number };

const PAPER: [number, number, number] = [244, 239, 230];

/* Procedural "ink" mask: a paper-coloured canvas the pointer carves through.
   Based on the ink-reveal component idea, rewritten for pointer + touch events,
   an automatic opening stroke and scroll-driven dissolve. */
function InkMask({ hostRef, active }: { hostRef: React.RefObject<HTMLElement | null>; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stamps = useRef<Stamp[]>([]);
  const running = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const dims = useRef({ w: 0, h: 0 });
  const idleTimer = useRef<number | null>(null);
  const brush = useRef(150);
  const lifetime = 1500;

  useEffect(() => {
    const canvas = canvasRef.current; const host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const mc = PAPER;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = host.getBoundingClientRect();
      dims.current = { w: r.width, h: r.height };
      brush.current = r.width < 760 ? 105 : 150;
      canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
      canvas.style.width = `${r.width}px`; canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgb(${mc[0]},${mc[1]},${mc[2]})`; ctx.fillRect(0, 0, r.width, r.height);
    };

    const carve = (x: number, y: number, r: number, seed: number, alpha: number) => {
      const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r);
      g.addColorStop(0, `rgba(0,0,0,${0.96 * alpha})`);
      g.addColorStop(0.55, `rgba(0,0,0,${0.86 * alpha})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.beginPath();
      const seg = 40;
      for (let i = 0; i <= seg; i++) {
        const a = (i / seg) * Math.PI * 2;
        const wob = 0.78 + 0.14 * Math.sin(a * 3 + seed) + 0.08 * Math.sin(a * 5 + seed * 2.1) + 0.05 * Math.sin(a * 7 + seed * 0.7);
        const px = x + Math.cos(a) * r * wob, py = y + Math.sin(a) * r * wob;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath(); ctx.fill();
    };

    const loop = () => {
      const { w, h } = dims.current; const now = performance.now(); const s = stamps.current;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgb(${mc[0]},${mc[1]},${mc[2]})`; ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "destination-out";
      for (let i = s.length - 1; i >= 0; i--) {
        const t = (now - s[i].born) / lifetime;
        if (t >= 1) { s.splice(i, 1); continue; }
        const ease = 1 - Math.pow(1 - t, 3);
        const r = 10 + (s[i].rmax - 10) * ease;
        const alpha = 1 - t * t * t;
        carve(s[i].x, s[i].y, r, s[i].seed, alpha);
      }
      if (s.length) requestAnimationFrame(loop); else running.current = false;
    };
    const start = () => { if (!running.current) { running.current = true; requestAnimationFrame(loop); } };
    const add = (x: number, y: number, k = 1) => {
      const s = stamps.current; if (s.length >= 220) s.shift();
      s.push({ x, y, born: performance.now(), seed: Math.random() * Math.PI * 2, rmax: brush.current * k * (0.6 + Math.random() * 0.45) });
    };
    const along = (x: number, y: number, k = 1) => {
      const l = last.current;
      if (!l) add(x, y, k);
      else {
        const dx = x - l.x, dy = y - l.y, dist = Math.hypot(dx, dy), steps = Math.max(1, Math.ceil(dist / 12));
        for (let i = 1; i <= steps; i++) add(l.x + (dx * i) / steps, l.y + (dy * i) / steps, k);
      }
      last.current = { x, y }; start();
    };

    /* automatic strokes: one opening sweep, then a soft wander whenever the pointer is idle */
    let auto: number | null = null; let cancelled = false;
    const sweep = (dur: number, path: (t: number) => [number, number], k = 1) => new Promise<void>(res => {
      const t0 = performance.now(); last.current = null;
      const step = () => {
        if (cancelled) return res();
        const t = Math.min(1, (performance.now() - t0) / dur);
        const [x, y] = path(t); along(x, y, k);
        if (t < 1) auto = requestAnimationFrame(step); else { last.current = null; res(); }
      };
      auto = requestAnimationFrame(step);
    });
    const opening = () => { const { w, h } = dims.current; return sweep(2600, t => [w * (0.08 + 0.84 * t), h * (0.62 + 0.14 * Math.sin(t * Math.PI * 2.2) - 0.1 * t)], 1.15); };
    const wander = () => { const { w, h } = dims.current; const cx = w * (0.15 + Math.random() * 0.7), cy = h * (0.3 + Math.random() * 0.5), rr = Math.min(w, h) * (0.12 + Math.random() * 0.14), a0 = Math.random() * 6.28; return sweep(2200, t => [cx + Math.cos(a0 + t * 2.4) * rr * t, cy + Math.sin(a0 + t * 2.4) * rr * 0.6 * t], 0.85); };
    let idle = true;
    const scheduleIdle = () => { if (idleTimer.current) window.clearTimeout(idleTimer.current); idleTimer.current = window.setTimeout(async () => { idle = true; while (idle && !cancelled && active) { await wander(); await new Promise(r => setTimeout(r, 1800 + Math.random() * 1600)); } }, 4500); };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.buttons === 0 && !(e.target instanceof Element && host.contains(e.target))) return;
      const r = host.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top;
      if (y < 0 || y > r.height) return;
      idle = false; if (auto) cancelAnimationFrame(auto); auto = null;
      along(x, y); scheduleIdle();
    };
    const onLeave = () => { last.current = null; };
    resize(); window.addEventListener("resize", resize);
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerdown", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    const t0 = window.setTimeout(() => { opening().then(scheduleIdle); }, 500);
    return () => {
      cancelled = true; window.clearTimeout(t0); if (idleTimer.current) window.clearTimeout(idleTimer.current); if (auto) cancelAnimationFrame(auto);
      window.removeEventListener("resize", resize); host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerdown", onMove); host.removeEventListener("pointerleave", onLeave);
    };
  }, [hostRef, active]);

  return <canvas ref={canvasRef} className="hero-ink" aria-hidden />;
}

export function HeroInk({ c, wa }: { c: HeroCopy; wa: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [touch, setTouch] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  useMotionValueEvent(scrollYProgress, "change", v => { ref.current?.style.setProperty("--p", v.toFixed(4)); });

  useEffect(() => {
    setTouch(window.matchMedia("(hover: none)").matches);
    const el = ref.current; if (!el) return;
    let raf = 0; let tx = 0, ty = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = (e.clientX / window.innerWidth - 0.5) * 2; ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(() => { el.style.setProperty("--mx", tx.toFixed(3)); el.style.setProperty("--my", ty.toFixed(3)); raf = 0; });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className={`hero${reduced ? " reduced" : ""}`} ref={ref} id="top">
      <div className="hero-stage">
        <div className="hero-photo">
          <Image src="/images/hero-lake.webp" alt="Mountains and a lake in Adjara, Georgia" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "50% 45%" }} />
        </div>
        <img className="hero-fog f1" src="/images/fog-1.png" alt="" aria-hidden />
        <img className="hero-fog f2" src="/images/fog-2.png" alt="" aria-hidden />
        {!reduced && <InkMask hostRef={ref} active />}
        {reduced && <div className="hero-ink static" />}
        <div className="hero-vignette" />

        <div className="hero-copy">
          <p className="hero-eyebrow">{c.eyebrow}</p>
          <h1 className="hero-title"><span>{c.title[0]}</span><em>{c.title[1]}</em></h1>
          <p className="hero-lede">{c.lede}</p>
          <div className="hero-actions">
            <a className="btn btn-ink" href={wa} target="_blank" rel="noopener noreferrer">{c.cta}</a>
            <a className="btn btn-paper" href="#tours">{c.cta2} ↓</a>
          </div>
          <p className="hero-hint">{touch ? c.hintTouch : c.hint}</p>
        </div>

        <figure className="pin pin-a"><Image src="/images/tour-canyon.webp" alt="" width={360} height={480} sizes="200px" /><figcaption>{c.pins[0]}</figcaption></figure>
        <figure className="pin pin-b"><Image src="/images/tour-cave-red.webp" alt="" width={360} height={270} sizes="220px" /><figcaption>{c.pins[1]}</figcaption></figure>
        <figure className="pin pin-c"><Image src="/images/tour-highland.webp" alt="" width={360} height={240} sizes="220px" /><figcaption>{c.pins[2]}</figcaption></figure>

        <div className="hero-rating">
          <span className="hero-stars">★★★★★</span>
          <b>5.0</b>
          <span>{c.rating}</span>
        </div>
      </div>
    </section>
  );
}
