import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create stars
    const stars: Star[] = [];
    const numStars = 200;
    
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.1 + 0.05,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // Create shooting stars
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      angle: number;
    }

    const shootingStars: ShootingStar[] = [];
    
    const createShootingStar = () => {
      if (Math.random() > 0.98 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 3 + 2,
          opacity: 1,
          angle: Math.random() * 0.5 + 0.25, // Diagonal angle
        });
      }
    };

    // Animation
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.fillStyle = "rgba(10, 10, 25, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with twinkling effect
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const opacity = 0.3 + (twinkle + 1) * 0.35;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Add glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.size * 2
          );
          gradient.addColorStop(0, `rgba(200, 220, 255, ${opacity * 0.3})`);
          gradient.addColorStop(1, "rgba(200, 220, 255, 0)");
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Slowly move stars
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw shooting stars
      createShootingStar();
      shootingStars.forEach((shootingStar, index) => {
        const gradient = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
          shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
        gradient.addColorStop(0.5, `rgba(150, 200, 255, ${shootingStar.opacity * 0.7})`);
        gradient.addColorStop(1, "rgba(150, 200, 255, 0)");

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
          shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
        );
        ctx.stroke();

        // Move shooting star
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.opacity -= 0.01;

        // Remove if faded or off screen
        if (
          shootingStar.opacity <= 0 ||
          shootingStar.x > canvas.width ||
          shootingStar.y > canvas.height
        ) {
          shootingStars.splice(index, 1);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return <canvas ref={canvasRef} className="starry-canvas" />;
}