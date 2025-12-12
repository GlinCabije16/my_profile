import { useState, useEffect } from "react";

export default function Navbar() {
  const [active, setActive] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "tours", label: "Tours" },
    { id: "journal", label: "Journal" },
    { id: "certificates", label: "Certificates" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActive(id);
    }
  };

  // Observe sections to update active nav link
  useEffect(() => {
    const handleScroll = () => {
      let current = "home"; // default section
      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top <= window.innerHeight / 2) {
            current = item.id;
          }
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // set initial active section
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        justifyContent: "center",
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
