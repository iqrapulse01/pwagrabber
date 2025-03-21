import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import SplashScreen from "./pages/SplashScreen"; // Import splash screen
import Home from "./pages/Home";
import Deals from "./pages/Deals";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DealPages from "./pages/DealPages";
import UrbanEats from "./pages/UrbanEats";
import Mobilopoly from "./pages/Mobilopoly";
import Localopoly from "./pages/Localopoly";
import Dealopoly from "./pages/Dealopoly";
import { Toaster } from "react-hot-toast";
import PartnersSplash from "./pages/Partners";
import DealDetails from "./pages/DealDetails";
import Foodopoly from "./pages/Foodopoly";
import ShopCh from "./pages/ShopCh";
import Partnerlocalopoly from "./pages/PartnerLocalopoly";
import SpinWheel from "./components/SpinWheel";
import ClaimPrize from "./pages/ClaimPrize";
import DealopolyDynasty from "./pages/DealopolyDynasty";
// import ShopCh from "./pa";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 7500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home deferredPrompt={deferredPrompt} />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/deals/:id" element={<DealDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/deal-pages" element={<DealPages />} />
          <Route path="/urban-eats" element={<UrbanEats />} />
          <Route path="/mobilopoly" element={<Mobilopoly />} />
          <Route path="/foodopoly" element={<Foodopoly />} />
          <Route path="/localopoly" element={<Localopoly />} />
          <Route path="/dealopoly" element={<Dealopoly />} />
          <Route path="/dealopoly-dynasty" element={<DealopolyDynasty />} />
          <Route path="/partners" element={<PartnersSplash />} />
          <Route path="/shopch" element={<ShopCh />} />
          <Route path="/partnerlocalopoly" element={<Partnerlocalopoly />} />

          {/* 🔹 Spin Wheel & Prize Claim Routes */}
          <Route path="/spin-wheel" element={<SpinWheel />} />
          <Route path="/claim-prize" element={<ClaimPrize />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
};

export default App;
