import { useRef, useState, useEffect } from "react";
import { FaCertificate } from "react-icons/fa";

export default function Certificates() {
  const certificates = [
    {
      title: "Educational Tour",
      caption: "Completed Educational Tour Certificate.",
      image: "/certificates/edu-tour-cert.jpg",
    },
 
  ];

  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomedImg, setZoomedImg] = useState(null);
  const [textVisible, setTextVisible] = useState(false);

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(certificates.length - 1, i + 1));

  useEffect(() => {
    // Animate cards into view
    setTimeout(() => setTextVisible(true), 300);

    // Center current card
    if (!trackRef.current || !cardRefs.current[currentIndex]) return;
    const card = cardRefs.current[currentIndex];
    const track = trackRef.current;
    const left = card.offsetLeft + card.offsetWidth / 2 - track.offsetWidth / 2;
    track.scrollTo({ left, behavior: "smooth" });
  }, [currentIndex]);

  return (
    <section
      id="certificates"
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(135deg, rgb(255,32,78), rgb(160,21,62), rgb(93,14,65), rgb(0,34,77))",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 20px",
        fontFamily: "'Poppins', sans-serif",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "95%",
          maxWidth: "1400px",
          gap: "50px",
        }}
      >
        {/* Left Floating Image */}
        <div style={{ flex: 0.4, display: "flex", justifyContent: "center" }}>
          <img
            src="/images/image.jpg"
            alt="Floating Certificate"
            style={{
              width: "100%",
              maxWidth: "350px",
              borderRadius: "25% 75% 50% 50%",
              objectFit: "cover",
              animation: "floatImage 4s ease-in-out infinite alternate",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            }}
          />
        </div>

        {/* Right - Text + Cards */}
        <div style={{ flex: 0.6, display: "flex", flexDirection: "column", gap: "40px" }}>
          {/* Animated Text */}
          <div
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(50px)",
              transition: "opacity 1s ease, transform 1s ease",
            }}
          >
            <h1 style={{ fontSize: "2.8rem", color: "#DFDB8", marginBottom: "15px" }}>
              My Certificates
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#ccc" }}>
              Here are some of the certificates I have earned throughout my learning journey.
            </p>
          </div>

          {/* Cards */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div
              ref={trackRef}
              style={{
                display: "flex",
                gap: "25px",
                overflowX: "hidden",
                justifyContent: "center",
                alignItems: "center",
                perspective: "1500px",
              }}
            >
              {certificates.map((cert, i) => {
                const scale = i === currentIndex ? 1 : 0.85;
                const opacity = i === currentIndex ? 1 : 0.5;
                const rotateY = i === currentIndex ? 0 : i < currentIndex ? -10 : 10;

                return (
                  <div
                    key={i}
                    ref={(el) => (cardRefs.current[i] = el)}
                    onClick={() => setZoomedImg(cert.image)}
                    className="cert-card"
                    style={{
                      flex: "0 0 auto",
                      width: "260px",
                      minHeight: "400px",
                      background: "rgba(255, 255, 255, 0.08)",
                      borderRadius: "15px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.55)",
                      cursor: "pointer",
                      padding: "20px",
                      transition: "transform 0.4s ease, box-shadow 0.6s ease, opacity 0.4s ease",
                      transform: `scale(${scale}) rotateY(${rotateY}deg)`,
                      opacity,
                      position: "relative",
                      zIndex: i === currentIndex ? 10 : 1,
                    }}
                  >
                    <div style={{ marginBottom: "15px", textAlign: "center" }}>
                      <FaCertificate size={36} color="#DFDB8" />
                    </div>

                    <div
                      style={{
                        width: "100%",
                        height: "180px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        marginBottom: "15px",
                        boxShadow: "0 5px 20px rgba(0,0,0,0.5)",
                      }}
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                        }}
                      />
                    </div>

                    <h3 style={{ fontSize: "1.2rem", color: "#DFDB8", marginBottom: "5px", textAlign: "center" }}>
                      {cert.title}
                    </h3>
                    <p style={{ fontSize: "0.95rem", color: "#ccc", textAlign: "center" }}>
                      {cert.caption}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Arrow Buttons */}
            <button onClick={prev} style={arrowStyle("left")}>◀</button>
            <button onClick={next} style={arrowStyle("right")}>▶</button>
          </div>
        </div>
      </div>

      {/* Zoom Overlay */}
      {zoomedImg && (
        <div
          onClick={() => setZoomedImg(null)}
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
            zIndex: 9999,
            cursor: "zoom-out",
          }}
        >
          <img
            src={zoomedImg}
            alt="Zoomed Certificate"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "12px",
              boxShadow: "0 0 40px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes floatImage {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .cert-card:hover {
          transform: scale(1.07);
          box-shadow:
            0 25px 50px rgba(0,0,0,0.6),
            0 0 40px rgba(255,32,78,0.5),
            0 0 80px rgba(160,21,62,0.4);
          transition: transform 0.6s ease, box-shadow 1.2s ease;
        }
      `}</style>
    </section>
  );
}

const arrowStyle = (side) => ({
  position: "absolute",
  [side]: "-45px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "#DFDB8",
  border: "none",
  padding: "10px 14px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "rgb(93,14,65)",
  transition: "0.3s ease",
});
