export default function Card({ title, description, images = [], link, type }) {
  return (
    <div
      className="card"
      style={{
        border: "1px solid #ddd",
        borderRadius: "16px",
        padding: "20px",
        margin: "15px",
        width: "300px",
        textAlign: "center",
        boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
        backgroundColor: "#2a2a2a",
        color: "#fff",
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 15px 25px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
      }}
    >
      {/* Images */}
      <div style={{ display: "flex", justifyContent: "center", gap: "5px", marginBottom: "15px" }}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${title} ${idx + 1}`}
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "10px",
              border: "2px solid #fff",
            }}
          />
        ))}
      </div>

      {/* Title */}
      <h3 style={{ margin: "10px 0 8px 0" }}>{title}</h3>

      {/* Description */}
      {description && (
        <p style={{ fontSize: "1rem", lineHeight: "1.5", color: "#ddd" }}>
          {description}
        </p>
      )}

      {/* Project GitHub Link */}
      {type === "project" && link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: "10px",
            color: "#535bf2",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "1rem",
          }}
        >
          View on GitHub
        </a>
      )}
    </div>
  );
}
