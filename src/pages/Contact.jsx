import { FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Contact() {
  return (
    <div
      id="contact"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, rgb(255,32,78), rgb(160,21,62), rgb(93,14,65), rgb(0,34,77))",
        color: "#f6f6f6ff",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        padding: "50px 20px",
        overflow: "hidden",
      }}
    >
      {/* Left-side image */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <img
          src="/images/image.jpg" // replace with your image
          alt="Contact Illustration"
          style={{
            maxWidth: "50%",
            borderRadius: "25% 95% 30% 90%",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            animation: "float 6s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Right-side contact info */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          paddingLeft: "50px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
          Get in Touch
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "400px", lineHeight: "1.6" }}>
          I’m always open to discussing projects, opportunities, or just a friendly hello.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {[
            { icon: <FaEnvelope size={28} />, text: "angeline16cabije@gmail.com" },
            { icon: <FaPhone size={28} />, text: "0951-5527-914" },
            { icon: <FaFacebook size={28} />, text: "Facebook Profile" },
          ].map((contact, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                background: "rgba(255, 255, 255, 0.1)",
                padding: "15px 20px",
                borderRadius: "15px",
                backdropFilter: "blur(8px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                color: "#ffffffff",
                fontWeight: 600,
                width: "50%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
              }}
            >
              {contact.icon} {contact.text}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        @media (max-width: 900px) {
          div#contact {
            flex-direction: column;
          }

          div#contact > div:first-child {
            margin-bottom: 30px;
            padding-left: 0;
          }

          div#contact > div:last-child {
            padding-left: 0;
            align-items: center;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
