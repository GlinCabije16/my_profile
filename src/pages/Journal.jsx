import { useState, useEffect, useRef } from "react";
import { FaFacebookF, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function Journal() {
  const journalByDay = [
    {
      day: "Day 1",
      entries: [
        {
          title: "World Tech",
          subtitle: "WorldTech Information Solution",
          caption: "Professional journal entry on tech innovations.",
          learnings: "My learnings in WorldTech Information Solucton Inc., i that data is very imporatant and must be  protected . I saw how they prioritize cybersecurity by securing their system and limiting access to sensitive Information. This mae me understand that Protecting data is a shared responsibility ad essential to prevent cybe threats.",
          observations: "Base on my experience in WorldTech Information solution Inc., the workplace has a lowkey yet secure environment that make you feel comfortable. The place is calm and chill. Overall it's place where security and a relax vibes come together,creting postive working experience.",
          image: "/images/worldtechjournal.jpg",
        },
      ],
    },
    {
      day: "Day 2",
      entries: [
        {
          title: "CodeChump",
          subtitle: "Cebu Branch",
          caption: "Insights and projects from CodeChump.",
          learnings: "I learned that technology can greatly improve teaching and learning, making lessons more organize and interactive. I realized that even small team can build a system that helpe many schools -and lastly I learned the importance of digital tools in developing student's skills, especially in coding and problem solving",
          observations: "In my Observation, lode Chum is an excellent system. I am impressed that it was created by only three siblings yet is now over 100 chools in the Philippines. It improves efficiency and is a very usedful tools for both teachers and students..",
          image: "/images/codechumjournal.jpg",
        },
        {
          title: "Rivan IT Cebu",
          subtitle: "IT Solutions",
          caption: "Journal documenting Rivan IT’s achievements.",
          learnings: "I learned how important proper systim management and - customer_support are in maintaing vmooth and secure operation in the IT industry.",
          observations: "Rivan IT Cebu has a professional and organized working enyinnment with strong focus on providing quality IT services and support.",
          image: "/images/rivantjournal.jpg",
        },
      ],
    },
    {
      day: "Day 3",
      entries: [
        {
          title: "Mata",
          subtitle: "Technology Provider",
          caption: "Corporate technology solutions journal.",
          learnings:
            "I learned that virtual reality can boost tourism and help people explore destinations online, making travel planning easier and more engaging.",
          observations:
            "Mata Techonology Inc., provides virtual four for real estate and tourist spots in the Philippines, aiming to create virtual maps and promote tounism.",
          image: "/images/matajournal.jpg",
        },
      ],
    },
    {
      day: "Day 4",
      entries: [
        {
          title: "T.A.R.S.I.E.R. 117",
          subtitle: "Emergency Response",
          caption: "Documentation of T.A.R.S.I.E.R. 117 activities.",
          learnings:
            "I learned that importance of quick response, preparedness and teamwork in handling emergencies and protecting people in critical situations.",
          observations:
            "T.A.R.S.I.E.R. 117 provides immediate assistance and rescue Services to tourists in emergency situations, ensuring their rafety and well-being .",
          image: "/images/tarsierjournal.jpg",
        },
      ],
    },
  ];

  const [zoomedImg, setZoomedImg] = useState(null);
  const canvasRef = useRef(null);

  // Floating diamonds background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let diamonds = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Diamond {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 5 + Math.random() * 10;
        this.speed = 0.2 + Math.random() * 0.5;
        this.opacity = 0.05 + Math.random() * 0.15;
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.random() * Math.PI / 4);
        ctx.fillStyle = `rgba(0,255,255,${this.opacity})`;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
        this.y -= this.speed;
        if (this.y < -this.size) this.reset();
      }
    }

    const initDiamonds = () => {
      diamonds = [];
      for (let i = 0; i < 80; i++) diamonds.push(new Diamond());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      diamonds.forEach((d) => d.draw());
      requestAnimationFrame(animate);
    };

    initDiamonds();
    animate();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <section
      id="journal"
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "60px 20px",
        background: "#0b2833",
        fontFamily: "'Roboto', sans-serif",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating diamonds canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* HEADER */}
      <h1
        style={{
          fontSize: "3rem",
          textAlign: "center",
          fontWeight: 700,
          marginBottom: "10px",
          position: "relative",
          zIndex: 1,
        }}
      >
        Professional Journal
      </h1>

      <p
        style={{
          maxWidth: "850px",
          margin: "0 auto 50px",
          textAlign: "center",
          color: "#bbb",
          fontSize: "1.1rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        My Journal Entries from Various Companies
      </p>

      {/* 4-COLUMN RESPONSIVE GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
          gap: "40px",
          width: "100%",
          maxWidth: "1600px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {journalByDay.map((day, i) => (
          <DayColumn key={i} day={day} setZoomedImg={setZoomedImg} />
        ))}
      </div>

      {/* IMAGE ZOOM OVERLAY */}
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
            cursor: "zoom-out",
            zIndex: 9999,
          }}
        >
          <img
            src={zoomedImg}
            alt="Zoomed Journal"
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              borderRadius: "12px",
              boxShadow: "0 0 50px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}

      <style>
        {`
          @keyframes floatCard {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-7px); }
            100% { transform: translateY(0px); }
          }

          .journal-card:hover {
            transform: translateY(-10px) scale(1.03);
            box-shadow: 0 18px 35px rgba(0,0,0,0.35);
          }

          .journal-card:hover .journal-img {
            filter: brightness(1.2);
            transform: scale(1.05);
          }
        `}
      </style>
    </section>
  );
}

