import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Certificates from "./pages/Certificates";
import Tours from "./pages/Tours";
import Journal from "./pages/Journal";

export default function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Certificates />
      <Tours />
      <Journal />
      <Contact />
    </div>
  );
}
