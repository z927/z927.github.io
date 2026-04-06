import { useEffect, useRef } from "react";

const TunnelBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, w, h);

      const rings = 12;
      for (let i = rings; i >= 0; i--) {
        const progress = ((i / rings) + time * 0.3) % 1;
        const scale = progress * progress;
        const size = Math.max(w, h) * scale * 1.5;
        const alpha = (1 - progress) * 0.12;

        const gridSize = 3 + Math.floor(progress * 5);
        const halfW = size * 0.8;
        const halfH = size * 0.6;

        ctx.strokeStyle = `hsla(145, 100%, 55%, ${alpha * 0.4})`;
        ctx.lineWidth = 0.3 + (1 - progress) * 0.8;

        for (let g = -gridSize; g <= gridSize; g++) {
          const y = cy + (g / gridSize) * halfH;
          ctx.beginPath();
          ctx.moveTo(cx - halfW, y);
          ctx.lineTo(cx + halfW, y);
          ctx.stroke();
        }

        for (let g = -gridSize; g <= gridSize; g++) {
          const x = cx + (g / gridSize) * halfW;
          ctx.beginPath();
          ctx.moveTo(x, cy - halfH);
          ctx.lineTo(x, cy + halfH);
          ctx.stroke();
        }

        ctx.strokeStyle = `hsla(280, 80%, 55%, ${alpha * 0.2})`;
        ctx.lineWidth = 0.3 + (1 - progress) * 1;
        ctx.strokeRect(cx - halfW, cy - halfH, halfW * 2, halfH * 2);
      }

      const rays = 8;
      for (let i = 0; i < rays; i++) {
        const angle = (i / rays) * Math.PI * 2 + time * 0.5;
        const len = Math.max(w, h);
        ctx.strokeStyle = `hsla(145, 100%, 55%, 0.03)`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
        ctx.stroke();
      }

      time += 0.003;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default TunnelBackground;
