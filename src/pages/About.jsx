import { useEffect, useRef, useState } from "react";
import { FaUser, FaGraduationCap, FaLaptopCode, FaBasketballBall, FaLanguage } from "react-icons/fa";

export default function AboutCubeGlass() {
  const canvasRef = useRef(null);
  const cubeRef = useRef(null);

  const details = [
    { icon: <FaUser color="#3fa9f5" />, title: "About Me", content: "Hi! I'm Angeline Cabije, aspiring Fullstack Developer creating clean, responsive web apps." },
    { icon: <FaGraduationCap color="#3fa9f5" />, title: "Education", content: "BSIT - Holy Cross of Davao College" },
    { icon: <FaLaptopCode color="#3fa9f5" />, title: "Programming Languages", content: "JavaScript, React, Node.js, SQL, Django, PHP, Python, C++, C#, Java" },
    { icon: <FaBasketballBall color="#3fa9f5" />, title: "Hobbies", content: "Basketball, Guitar, Digital Art and Painting" },
    { icon: <FaLanguage color="#3fa9f5" />, title: "Languages", content: "English, Filipino" },
  ];

  const [typedTexts, setTypedTexts] = useState(details.map(() => ""));
  const [expanded, setExpanded] = useState(details.map(() => true));
  const [cubeBroken, setCubeBroken] = useState(false);

  const [rotation, setRotation] = useState({ x: -20, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  const [pulse, setPulse] = useState(0);
  const [speed, setSpeed] = useState(0.2); // slow spinning
  

  // Typing effect for details
  useEffect(() => {
    let currentDetail = 0;
    let currentIndex = 0;
    const interval = setInterval(() => {
      setTypedTexts((prev) => {
        const newTexts = [...prev];
        if (currentDetail < details.length) {
          newTexts[currentDetail] = details[currentDetail].content.slice(0, currentIndex + 1);
        }
        return newTexts;
      });

      currentIndex++;
      if (currentIndex > details[currentDetail].content.length) {
        currentDetail++;
        currentIndex = 0;
      }

      if (currentDetail >= details.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Floating diamond particles
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
        this.size = 10 + Math.random() * 15;
        this.opacity = 0.05 + Math.random() * 0.15;
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = `rgba(0,255,255,${this.opacity})`;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
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

  // Drag to rotate cube
  const handleMouseDown = (e) => {
    setDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotation.x,
      rotY: rotation.y,
    };
  };
  const handleMouseMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setRotation({
      x: dragStart.current.rotX + dy * 0.5,
      y: dragStart.current.rotY + dx * 0.5,
    });
  };
  const handleMouseUp = () => setDragging(false);

  // Cube pulse effect
  useEffect(() => {
    let pulseValue = 0;
    const interval = setInterval(() => {
      pulseValue += 0.02;
      setPulse(Math.sin(pulseValue) * 0.05 + 1);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Continuous spin
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => ({ x: prev.x, y: prev.y + speed }));
    }, 16);
    return () => clearInterval(interval);
  }, [speed]);

  // Break cube on mount, then allow normal interaction
  useEffect(() => {
    setCubeBroken(true); // immediately break on mount
    const timer = setTimeout(() => {
      setCubeBroken(false); // after 1.5s, return to normal state
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        background: "#0b2833",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        gap: "40px",
        padding: "40px",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background diamonds */}
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

      {/* Left Details */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px", zIndex: 3, position: "relative" }}>
        {details.slice(0, 2).map((section, i) => (
          <div
            key={i}
            style={{
              backdropFilter: "blur(15px) saturate(180%)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "20px",
              padding: "20px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onClick={() => {
              const newExpanded = [...expanded];
              newExpanded[i] = !newExpanded[i];
              setExpanded(newExpanded);
            }}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div>{section.icon}</div>
              <h2 style={{ fontSize: "1.5rem" }}>{section.title}</h2>
            </div>
            {expanded[i] && <p style={{ fontFamily: "'Courier New', monospace", marginTop: "10px" }}>{typedTexts[i]}</p>}
          </div>
        ))}
      </div>

      {/* Center Cube */}
      <div
        style={{ perspective: "1500px", width: "300px", height: "300px", zIndex: 2 }}
        onMouseEnter={() => setSpeed(1)}
        onMouseLeave={() => setSpeed(0.2)}
        onClick={() => setCubeBroken(!cubeBroken)}
      >
        <div
          ref={cubeRef}
          style={{
            width: "10px",
            height: "10px",
            position: "relative",
            transformStyle: "preserve-3d",
            transform: `scale(${pulse}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            cursor: "grab",
            transition: dragging ? "none" : "transform 0.3s ease",
          }}
        >
          {["front", "back", "left", "right", "top", "bottom"].map((face, idx) => {
            const depth = 150;
            const offsets = cubeBroken ? [80, 80, 80, 80, 80, 80] : [0, 0, 0, 0, 0, 0];
            let rotate;
            switch (face) {
              case "front":
                rotate = `rotateY(0deg) translateZ(${depth + offsets[idx]}px)`;
                break;
              case "back":
                rotate = `rotateY(180deg) translateZ(${depth + offsets[idx]}px)`;
                break;
              case "left":
                rotate = `rotateY(-90deg) translateZ(${depth + offsets[idx]}px)`;
                break;
              case "right":
                rotate = `rotateY(90deg) translateZ(${depth + offsets[idx]}px)`;
                break;
              case "top":
                rotate = `rotateX(90deg) translateZ(${depth + offsets[idx]}px)`;
                break;
              case "bottom":
                rotate = `rotateX(-90deg) translateZ(${depth + offsets[idx]}px)`;
                break;
            }
            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  width: "300px",
                  height: "300px",
                  backgroundImage: "url('/images/image.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "2px solid #00ffff",
                  borderRadius: "10px",
                  transform: rotate,
                  boxShadow: "0 0 20px #00ffff inset, 0 0 40px #00ffff",
                  transition: "all 0.5s",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Right Details */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px", zIndex: 3, position: "relative" }}>
        {details.slice(2).map((section, i) => (
          <div
            key={i}
            style={{
              backdropFilter: "blur(15px) saturate(180%)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "20px",
              padding: "20px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onClick={() => {
              const newExpanded = [...expanded];
              newExpanded[i + 2] = !newExpanded[i + 2];
              setExpanded(newExpanded);
            }}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div>{section.icon}</div>
              <h2 style={{ fontSize: "1.5rem" }}>{section.title}</h2>
            </div>
            {expanded[i + 2] && <p style={{ fontFamily: "'Courier New', monospace", marginTop: "10px" }}>{typedTexts[i + 2]}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
