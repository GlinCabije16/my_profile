import { useState, useEffect, useRef } from "react";

export default function ToursDynamicSlider() {
  const tours = [
    { title: "Code-chump Cebu Visit", image: "/images/code-chump.jpg", location: "Cebu" },
    { title: "RIVAN IT CEBU VISIT", image: "/images/Rivant IT.jpg", location: "Cebu" },
    { title: "Santo Nino Church Tour", image: "/images/santonio.jpg", location: "Cebu" },
    { title: "Baclayon Church Tour", image: "/images/baclayon.jpg", location: "Bohol" },
    { title: "Tarshier Bohol Tour", image: "/images/tarshier.jpg", location: "Bohol" },
    { title: "Loboc River Tour", image: "/images/loboc.jpg", location: "Bohol" },
    { title: "Chocolate Hills Tour", image: "/images/chocolate hills.jpg", location: "Bohol" },
    { title: "Mirror of the World Tour", image: "/images/mirror of the world.jpg", location: "Bohol" },
  ];

  const [zoomed, setZoomed] = useState(null);
  const canvasRef = useRef(null);

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
      for (let i = 0; i < 100; i++) diamonds.push(new Diamond());
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

  const renderMarquee = (sectionTours, direction = "left", speed = 35) => {
    const animationName = direction === "left" ? "scrollLeft" : "scrollRight";

    return (
      <div id="tours" style={{ overflow: "hidden", width: "100%", position: "relative" }}>
        <div
          className={`marquee ${animationName}`}
          style={{
            display: "flex",
            gap: "30px",
            padding: "20px 0",
            alignItems: "center",
            animationDuration: `${speed}s`,
          }}
        >
          {[...sectionTours, ...sectionTours].map((tour, i) => (
            <div
              key={i}
              onClick={() => setZoomed(tour.image)}
              style={{
                flex: "0 0 auto",
                width: "280px",
                height: "380px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                boxShadow: "0 15px 40px rgba(0,0,0,0.3), 0 0 20px rgba(0,229,255,0.15)",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "10px",
              }}
            >
              <img
                src={tour.image}
                alt={tour.title}
                style={{
                  width: "100%",
                  height: "75%",
                  objectFit: "cover",
                  borderRadius: "15px",
                  marginBottom: "12px",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s ease",
                }}
              />
              <h3
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  color: "#DFDB8",
                  fontSize: "1.1rem",
                }}
              >
                {tour.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        padding: "50px 20px",
        fontFamily: "'Poppins', sans-serif",
        background: "#0b2833",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "60px",
      }}
    >
      {/* Canvas for floating diamonds */}
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

      {/* Cebu Section */}
      <div style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "30px",
            textAlign: "center",
            color: "#DFDB8",
            fontWeight: "700",
          }}
        >
          Cebu Tours
        </h2>
        {renderMarquee(tours.filter((t) => t.location === "Cebu"), "left", 35)}
      </div>

      {/* Bohol Section */}
      <div style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "30px",
            textAlign: "center",
            color: "#DFDB8",
            fontWeight: "700",
          }}
        >
          Bohol Tours
        </h2>
        {renderMarquee(tours.filter((t) => t.location === "Bohol"), "right", 50)}
      </div>

      {/* Zoom Overlay */}
      {zoomed && (
        <div
          onClick={() => setZoomed(null)}
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
            animation: "fadeIn 0.3s ease",
          }}
        >
          <img
            src={zoomed}
            alt="Zoomed Tour"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "20px",
              boxShadow: "0 0 60px rgba(0,229,255,0.5)",
            }}
          />
        </div>
      )}

      <style>{`
        .marquee {
          gap: 30px;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .marquee.scrollLeft { animation-name: scrollLeft; }
        .marquee.scrollRight { animation-name: scrollRight; }
        .marquee:hover { animation-play-state: paused; }
        @keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scrollRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .marquee div:hover {
          transform: scale(1.08);
          box-shadow: 0 25px 60px rgba(0,229,255,0.5), 0 0 30px rgba(0,180,255,0.3);
          background: rgba(255,255,255,0.15);
        }
        ::-webkit-scrollbar { display: none; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* Responsive */
        @media (max-width: 1024px) {
          .marquee div { width: 2200px; height: 300px; }
          h2 { font-size: 1.8rem; }
        }
        @media (max-width: 600px) {
          .marquee div { width: 180px; height: 250px; }
          h2 { font-size: 1.5rem; }
        }
        @media (max-width: 400px) {
          .marquee div { width: 140px; height: 200px; }
          h2 { font-size: 1.2rem; }
        }
      `}</style>
    </section>
  );
}
