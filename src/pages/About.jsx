import Card from "../components/Card";


export default function About() {
  const aboutCards = [
    {
      title: "Hobby",
      description: "I love playing basketball, playing guitar, painting, and exploring technology.",
      images: ["/images/hobby1.jpg","/images/basket.png"],
    },
    {
      title: "Language",
      description: "JAVA, REACT, DJANGO, PYTHON, C#, C++, PHP, JAVASCRIPT.",
      images: ["/images/language.jpg"],
    },
    {
      title: "Education",
      description: "Bachelor in Science in Information Technology at Holy Cross of Davao College.",
      images: ["/images/logo.png"],
    },
  ];

  return (
    
    <div
      style={{
        minHeight: "100vh",
        padding: "80px 20px",
        background: "linear-gradient(135deg, #000000ff, #001d48ff, #7d000fff)",
        color: "#ffffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Side-by-side main section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "50px",
          maxWidth: "1200px",
          marginBottom: "60px",
        }}
      >
        {/* Profile picture */}
        <img
          src="/images/profile.jpg"
          alt="My Profile"
          style={{
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            objectFit: "-moz-initial",
            border: "5px solid #fff",
            boxShadow: "0 8px 15px rgba(0,0,0,0.3)",
          }}
        />

        {/* About Me text */}
        <div style={{ maxWidth: "600px" }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "20px" , fontFamily:'-apple-system'}}>About Me</h1>
          <p
            style={{
              fontSize: "1.25rem",
              lineHeight: "1.8",
              color: "#ffffffff",
              maxWidth: "600px",
              margin: "0 auto",
              textAlign: "left",
              fontFamily: "'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
           <span style={{fontFamily:"-apple-system"}}> Hi! I'm Angeline A. Cabije, a BSIT student at Holy Cross of Davao College, with a passion for learning, exploring new technologies , and building creative web and software projects.<br /><br />
            My technical skills include: </span><span style={{ fontWeight: "600",fontFamily:"-apple-system", color: "#dd1b1bff" }}>Java, REACT, PHP, Django, C#, C++, JavaScript</span>.<span style={{fontFamily:"-apple-system"}}> I enjoy applying these skills to develop projects, solve challenging problems, and collaborate on innovative solutions.<br /><br />
            Outside of academics, I love basketball, playing guitar, painting, discovering new technologies, and sharing knowledge with others.</span>
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
          width: "100%",
          maxWidth: "1200px",
          justifyItems: "center",
        }}
      >
        {aboutCards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
