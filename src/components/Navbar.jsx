import { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("home");

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActive(id);
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "tours", label: "Tours" },
    { id: "journal", label: "Journal" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "100%",
        padding: "20px 50px",
        zIndex: 200,
        display: "flex",
        justifyContent: "flex-end",
        background: "rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      }}
    >
      <ul
        style={{
          display: "flex",
          gap: "25px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "1rem",
                color: active === item.id ? "#00eaff" : "#ffffff",
                fontWeight: active === item.id ? "700" : "500",
                cursor: "pointer",
                transition: "0.3s ease",
                paddingBottom: "5px",
                borderBottom: active === item.id ? "3px solid #00eaff" : "3px solid transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00eaff")}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = active === item.id ? "#00eaff" : "#ffffff";
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
