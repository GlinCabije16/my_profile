import { useRef, useState, useEffect } from "react";

export default function Projects() {
  const projects = [
    {
      title: "BARANGAY INFORMATION SYSTEM",
      description: "Streamline requests, resident records, and document processing.",
      images: ["/images/PROJECT1.png"],
      link: "https://github.com/GlinCabije16/Project_BIS",
    },
    {
      title: "Event Scheduler",
      description: "Django-based event planner for scheduling and tracking events.",
      images: ["/images/project2.png"],
      link: "https://github.com/GlinCabije16/event_scheduler",
    },
    {
      title: "Mental Health Chatbot",
      description: "C# application providing supportive chat for well-being.",
      images: ["/images/project3.png"],
      link: "https://github.com/GlinCabije16/MentalHealthChatbot",
    },
  ];

  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(projects.length - 1, i + 1));

  useEffect(() => {
    if (!trackRef.current || !cardRefs.current[currentIndex]) return;
    const card = cardRefs.current[currentIndex];
    const track = trackRef.current;
    const left = card.offsetLeft + card.offsetWidth / 2 - track.offsetWidth / 2;
    track.scrollTo({ left, behavior: "smooth" });
  }, [currentIndex]);

  return (
    <section
      id="projects"
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(135deg, rgb(255,32,78), rgb(160,21,62), rgb(93,14,65), rgb(0,34,77))",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        fontFamily: "'Poppins', sans-serif",
        
        color: "#ffffffff",
      }}
    >

      <div style={{
        display: "flex",
        width: "95%",
        maxWidth: "1400px",
        gap: "50px",
        alignItems: "center",
      }}>
        
        {/* LEFT SECTION */}
        <div style={{ flex: 1, textAlign: "center" }}>
          <h2 style={{
            fontSize: "3.1rem",
            marginBottom: "50px",
            fontWeight: "800",
          }}>
            Featured Projects
          </h2>

          <div style={{ position: "relative" }}>
            <div
              ref={trackRef}
              style={{
                display: "flex",
                gap: "40px",
                overflowX: "hidden",
                paddingBottom: "20px",
              }}
            >
              {projects.map((project, i) => (
                <div
                  key={i}
                  ref={(el) => (cardRefs.current[i] = el)}
                  style={{
                    flex: "0 0 auto",
                    width: "300px",
                   background: "linear-gradient(135deg, rgb(255,32,78), rgb(160,21,62), rgb(93,14,65), rgb(0,34,77))",
                    borderRadius: "18px",
                    overflow: "hidden",
                    border: i === currentIndex ? "2px solid #f5f5f5ff" : "2px solid transparent",
                    transform: i === currentIndex ? "scale(1.07)" : "scale(0.9)",
                    opacity: i === currentIndex ? 1 : 0.5,
                    transition: "all 0.4s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => setCurrentIndex(i)}
                >
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "160px",
                      objectFit: "cover",
                      transition: "0.3s ease",
                    }}
                  />

                  <div style={{ padding: "18px" }}>
                    <h3 style={{ marginBottom: "10px", fontWeight: "700" }}>
                      {project.title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", opacity: 0.85, color: "#fdfdfdff" }}>
                      {project.description}
                    </p>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: "14px",
                        padding: "10px 18px",
                        borderRadius: "10px",
                        background: "#5266ffff",
                        fontWeight: "700",
                        color: "#ffffffff",
                        textDecoration: "none",
                        transition: "0.25s ease",
                      }}
                      onMouseEnter={(e) => e.target.style.background = "#0074e1ff"}
                      onMouseLeave={(e) => e.target.style.background = "#dd0000ff"}
                    >
                      View GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* ARROWS */}
            <button style={arrowStyle("left")} onClick={prev}>⬅</button>
            <button style={arrowStyle("right")} onClick={next}>➜</button>
          </div>
        </div>

        {/* IMAGE RIGHT */}
        <div style={{ flex: 0.7, display: "flex", justifyContent: "center" }}>
          <img
            src="/images/image.jpg"
            alt="Tech"
            style={{
              width: "90%",
              maxHeight: "600px",
              objectFit: "cover",
              borderRadius: "50% 30% 50% 30%",
              filter: "grayscale(20%)",
              transition: "0.5s ease",
            }}
            onMouseEnter={(e) => e.target.style.filter = "grayscale(0%)"}
            onMouseLeave={(e) => e.target.style.filter = "grayscale(20%)"}
          />
        </div>

      </div>

      {/* RESPONSIVE */}
      <style>{`
        @media (max-width: 960px) {
          #projects > div {
            flex-direction: column;
          }
        }
      `}</style>

    </section>
  );
}

const arrowStyle = (side) => ({
  position: "absolute",
  [side]: "-40px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "#ffffffff",
  color: "#222831",
  border: "none",
  padding: "10px 14px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "1.15rem",
  fontWeight: "bold",
  transition: "0.3s ease",
});
