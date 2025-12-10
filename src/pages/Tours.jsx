import { useState } from "react";

export default function ToursSlider() {
  const tours = [
    { title: "Code-chump Cebu Visit", image: "/images/code-chump.jpg" },
    { title: "Tarshier Bohol Tour", image: "/images/tarshier.jpg" },
    { title: "RIVAN IT CEBU VISIT", image: "/images/Rivant IT.jpg" },
    { title: "Loboc River Tour", image: "/images/loboc.jpg" },
    { title: "Chocolate Hills Tour", image: "/images/chocolate hills.jpg" },
    { title: "Santo Nino Church Tour", image: "/images/santonio.jpg" },
    { title: "Baclayon Church Tour", image: "/images/baclayon.jpg" },
    { title: "Mirror of the World Tour", image: "/images/mirror of the world.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const nextSlide = () => currentIndex < tours.length - 1 && setCurrentIndex((i) => i + 1);
  const prevSlide = () => currentIndex > 0 && setCurrentIndex((i) => i - 1);

  return (
    <section
      id="tours"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, rgb(255,32,78), rgb(160,21,62), rgb(93,14,65), rgb(0,34,77))",
        padding: "50px 20px",
        fontFamily: "'Poppins', sans-serif",
        color: "#ffffffff",
        position: "relative",
      }}
    >
      {/* Slider Container */}
      <div
        style={{
          width: "90%",
          maxWidth: "1200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          position: "relative",
        }}
      >
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          style={arrowStyle("left", currentIndex === 0)}
        >
          ◀
        </button>

        {/* Cards Wrapper */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", perspective: "1200px" }}>
          {tours.map((tour, i) => {
            const offset = i - currentIndex;
            const scale = i === currentIndex ? 1 : 0.8;
            const opacity = i === currentIndex ? 1 : 0.5;
            const rotateY = offset * 15;

            return (
              <div
                key={i}
                onClick={() => setZoomed(true)}
                style={{
                  position: offset === 0 ? "relative" : "absolute",
                  left: offset * 50 + "px",
                  width: "300px",
                  height: "450px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "20px",
                  boxShadow: "0 15px 50px rgba(0,0,0,0.6)",
                  cursor: "pointer",
                  padding: "10px",
                  transition: "transform 0.5s ease, opacity 0.5s ease, box-shadow 0.5s ease",
                  transform: `translateX(${offset * 60}px) scale(${scale}) rotateY(${rotateY}deg)`,
                  opacity,
                  zIndex: i === currentIndex ? 10 : 1,
                }}
                className="tour-card"
              >
                <img
                  src={tour.image}
                  alt={tour.title}
                  style={{
                    width: "100%",
                    height: "80%",
                    objectFit: "cover",
                    borderRadius: "15px",
                    marginBottom: "10px",
                    transition: "transform 0.5s, box-shadow 0.5s",
                  }}
                />
                <h3
                  style={{
                    color: "#DFDB8",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: "1.2rem",
                  }}
                >
                  {tour.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          disabled={currentIndex === tours.length - 1}
          style={arrowStyle("right", currentIndex === tours.length - 1)}
        >
          ▶
        </button>
      </div>

      {/* Zoom Overlay */}
      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(255, 255, 255, 0.95)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "zoom-out",
            zIndex: 9999,
          }}
        >
          <img
            src={tours[currentIndex].image}
            alt="Zoomed Tour"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "15px",
              boxShadow: "0 0 60px rgba(255,32,78,0.6)",
              transition: "transform 0.3s",
            }}
          />
        </div>
      )}

      {/* Card Hover Glow */}
      <style>{`
        .tour-card:hover {
          transform: scale(1.08) rotateY(0deg);
          box-shadow: 0 20px 50px rgba(255,32,78,0.4), 0 0 30px rgba(160,21,62,0.3);
          transition: transform 0.7s ease, box-shadow 1s ease;
        }
      `}</style>
    </section>
  );
}

// Arrow button styling
// Arrow button styling
const arrowStyle = (side, disabled) => ({
  position: "absolute",
  [side]: "-60px", // move outside of the slider container
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "2rem",
  background: "#DFDB8",
  border: "none",
  borderRadius: "50%",
  cursor: disabled ? "not-allowed" : "pointer",
  color: "rgb(93,14,65)",
  opacity: disabled ? 0.3 : 1,
  fontWeight: "bold",
  zIndex: 999, // make sure it's above everything
  transition: "all 0.3s ease",
});
