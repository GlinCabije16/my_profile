import { useState } from "react";

export default function CardCert({ title, images = [] }) {
  const [zoomedImg, setZoomedImg] = useState(null);

  const toggleZoom = (img) => {
    setZoomedImg((prev) => (prev === img ? null : img));
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "15px",
        margin: "10px",
        width: "280px",
        textAlign: "center",
        boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
        backgroundColor: "#1e1e1e",
        color: "#fff",
        cursor: "pointer",
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 12px 20px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
      }}
    >
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`${title} ${idx + 1}`}
          style={{
            width: zoomedImg === img ? "100%" : "80%",
            height: zoomedImg === img ? "280px" : "180px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "8px",
            transition: "all 0.3s ease", // smooth scaling
          }}
          onClick={() => toggleZoom(img)}
        />
      ))}

      <h3 style={{ marginTop: "12px" }}>{title}</h3>
    </div>
  );
}
