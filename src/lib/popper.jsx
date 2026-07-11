import { useRef, useEffect, useCallback, useState } from "react";
import { PartyPopper } from "lucide-react";

// Matches the ribbon + star confetti look: thin rect "ribbons" in
// gold/red/green/purple/magenta, plus tiny 5-point stars in blue/red/gold.
const COLORS = ["#F2C14E", "#E24B4A", "#27AE60", "#7C3AED", "#D6247C", "#2E86DE"];

function makeParticle(originX, originY) {
  const isStar = Math.random() < 0.25;
  const angle = (-Math.PI / 2) + (Math.random() - 0.5) * (Math.PI * 0.9); // upward cone
  const speed = 6 + Math.random() * 10;
  return {
    x: originX,
    y: originY,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    isStar,
    size: isStar ? 6 + Math.random() * 4 : 4 + Math.random() * 3,
    length: 10 + Math.random() * 14,
    life: 1,
    decay: 0.004 + Math.random() * 0.004,
  };
}

function drawStar(ctx, size) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const outerAngle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const innerAngle = outerAngle + Math.PI / 5;
    const ox = Math.cos(outerAngle) * size;
    const oy = Math.sin(outerAngle) * size;
    const ix = Math.cos(innerAngle) * (size / 2.3);
    const iy = Math.sin(innerAngle) * (size / 2.3);
    if (i === 0) ctx.moveTo(ox, oy);
    else ctx.lineTo(ox, oy);
    ctx.lineTo(ix, iy);
  }
  ctx.closePath();
  ctx.fill();
}

export default function Popper({ className = "" }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const [popping, setPopping] = useState(false);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth * devicePixelRatio;
    canvas.height = parent.clientHeight * devicePixelRatio;
    canvas.style.width = `${parent.clientWidth}px`;
    canvas.style.height = `${parent.clientHeight}px`;
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function tick() {
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      for (const p of particlesRef.current) {
        p.vy += 0.22; // gravity
        p.vx *= 0.99; // air drag
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.life -= p.decay;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        if (p.isStar) {
          drawStar(ctx, p.size);
        } else {
          ctx.fillRect(-p.length / 2, -2, p.length, 4);
        }
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const pop = () => {
    const canvas = canvasRef.current;
    const originX = canvas.parentElement.clientWidth * 0.85;
    const originY = canvas.parentElement.clientHeight * 0.85;

    const burst = Array.from({ length: 90 }, () => makeParticle(originX, originY));
    particlesRef.current.push(...burst);

    setPopping(true);
    setTimeout(() => setPopping(false), 300);
  };

  return (
    <div className={`relative w-full h-full min-h-[320px] overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Popper cone, bottom-right, matching the gold cone in the photo */}
      <button
        onClick={pop}
        className={`absolute bottom-4 right-4 flex items-center justify-center w-16 h-16 rounded-2xl
          bg-gradient-to-br from-amber-300 to-amber-500 shadow-lg border-2 border-amber-600
          transition-transform ${popping ? "scale-90 rotate-6" : "scale-100 hover:scale-105"}`}
        aria-label="Pop confetti"
      >
        <PartyPopper className="w-7 h-7 text-amber-900" />
      </button>
    </div>
  );
}