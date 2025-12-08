import { useState } from "react";

export default function Journal() {
  const journalEntries = [
    {
      title: "World Tech",
      caption: "My Journal of WorldTech Information Solution in Cebu.",
      image: "/images/worldtechjournal.jpg",
    },
    {
      title: "CodeChump",
      caption: "My Journal of CodeChump in Cebu.",
      image: "/images/codechumjournal.jpg",
    },
    {
      title: "Rivan IT Cebu",
      caption: "My Journal of Rivan IT in Cebu.",
      image: "/images/rivantjournal.jpg",
    },
     {
      title: "Mata",
      caption: "My Journal of Mata Technology in Cebu.",
      image: "/images/matajournal.jpg",
    },
     {
      title: "T.A.R.S.I.E.R. 117",
      caption: "My Journal of T.A.R.S.I.E.R. 177 in Bohol.",
      image: "/images/tarsierjournal.jpg",
    },
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
      <h1 style={{ fontSize: "3rem", marginBottom: "40px", textAlign: "center" }}>
        My Journal
      </h1>
      <p style={{ maxWidth: "700px", textAlign: "center", fontSize: "1.2rem", marginBottom: "40px" }}>
        Welcome! Here, I share my school experiences, reflections, and achievements.
      </p>

      {/* Gallery */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        {journalEntries.map((entry, index) => (
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
            onClick={() => toggleZoom(entry.image)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={entry.image}
              alt={entry.title}
              style={{
                width: "100%",
                height: zoomedImg === entry.image ? "400px" : "200px",
                objectFit: "cover",
                transition: "all 0.3s ease",
              }}
            />
            <h3 style={{ margin: "10px 0 5px 0" }}>{entry.title}</h3>
            <p style={{ fontSize: "0.9rem", color: "#ccc", marginBottom: "10px" }}>{entry.caption}</p>
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
            backgroundColor: "rgba(0,0,0,0.8)",
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
              boxShadow: "0 0 20px rgba(255,255,255,0.5)",
              transition: "all 0.3s ease",
            }}
          />
        </div>
      )}
    </div>
  );
}
