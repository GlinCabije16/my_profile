import { useRef, useState, useEffect } from "react";
import { FaCertificate } from "react-icons/fa";

export default function Certificates3DZoom() {
  const certificates = [
    {
      title: "Educational Tour",
      caption: "Completed Educational Tour Certificate.",
      image: "/certificates/edu-tour-cert.jpg",
    },
  
  ];

  const canvasRef = useRef(null);
  const [typedHeading, setTypedHeading] = useState("");
  const heading = "My Certificates";
  const [zoomedImage, setZoomedImage] = useState(null);

  // Typewriter heading
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedHeading(heading.slice(0, index + 1));
      index++;
      if (index > heading.length) index = 0; // loop continuously
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Floating diamonds
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let diamonds = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    class Diamond {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 8 + Math.random() * 12;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = 0.05 + Math.random() * 0.1;
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = `rgba(0,255,255,${this.opacity})`;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
    }

    const initDiamonds = () => {
      diamonds = [];
      for (let i = 0; i < 50; i++) diamonds.push(new Diamond());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      diamonds.forEach((d) => {
        d.update();
        d.draw();
      });
      requestAnimationFrame(animate);
    };

    initDiamonds();
    animate();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <section id="certificates"
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#0b2833",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 20px",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Diamonds */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      {/* Heading */}
      <h2
        style={{
          fontSize: "3rem",
          fontWeight: 800,
          marginBottom: "60px",
          color: "#ffffffff",
          textShadow: "0 0 10px #00ffff, 0 0 20px #00ffff",
          fontFamily: "-apple-system",
          zIndex: 1,
        }}
      >
        {typedHeading}
      </h2>

      {/* Plaques */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "60px",
          zIndex: 1,
        }}
      >
        {certificates.map((cert, i) => (
          <Plaque3DFloating
            key={i}
            cert={cert}
            delay={i * 0.2}
            onClick={() => setZoomedImage(cert.image)}
          />
        ))}
      </div>

      {/* Zoom Modal */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "zoom-out",
            zIndex: 9999,
          }}
        >
          <img
            src={zoomedImage}
            alt="Zoomed Certificate"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "16px",
              boxShadow: "0 0 40px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes floatPlaque {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
}

// ============================
// Single 3D Plaque with floating
// ============================
function Plaque3DFloating({ cert, delay, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 5 + Math.random() * 10, y: -5 + Math.random() * 10 });

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "220px",
        perspective: "600px",
        cursor: "pointer",
        animation: `floatPlaque 4s ease-in-out ${delay}s infinite`,
      }}
    >
      <div
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(0,255,255,0.2)",
          borderRadius: "15px",
          backdropFilter: "blur(15px) saturate(180%)",
          WebkitBackdropFilter: "blur(15px) saturate(180%)",
          boxShadow: hovered
            ? "0 20px 40px rgba(0,255,255,0.3), 0 0 30px rgba(0,229,255,0.2)"
            : "0 10px 20px rgba(0,0,0,0.2)",
          overflow: "hidden",
          transform: `rotateX(${hovered ? 0 : tilt.x}deg) rotateY(${hovered ? 0 : tilt.y}deg) scale(${
            hovered ? 1.05 : 1
          }) translateY(${hovered ? "-5px" : "0px"})`,
          transition: "all 0.3s ease",
        }}
      >
        {/* Certificate Image */}
        <div
          style={{
            width: "100%",
            height: "140px",
            backgroundImage: `url(${cert.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.15)" : "scale(1.05)",
          }}
        />
        {/* Description */}
        <div style={{ padding: "15px" }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "10px" }}>{cert.title}</h3>
          <p style={{ fontSize: "1rem", opacity: 0.9 }}>{cert.caption}</p>
        </div>
      </div>
    </div>
  );
}
