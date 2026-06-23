import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "./context/TranslationContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HistoryTimeline from "./components/HistoryTimeline";
import MatchCenter from "./components/MatchCenter";
import Squad from "./components/Squad";
import News from "./components/News";
import Legends from "./components/Legends";
import Staff from "./components/Staff";
import Ambiance from "./components/Ambiance";
import Footer from "./components/Footer";
import IntroLoader from "./components/IntroLoader";



// Main Home Page Component
const HomeShowcase = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col justify-between"
    >
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <HistoryTimeline />
        <MatchCenter />
        <Squad />
        <News />
        <Legends />
        <Staff />
        <Ambiance />
      </main>
      <Footer />
    </motion.div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Keyboard accessibility helper: Add outline only on tab, hide on click
  useEffect(() => {
    const handleFirstTab = (e) => {
      if (e.key === "Tab") {
        document.body.classList.add("user-is-tabbing");
        window.removeEventListener("keydown", handleFirstTab);
      }
    };
    window.addEventListener("keydown", handleFirstTab);
    return () => window.removeEventListener("keydown", handleFirstTab);
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <IntroLoader key="loader" finishLoading={() => setIsLoading(false)} />
        ) : (
          <Routes key="app-content">
            <Route path="/" element={<HomeShowcase />} />
          </Routes>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