/* ========================= */
/* DAY COLUMN */
/* ========================= */
function DayColumn({ day, setZoomedImg }) {
  const isDay2 = day.day === "Day 2";

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        padding: "25px",
        borderRadius: "14px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        backdropFilter: "blur(12px)",
      }}
    >
      <h2
        style={{
          fontSize: "1.7rem",
          color: "#3fa9f5",
          borderBottom: "2px solid #3fa9f5",
          paddingBottom: "6px",
          marginBottom: "20px",
        }}
      >
        {day.day}
      </h2>

      {/* Day 2 → 2 columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isDay2 ? "1fr 1fr" : "1fr",
          gap: "20px",
        }}
      >
        {day.entries.map((entry, j) => (
          <JournalCard
            key={j}
            entry={entry}
            setZoomedImg={setZoomedImg}
            delay={j * 0.15}
          />
        ))}
      </div>
    </div>
  );
}

/* ========================= */
/* JOURNAL CARD */
/* ========================= */
function JournalCard({ entry, setZoomedImg, delay }) {
  return (
    <div
      onClick={() => setZoomedImg(entry.image)}
      className="journal-card"
      style={{
        background: "rgba(255,255,255,0.06)",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        backdropFilter: "blur(16px)",
        transition:
          "transform 0.35s ease, box-shadow 0.35s ease, filter 0.35s ease",
        animation: `floatCard 4s ease-in-out ${delay}s infinite`,
      }}
    >
      <img
        src={entry.image}
        alt={entry.title}
        className="journal-img"
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          transition: "0.35s ease",
        }}
      />

      <div style={{ padding: "16px" }}>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>{entry.title}</h3>
        <h4 style={{ fontSize: "0.9rem", color: "#ccc" }}>{entry.subtitle}</h4>

        <p style={{ fontSize: "0.85rem", marginTop: "8px" }}>{entry.caption}</p>

        <p style={{ fontSize: "0.8rem", marginTop: "10px" }}>
          <strong>Learnings:</strong> {entry.learnings}
        </p>
        <p style={{ fontSize: "0.8rem" }}>
          <strong>Observations:</strong> {entry.observations}
        </p>
      </div>
    </div>
  );
}
