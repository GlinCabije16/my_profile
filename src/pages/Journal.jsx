import { useState, useEffect } from "react";

export default function Journal() {
  const journalEntries = [
    { title: "World Tech", subtitle: "WorldTech Information Solution", caption: "Professional journal entry on tech innovations.", image: "/images/worldtechjournal.jpg" },
    { title: "CodeChump", subtitle: "Cebu Branch", caption: "Insights and projects from CodeChump.", image: "/images/codechumjournal.jpg" },
    { title: "Rivan IT Cebu", subtitle: "IT Solutions", caption: "Journal documenting Rivan IT’s achievements.", image: "/images/rivantjournal.jpg" },
    { title: "Mata", subtitle: "Technology Provider", caption: "Corporate technology solutions journal.", image: "/images/matajournal.jpg" },
    { title: "T.A.R.S.I.E.R. 117", subtitle: "Emergency Response", caption: "Documentation of T.A.R.S.I.E.R. 117 activities.", image: "/images/tarsierjournal.jpg" },
  ];

  const [zoomedImg, setZoomedImg] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Trigger staggered animation after mount
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
    id="journal"
      style={{
        width: "100vw",
        minHeight: "100vh",
        padding: "60px 40px",
        background: "linear-gradient(135deg, rgb(255,32,78), rgb(160,21,62), rgb(93,14,65), rgb(0,34,77))",
        fontFamily: "'Roboto', sans-serif",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "5rem", marginBottom: "20px", fontFamily:"-apple-system" }}>Journal</h1>
      <p style={{ maxWidth: "800px", textAlign: "center", marginBottom: "40px", color: "#ccc" }}>
        Explore my journal entries documenting my experiences, reflections, and achievements during my academic and professional journey.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {journalEntries.map((entry, i) => (
          <div
            key={i}
            onClick={() => setZoomedImg(entry.image)}
            style={{
              background: "linear-gradient(145deg, #f5f5f5, #e0e0e0)",
              color: "#222831",
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              transform: loaded ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
              opacity: loaded ? 1 : 0,
              transition: `all 0.6s ease ${i * 0.15}s`, // staggered delay
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.03) rotate(-1deg)";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
            }}
          >
            <img
              src={entry.image}
              alt={entry.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "5px" }}>{entry.title}</h3>
              <h4 style={{ fontSize: "1rem", fontWeight: 500, color: "#555", marginBottom: "10px" }}>{entry.subtitle}</h4>
              <p style={{ fontSize: "0.95rem", color: "#666" }}>{entry.caption}</p>
            </div>
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
            alt="Zoomed Journal"
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              borderRadius: "12px",
              boxShadow: "0 0 40px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}
    </section>
  );
}
