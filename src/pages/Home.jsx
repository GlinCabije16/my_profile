import { useEffect, useState } from "react";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Aspiring Fullstack Developer ";

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
  };

  // Typing effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index = (index + 1) % (fullText.length + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Floating diamonds background with mouse interaction
  useEffect(() => {
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    let diamonds = [];
    let mouse = { x: 0, y: 0 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    class Diamond {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 10 + Math.random() * 15;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = 0.05 + Math.random() * 0.1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }

      update() {
        // Movement with mouse parallax
        const dx = (this.x - mouse.x) * 0.0005;
        const dy = (this.y - mouse.y) * 0.0005;
        this.x += this.speedX + dx;
        this.y += this.speedY + dy;
        this.rotation += this.rotationSpeed;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
    }

    const initDiamonds = () => {
      diamonds = [];
      for (let i = 0; i < 80; i++) diamonds.push(new Diamond());
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
    <div
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        background: "#0b2833",
        overflow: "hidden",
        padding: "20px",
        fontFamily: "'Poppins', sans-serif",
        color: "#f0f0f0",
        perspective: "1000px",
      }}
    >
      {/* Floating diamonds */}
      <canvas
        id="particleCanvas"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      {/* Hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "80px",
          flexWrap: "wrap",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* Left Text */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          <h3 style={{ fontSize: "1.8rem", margin: 0, color: "#1cbcc1ff" }}>
            Hi, I'm
          </h3>
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "800",
              margin: "10px 0",
              textShadow: "0 0 15px #063a3cff, 0 0 30px #17595bff",
            }}
          >
            Angeline A. Cabije
          </h1>
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: "600",
              color: "#95d7ebff",
            }}
          >
            {typedText}
            <span
              style={{
                borderLeft: "2px solid #00f5ff",
                marginLeft: "2px",
                animation: "blinkCursor 1.5s step-start infinite",
              }}
            ></span>
          </h2>
          <button
            onClick={scrollToAbout}
            style={{
              padding: "16px 40px",
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "#fff",
              background: "linear-gradient(90deg, #00979cff, #004496ff)",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
              marginTop: "20px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,255,255,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.4)";
            }}
          >
            Explore ↓
          </button>
        </div>

        {/* Right Cube */}
        <div
          style={{
            width: "360px",
            height: "360px",
            position: "relative",
            transformStyle: "preserve-3d",
            animation: "cubeSpin 12s linear infinite",
            perspective: "2000px",
          }}
        >
          {["front", "back", "left", "right", "top", "bottom"].map((face, idx) => {
            let rotate;
            const depth = 130;
            switch (face) {
              case "front": rotate = `rotateY(0deg) translateZ(${depth}px)`; break;
              case "back": rotate = `rotateY(180deg) translateZ(${depth}px)`; break;
              case "left": rotate = `rotateY(-90deg) translateZ(${depth}px)`; break;
              case "right": rotate = `rotateY(90deg) translateZ(${depth}px)`; break;
              case "top": rotate = `rotateX(90deg) translateZ(${depth}px)`; break;
              case "bottom": rotate = `rotateX(-90deg) translateZ(${depth}px)`; break;
              default: rotate = "";
            }
            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  width: "230px",
                  height: "230px",
                  backgroundImage: "url('/images/image.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "20px",
                  boxShadow: "0 0 15px rgba(0,255,255,0.4), inset 0 0 20px rgba(0,0,0,0.2)",
                  transform: rotate,
                }}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes cubeSpin {
          0% { transform: rotateY(0deg) rotateX(15deg); }
          50% { transform: rotateY(180deg) rotateX(25deg); }
          100% { transform: rotateY(360deg) rotateX(15deg); }
        }
        @keyframes blinkCursor {
          0%,100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 850px) {
          h1 { font-size: 3rem !important; }
          div[style*='width: 360px'] { width: 260px !important; height: 260px !important; }
          div[style*='width: 230px'] { width: 180px !important; height: 180px !important; }
        }
      `}</style>
    </div>
  );
}
