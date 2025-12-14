import { useState, useEffect } from "react";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
      setMenuOpen(false); // close menu on mobile
    }
  };

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update active link on scroll
  useEffect(() => {
    const handleScroll = () => {
      let current = "home";
      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= window.innerHeight / 2) {
          current = item.id;
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        padding: "15px 30px",
        zIndex: 200,
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ color: "#fff", margin: 0 }}>My Portfolio</h3>

        {/* Hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontSize: "1.8rem",
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            ☰
          </button>
        )}
      </div>

      {/* Menu */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: isMobile ? "15px" : "0",
          display: isMobile ? (menuOpen ? "flex" : "none") : "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
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
                color: active === item.id ? "#00eaff" : "#fff",
                fontWeight: active === item.id ? "700" : "500",
                cursor: "pointer",
                paddingBottom: "5px",
                borderBottom:
                  active === item.id
                    ? "3px solid #00eaff"
                    : "3px solid transparent",
                transition: "0.3s ease",
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
