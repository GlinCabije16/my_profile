import { useState, useEffect, useRef } from "react";
import { FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Contact() {
  const cubeRef = useRef(null);
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [speed, setSpeed] = useState(0.2); // slow spin default
  const [cubeBroken, setCubeBroken] = useState(true); // initially broken

  // Continuous rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + speed);
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, [speed]);

  // Floating diamonds background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let diamonds = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Diamond {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 5 + Math.random() * 10;
        this.speed = 0.2 + Math.random() * 0.5;
        this.opacity = 0.05 + Math.random() * 0.15;
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.random() * Math.PI / 4);
        ctx.fillStyle = `rgba(0,255,255,${this.opacity})`;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
        this.y -= this.speed;
        if (this.y < -this.size) this.reset();
      }
    }

    const initDiamonds = () => {
      diamonds = [];
      for (let i = 0; i < 80; i++) diamonds.push(new Diamond());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      diamonds.forEach((d) => d.draw());
      requestAnimationFrame(animate);
    };

    initDiamonds();
    animate();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div
      id="contact"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0b2833",
        color: "#f6f6f6ff",
        fontFamily: "'Inter', sans-serif",
        padding: "50px 20px",
        gap: "100px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Floating diamonds canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Left-side contact info */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          maxWidth: "800px",
          textAlign: "start",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>Get in Touch</h1>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
          I’m always open to discussing projects, opportunities, or just a friendly hello.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {[
            { icon: <FaEnvelope size={28} />, text: "angeline16cabije@gmail.com" },
            { icon: <FaPhone size={28} />, text: "0951-5527-914" },
            { icon: <FaFacebook size={28} />, text: "Lin Amparo Cabije" },
          ].map((contact, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                background: "rgba(255, 255, 255, 0.1)",
                padding: "15px 20px",
                borderRadius: "15px",
                backdropFilter: "blur(8px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                color: "#fff",
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
              }}
            >
              {contact.icon} {contact.text}
            </div>
          ))}
        </div>
      </div>

      {/* Right-side spinning cube */}
      <div
        style={{
          width: "250px",
          height: "250px",
          perspective: "1000px",
          cursor: "pointer",
          position: "relative",
          zIndex: 1,
        }}
        onMouseEnter={() => setSpeed(1)} // faster spin on hover
        onMouseLeave={() => setSpeed(0.2)} // slow spin default
        onClick={() => setCubeBroken(!cubeBroken)} // toggle broken/normal
      >
        <div
          ref={cubeRef}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
            transition: "transform 0.1s linear",
          }}
        >
          {["front", "back", "left", "right", "top", "bottom"].map((face, idx) => {
            const size = 125; // half of 250px cube
            const offset = cubeBroken ? 50 : 0; // break apart offset
            let transform;
            switch (face) {
              case "front":
                transform = `rotateY(0deg) translateZ(${size + offset}px)`;
                break;
              case "back":
                transform = `rotateY(180deg) translateZ(${size + offset}px)`;
                break;
              case "left":
                transform = `rotateY(-90deg) translateZ(${size + offset}px)`;
                break;
              case "right":
                transform = `rotateY(90deg) translateZ(${size + offset}px)`;
                break;
              case "top":
                transform = `rotateX(90deg) translateZ(${size + offset}px)`;
                break;
              case "bottom":
                transform = `rotateX(-90deg) translateZ(${size + offset}px)`;
                break;
            }
            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundImage: "url('/images/image.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "2px solid #00ffff",
                  borderRadius: "15px",
                  transform,
                  boxShadow: "0 0 20px #00ffff inset, 0 0 40px #00ffff",
                  transition: "all 0.5s",
                }}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div#contact {
            flex-direction: column-reverse;
            gap: 50px;
            padding: 40px 20px;
          }
        }
      `}</style>
    </div>
  );
}
