import { Link } from "react-router-dom";

export default function Journal() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/images/background.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",    
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" , color: "#ffff", fontFamily: '-apple-system'}}>Welcome to My Portfolio</h1>
    

      <Link
        to="/about"
        style={{
          padding: "12px 24px",
          backgroundColor: "#ffffffff",
          color: "#020202ff",
          fontWeight: "bold",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "1rem",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3f46d1")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffffff")}
      >
        About Me
      </Link>
    </div>
  );
}
