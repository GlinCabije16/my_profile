import { useState } from "react";

export default function Certificates() {
  const certificates = [
    {
      title: "Educational Tour",
      caption: "Completed Educational Tour Certificate.",
      image: "/certificates/edu-tour-cert.jpg",
    },
    // Add more certificates here if needed
  ];

  const [zoomedImg, setZoomedImg] = useState(null);

  const toggleZoom = (img) => {
    setZoomedImg((prev) => (prev === img ? null : img));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "80px 20px",
        backgroundImage: "url('/images/background.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",    
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        My Certificates
      </h1>

      {/* Grid Gallery */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {certificates.map((cert, index) => (
          <div
            key={index}
            style={{
              cursor: "pointer",
              textAlign: "center",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
              backgroundColor: "#1e1e1e",
              transition: "transform 0.3s",
            }}
            onClick={() => toggleZoom(cert.image)}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <img
              src={cert.image}
              alt={cert.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "12px 12px 0 0",
                transition: "all 0.3s ease",
              }}
            />
            <h3 style={{ margin: "10px 0 5px 0" }}>{cert.title}</h3>
            <p style={{ fontSize: "0.9rem", color: "#ccc", marginBottom: "10px" }}>
              {cert.caption}
            </p>
          </div>
        ))}
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
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "zoom-out",
          }}
        >
          <img
            src={zoomedImg}
            alt="Zoomed"
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
    </div>
  );
}
