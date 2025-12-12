import { useState, useEffect, useRef } from "react";

export default function FeaturedProjects() {
  const projects = [ 
    {
      title: "BARANGAY INFORMATION SYSTEM",
      description: "Streamlined request handling, resident profiles, and document processing.",
      image: "/images/PROJECT1.png",
      link: "https://github.com/GlinCabije16/Project_BIS",
    },
    {
      title: "Event Scheduler",
      description: "A Django-based scheduling and event management tool.",
      image: "/images/project2.png",
      link: "https://github.com/GlinCabije16/event_scheduler",
    },
    {
      title: "Mental Health Chatbot",
      description: "A C# AI chatbot providing emotional and mental support.",
      image: "/images/project3.png",
      link: "https://github.com/GlinCabije16/MentalHealthChatbot",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotation, setRotation] = useState(projects.map(() => 0));
  const [speed, setSpeed] = useState(projects.map(() => 0.2));
  const [typedText, setTypedText] = useState("");
  const heading = "Featured Projects";

  const cubeRef = useRef([]);
  const canvasRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(heading.slice(0, index + 1));
      index++;
      if (index >= heading.length) index = 0;
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Cube rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev.map((r, i) => r + speed[i]));
    }, 16);
    return () => clearInterval(interval);
  }, [speed]);

  // Diamond particle background
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
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 8 + Math.random() * 12;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = 0.05 + Math.random() * 0.15;
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
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
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
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <section
      id="projects"
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0b2833, #021c27)",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
        flexDirection: "column",
        gap: "40px",
        padding: "40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Diamond background */}
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
          letterSpacing: "2px",
          textAlign: "center",
          fontFamily:"-apple-system",
          color: "#eff8f8ff",
          zIndex: 2,
          textShadow: "0 0 8px #00ffff, 0 0 15px #00ffff",
        }}
      >
        {typedText}
      </h2>

      {/* Cubes */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
        zIndex: 1,
      }}>
        {projects.map((project, i) => (
          <div
            key={i}
            onClick={() => setSelectedIndex(i)}
            onMouseEnter={() =>
              setSpeed((prev) => prev.map((s, idx) => (idx === i ? 1 : s)))
            }
            onMouseLeave={() =>
              setSpeed((prev) => prev.map((s, idx) => (idx === i ? 0.2 : s)))
            }
            style={{
              width: "150px",
              height: "150px",
              perspective: "800px",
              cursor: "pointer",
            }}
          >
            <div
              ref={(el) => (cubeRef.current[i] = el)}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                transform: `rotateY(${rotation[i]}deg)`,
                transition: "transform 0.5s",
              }}
            >
              {["front", "back", "left", "right", "top", "bottom"].map(
                (face, idx) => {
                  let depth = 75;
                  let rotate;
                  switch (face) {
                    case "front": rotate = `rotateY(0deg) translateZ(${depth}px)`; break;
                    case "back": rotate = `rotateY(180deg) translateZ(${depth}px)`; break;
                    case "left": rotate = `rotateY(-90deg) translateZ(${depth}px)`; break;
                    case "right": rotate = `rotateY(90deg) translateZ(${depth}px)`; break;
                    case "top": rotate = `rotateX(90deg) translateZ(${depth}px)`; break;
                    case "bottom": rotate = `rotateX(-90deg) translateZ(${depth}px)`; break;
                  }
                  return (
                    <div
                      key={idx}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        border: "1px solid #fff",
                        boxShadow: "0 0 8px #00ffff inset, 0 0 15px #00ffff",
                        transform: rotate,
                        transition: "all 0.3s",
                      }}
                    />
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Project Details */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "600px",
          textAlign: "center",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px) saturate(180%)",
          borderRadius: "20px",
          padding: "30px",
          border: "1px solid rgba(0,255,255,0.2)",
          boxShadow: "0 10px 30px rgba(0,255,255,0.2)",
          transition: "all 0.3s",
          zIndex: 1,
        }}
      >
        <h3
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            fontFamily:"-apple-system",
            color: "#fff",
          }}
        >
          {projects[selectedIndex].title}
        </h3>
        <p style={{ fontSize: "1rem", lineHeight: "1.6", opacity: 0.9 }}>
          {projects[selectedIndex].description}
        </p>
        <a
          href={projects[selectedIndex].link}
          target="_blank"
          rel="noreferrer"
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            borderRadius: "10px",
            textDecoration: "none",
            color: "#fff",
            background: "rgba(0, 255, 255, 0.2)",
            fontWeight: 700,
            width: "fit-content",
            margin: "0 auto",
            boxShadow: "0 0 8px rgba(0,255,255,0.2)",
            transition: "all 0.3s",
          }}
        >
          View GitHub
        </a>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          h2 { font-size: 2.5rem !important; }
          div[style*='width: 150px'] { width: 120px !important; height: 120px !important; }
        }
        @media (max-width: 768px) {
          section#projects { padding: 20px; }
          div[style*='flex-wrap'] { gap: 20px; }
          div[style*='maxWidth: 600px'] { max-width: 90% !important; }
          h2 { font-size: 2rem !important; }
        }
        @media (max-width: 480px) {
          h2 { font-size: 1.5rem !important; }
          div[style*='width: 150px'] { width: 100px !important; height: 100px !important; }
          div[style*='maxWidth: 600px'] { padding: 20px !important; }
          p { font-size: 0.9rem !important; }
        }
      `}</style>
    </section>
  );
}
