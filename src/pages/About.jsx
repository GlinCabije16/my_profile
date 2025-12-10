import { useEffect, useRef } from "react";
import { FaBasketballBall, FaLaptopCode, FaGraduationCap } from "react-icons/fa";

export default function About() {
  const aboutCards = [
    {
      title: "Hobbies",
      icon: <FaBasketballBall size={50} color="#90e0ef" />,
      content: "Basketball • Guitar • Digital Art • Learning New Tech",
    },
    {
      title: "Languages",
      icon: <FaLaptopCode size={50} color="#90e0ef" />,
      content: "JavaScript • React • Node.js • Django • SQL",
    },
    {
      title: "Education",
      icon: <FaGraduationCap size={50} color="#90e0ef" />,
      content: "BSIT - Holy Cross of Davao College",
    },
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div
      id="about"
      ref={sectionRef}
      style={{
        width: "100vw",
        height: "100vh",
        fontFamily: "'Inter', sans-serif",
        color: "#fff",
         background: "linear-gradient(135deg, rgb(255,32,78), rgb(160,21,62), rgb(93,14,65), rgb(0,34,77))",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "95%",
          height: "90%",
          boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        {/* Left Page */}
        <div
          className="fade-in"
          style={{
            flex: "0 0 40%",
             background: "linear-gradient(135deg, rgb(0,34,77), rgb(160,21,62), rgb(93,14,65), rgb(0,34,77))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            borderRight: "6px solid #0e2a55",
          }}
        >
          <img
            src="/images/image.jpg"
            alt="Profile"
            style={{
              width: "100%",
              height: "100%",
               borderRadius: "95% 95% 90% 20%",
              objectFit: "cover",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          />
        </div>

        {/* Spine */}
        <div
          style={{
            width: "12px",
            backgroundColor: "#0e2a55",
            boxShadow: "inset 0 0 10px rgba(0,0,0,0.4)",
          }}
        />

        {/* Right Page */}
        <div
          className="fade-in"
          style={{
            flex: "0 0 60%",
          background: "linear-gradient(135deg, rgb(255,32,78), rgb(160,21,62), rgb(93,14,65), rgb(0,34,77))",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {/* About Text */}
          <div style={{ textAlign: "justify", maxWidth: "800px", marginBottom: "50px" }}>
            <h1 style={{ fontSize: "3.5rem", fontWeight: "700" }}>About Me</h1>
            <p style={{ fontSize: "1.2rem", lineHeight: "1.8", color: "#e0e0e0" }}>
              Hi! I'm <strong>Angeline A. Cabije</strong>, an <strong>Aspiring Fullstack Developer</strong> passionate about building modern, scalable web applications and solving challenging problems.
            </p>
          </div>

          {/* Creative Cards */}
          <div
            style={{
              display: "flex",
              gap: "25px",
              width: "80%",
              justifyContent: "space-between",
              flexWrap: "wrap",
           
            }}
          >
            {aboutCards.map((card, index) => (
              <div
                key={index}
                style={{
                  flex: "1 1 1%",
                  minWidth: "100px",
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "20px",
                  backgroundColor: "#0b2a55",
                  boxShadow: "0 15px 50px rgba(0,0,0,0.4)",
                  padding: "20px",
                  textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 15px 50px rgba(0,0,0,0.4)";
                }}
              >
                <div style={{ marginBottom: "15px" }}>{card.icon}</div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>{card.title}</h2>
                <p style={{ fontSize: "1.1rem", color: "#ccc" }}>{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .fade-in { opacity: 0; transform: translateY(30px); transition: all 1s ease-out; }
        .fade-in.visible { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
}
