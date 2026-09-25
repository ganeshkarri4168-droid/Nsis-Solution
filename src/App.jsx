import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import FloatActions from "./components/FloatActions.jsx";
import Snapshot from "./pages/Snapshot.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Leadership from "./pages/Leadership.jsx";
import Solutions from "./pages/Solutions.jsx";
import HowWeWork from "./pages/HowWeWork.jsx";
import WhyNsis from "./pages/WhyNsis.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/how-we-work" element={<HowWeWork />} />
        <Route path="/why-nsis" element={<WhyNsis />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/snapshot" element={<Snapshot />} />
        <Route path="/principles" element={<Navigate to="/about" replace />} />
        <Route path="/procurement" element={<Navigate to="/services" replace />} />
        <Route path="/engineering" element={<Navigate to="/services" replace />} />
        <Route path="/approach" element={<Navigate to="/how-we-work" replace />} />
        <Route path="/credentials" element={<Navigate to="/why-nsis" replace />} />
      </Routes>
      <Footer />
      <FloatActions />
    </div>
  );
}
