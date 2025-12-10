import { useEffect, useRef } from "react";

export default function Home() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerRef = useRef(null);

  useEffect(() => {
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

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Helper function to split text into spans for animation
  const animateLetters = (text) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        style={{
          display: "inline-block",
          opacity: 0,
          transform: "translateY(20px)",
          animation: `fadeUp 0.6s forwards`,
          animationDelay: `${i * 0.05}s`,
        }}
      >
        {char}
      </span>
    ));

  return (
    <div
      id="home"
      ref={containerRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, rgb(255,32,78), rgb(160,21,62), rgb(93,14,65), rgb(0,34,77))",
        padding: "80px 20px",
        color: "#DFD8B8",
        opacity: 0,
        transform: "translateY(50px)",
        transition: "opacity 1.1s ease-out, transform 1.1s ease-out",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "60px",
          flexWrap: "wrap",
          textAlign: "left",
          maxWidth: "1200px",
        }}
      >
        {/* Left - Text Intro */}
        <div>
          <h3
            style={{
              fontSize: "1.8rem",
              margin: 0,
              color: "rgba(255, 255, 255, 1)",
              fontFamily: "'Poppins', sans-serif",
              overflow: "hidden",
            }}
          >
            {animateLetters("Hi, I am")}
          </h3>
          <h1
            style={{
              fontSize: "4rem",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "800",
              margin: "10px 0",
              textShadow: "2px 2px 15px rgba(0,0,0,0.5)",
              color: "rgba(241, 241, 241, 1)",
              overflow: "hidden",
            }}
          >
            {animateLetters("Angeline A. Cabije")}
          </h1>
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: "600",
              color: "rgba(255, 255, 255, 1)",
              marginBottom: "25px",
              fontFamily: "'Poppins', sans-serif",
              overflow: "hidden",
            }}
          >
            {animateLetters("Aspiring Full-Stack Developer")}
          </h2>

          <button
            onClick={scrollToAbout}
            style={{
              padding: "16px 40px",
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "#fff",
              backgroundColor: "rgba(177, 5, 117, 1)",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgb(255,32,78)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgb(93,14,65)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Explore More ↓
          </button>
        </div>

        {/* Right - Profile Image */}
        <img
          src="/images/image.jpg"
          alt="Profile"
          style={{
            width: "350px",
            height: "450px",
            objectFit: "cover",
            borderRadius: "55% 85% 50% 90%",
            animation: "floatImage 4s ease-in-out infinite",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          }}
        />
      </div>

      <style>
        {`
          @keyframes floatImage {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }

          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 850px) {
            #home h1 {
              font-size: 3rem !important;
            }
            #home img {
              width: 290px !important;
              height: 290px !important;
            }
          }
        `}
      </style>
    </div>
  );
}
