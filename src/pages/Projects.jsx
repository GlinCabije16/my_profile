import Card from "../components/Card";

export default function Projects() {
  const projects = [
   {
  title: "BARANGAY INFORMATION SYSTEM",
  description: "A comprehensive Barangay Information System designed to streamline administrative processes, document requests, and resident management for Poblacion, Boston, Davao Oriental.",
  images: [
    "/images/PROJECT1.png",
  ],
  link: "https://github.com/GlinCabije16/Project_BIS",
  type: "project",
},
      {
  title: "Event Scheduler",
  description: "An Event Scheduler application developed using Django, enabling users to efficiently create, manage, and track events through a user-friendly interface.",
  images: [
    "/images/project2.png",
  ],
  link: "https://github.com/GlinCabije16/event_scheduler",
  type: "project",
},
    {
  title: "Mental Health Chatbot",
  description: "A Mental Health Chatbot developed using C#, designed to provide supportive responses and guidance to users through an intuitive chat interface.",
  images: [
    "/images/project3.png",
  ],
  link: "https://github.com/GlinCabije16/MentalHealthChatbot",
  type: "project",
}

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
      <h1 style={{ fontSize: "3rem", marginBottom: "40px" }}>My Projects</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "25px",
          maxWidth: "1200px",
        }}
      >
        {projects.map((p, index) => (
          <Card key={index} {...p} />
        ))}
      </div>
    </div>
  );
}
