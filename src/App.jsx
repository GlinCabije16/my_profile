import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";
import Tours from "./pages/Tours";
import Journal from "./pages/Journal";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certificates" element={<Certificates />} />
           <Route path="/Journal" element={<Journal />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
