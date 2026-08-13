import { useState, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TripSearch from './components/TripSearch';
import Stats from './components/Stats';
import FairPriceSection from './components/FairPriceSection';
import AIPlanner from './components/AIPlanner';
import RouteIntelligence from './components/RouteIntelligence';
import VlogIntelligence from './components/VlogIntelligence';
import BudgetBreakdown from './components/BudgetBreakdown';
import SourceConfidence from './components/SourceConfidence';
import Testimonials from './components/Testimonials';
import TravelBlog from './components/TravelBlog';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

const STORAGE_KEY = 'sanchari_user';
function getStoredUser() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; }
}

export default function App() {
  // Shared destination state — drives FairPrice, Routes, Vlogs, AIPlanner
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [user, setUser] = useState(() => getStoredUser());
  const [authOpen, setAuthOpen] = useState(false);

  const handleAuthChange = (newUser) => setUser(newUser);
  const handleSignOut = () => { localStorage.removeItem(STORAGE_KEY); setUser(null); };

  // When destination is selected from TripSearch or AIPlanner, scroll to planner
  const handleDestinationSelect = (dest) => {
    setSelectedDestination(dest);
    // Smooth scroll to the AI planner section
    setTimeout(() => {
      const el = document.getElementById('planner');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div>
      <Navbar user={user} onSignInClick={() => setAuthOpen(true)} onSignOut={handleSignOut} />

      <Hero />

      {/* Destination Selector — drives all other sections */}
      <TripSearch onDestinationSelect={handleDestinationSelect} />

      <Stats />

      {/* Fair Prices — updates based on selected destination */}
      <FairPriceSection destination={selectedDestination} />

      {/* AI Planner — pre-fills destination */}
      <AIPlanner
        selectedDestination={selectedDestination}
        onDestinationSearch={(destName) => {
          // When AIPlanner generates, also sync vlog search
          setSelectedDestination(prev => prev ? { ...prev, name: destName } : { name: destName });
        }}
      />

      {/* Route Intelligence — updates based on selected destination */}
      <RouteIntelligence destination={selectedDestination} />

      {/* Vlog Intelligence — auto-searches based on selected destination */}
      <VlogIntelligence destination={selectedDestination?.name || ''} />

      <BudgetBreakdown />
      <SourceConfidence />
      <Testimonials />
      <TravelBlog />
      <FinalCTA />
      <Footer />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthChange={handleAuthChange}
      />
    </div>
  );
}
