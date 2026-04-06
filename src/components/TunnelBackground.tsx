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

      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, w, h);

      const rings = 20;
      for (let i = rings; i >= 0; i--) {
        const progress = ((i / rings) + time * 0.3) % 1;
        const scale = progress * progress;
        const size = Math.max(w, h) * scale * 1.5;
        const alpha = (1 - progress) * 0.4;

        // Grid tunnel effect
        const gridSize = 4 + Math.floor(progress * 8);
        const halfW = size * 0.8;
        const halfH = size * 0.6;

        ctx.strokeStyle = `hsla(145, 100%, 55%, ${alpha * 0.6})`;
        ctx.lineWidth = 0.5 + (1 - progress) * 1.5;

        // Horizontal lines
        for (let g = -gridSize; g <= gridSize; g++) {
          const y = cy + (g / gridSize) * halfH;
          const x1 = cx - halfW;
          const x2 = cx + halfW;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
        }

        // Vertical lines
        for (let g = -gridSize; g <= gridSize; g++) {
          const x = cx + (g / gridSize) * halfW;
          const y1 = cy - halfH;
          const y2 = cy + halfH;
          ctx.beginPath();
          ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
          ctx.stroke();
        }

        // Rectangular frame
        ctx.strokeStyle = `hsla(280, 80%, 55%, ${alpha * 0.4})`;
        ctx.lineWidth = 0.5 + (1 - progress) * 2;
        ctx.strokeRect(cx - halfW, cy - halfH, halfW * 2, halfH * 2);
      }

      // Radial lines from center (depth lines)
      const rays = 12;
      for (let i = 0; i < rays; i++) {
        const angle = (i / rays) * Math.PI * 2 + time * 0.5;
        const len = Math.max(w, h);
        ctx.strokeStyle = `hsla(145, 100%, 55%, 0.08)`;
        ctx.lineWidth = 1;
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
