import { useState } from "react";

export default function Contact() {
  const [rating, setRating] = useState(0); // current rating
  const [hover, setHover] = useState(0);   // hover effect
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you! You rated me ${rating} star(s).`);
    setRating(0);
    setEmail("");
    setMessage("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "80px 20px",
            backgroundImage: "url('/images/background.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",    
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "40px", textAlign: "center" }}>
        Contact Me
      </h1>

      <p style={{ fontSize: "1.2rem", marginBottom: "40px", textAlign: "center" }}>
        Email me at: <span style={{ fontWeight: "bold", fontFamily: "-apple-system"}}>angeline16cabije@gmail.com</span>
        <br />Contact No: <span style={{fontFamily: "-apple-system"}}>0951-5527-914</span> 
      </p>
     


      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        {/* Email Input */}
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            fontSize: "1rem",
          }}
        />

        {/* Message */}
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            fontSize: "1rem",
            resize: "vertical",
          }}
        />

        {/* Star Rating */}
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <span style={{ fontWeight: "bold" }}>Rate me:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              style={{
                fontSize: "2rem",
                color: star <= (hover || rating) ? "#FFD700" : "#555",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            fontSize: "1rem",
            fontWeight: "bold",
            backgroundColor: "#535bf2",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
