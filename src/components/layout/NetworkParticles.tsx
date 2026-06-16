"use client";
import { useEffect, useRef } from "react";

export const NetworkParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isTabActive = true;

    // Handle high-DPI displays (Retina)
    const setCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Mouse tracking
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Particle Setup (Low density for premium feel: ~40 particles)
    const particleCount = 40;
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5, // Extremely slow movement
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.5 + 0.5,
      });
    }

    // Animation Loop
    const animate = () => {
      if (!isTabActive) return; // Pause if user is on another tab

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges smoothly
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

        // Draw particle (Data packet)
        ctx.fillStyle = "rgba(59, 130, 246, 0.4)"; // Electric Blue
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles to each other
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 - distance / 1200})`; // Fades out based on distance
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect particles to mouse
        const mouseDx = p.x - mouse.x;
        const mouseDy = p.y - mouse.y;
        const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

        if (mouseDistance < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.2 - mouseDistance / 750})`; // Soft Purple for cursor interaction
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          
          // Subtle magnetic pull to cursor
          p.x -= mouseDx * 0.005;
          p.y -= mouseDy * 0.005;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // CPU Saver: Stop animating when tab is inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isTabActive = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isTabActive = true;
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] opacity-60"
    />
  );
};