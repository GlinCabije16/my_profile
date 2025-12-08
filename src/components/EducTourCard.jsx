import { useState } from "react";

export default function EducTourCard({ title, image }) {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => setIsZoomed(!isZoomed);

  return (
    <>
      <div
        onClick={toggleZoom}
        style={{
          cursor: "pointer",
          textAlign: "center",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
          backgroundColor: "#1e1e1e",
          transition: "transform 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "12px 12px 0 0",
            transition: "all 0.3s ease",
          }}
        />
        <h3 style={{ margin: "10px 0 5px 0" }}>{title}</h3>
      </div>

      {/* Zoom Overlay */}
      {isZoomed && (
        <div
          onClick={toggleZoom}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "zoom-out",
            transition: "all 0.3s ease",
          }}
        >
          <img
            src={image}
            alt={title}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "12px",
              boxShadow: "0 0 30px rgba(255,255,255,0.5)",
              transition: "all 0.3s ease",
            }}
          />
        </div>
      )}
    </>
  );
}
