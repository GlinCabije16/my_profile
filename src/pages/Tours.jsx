import EducTourCard from "../components/EducTourCard";

export default function Tours() {
  const tours = [
    { title: "Code-chump Cebu Visit", image: "/images/code-chump.jpg" },
    { title: "Tarshier Bohol Tour", image: "/images/tarshier.jpg" },
    { title: "RIVAN IT CEBU VISIT", image: "/images/Rivant IT.jpg" },
    { title: "Loboc River Tour", image: "/images/loboc.jpg" },
    { title: "Chocolate Hills Tour", image: "/images/chocolate hills.jpg" },
    { title: "Santo Nino Church Tour", image: "/images/santo nino cebu.jpg" },
    { title: "Santo Nino Church Tour", image: "/images/santonio.jpg" },
    { title: "Baclayon Church Tour", image: "/images/baclayon.jpg" },
    { title: "Mirror of the World Tour", image: "/images/mirror of the world.jpg" },
    { title: "WorlTech Information Solution", image: "/images/worldtech.jpg" },
    { title: "T.A.R.S.I.E.R. 117", image: "/images/tarsier.jpg" },
    { title: "Man-made Forest Tour", image: "/images/man-made.jpg" },
    { title: "Mactan Shrine Tour", image: "/images/mactan.jpg" },
    { title: "Aloha Beach Tour", image: "/images/aloha.jpg" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "80px 20px",
        background: "linear-gradient(135deg, #000000ff, #001d48ff, #7d000fff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "40px", textAlign: "center" }}>
        Educational Tours
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "25px",
          justifyContent: "center",
        }}
      >
        {tours.map((t, idx) => (
          <EducTourCard key={idx} {...t} />
        ))}
      </div>
    </div>
  );
}
