import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { db } from "../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import spinPlaceholder from "../assets/images/1994_spincircle.png";
import { auth } from "../utils/firebaseConfig";
import toast from "react-hot-toast";
import SpinWheel from "../components/SpinWheel";
import logo from "../assets/images/logo.png";
import { FiDownload } from "react-icons/fi";

const Home = () => {
  const prizes = [
    "No Prize",
    "Your Prize",
    "Your Prize 2",
    "Your Prize 3",
    "Your Prize 4",
    "Your Prize 5",
  ];
  const [showPopup, setShowPopup] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showSplash, setShowSplash] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installPromptVisible, setInstallPromptVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the default behavior (which shows the default install prompt)
      e.preventDefault();
      console.log("event is triggred");
      // Save the event so we can trigger it later
      setDeferredPrompt(e);
      // Show the custom install button
      setInstallPromptVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Function to handle when the user clicks the install button
  const handleInstallClick = () => {
    console.log("handle install clicked", deferredPrompt);

    if (deferredPrompt) {
      // Show the install prompt to the user
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        console.log(choiceResult.outcome); // Can be 'accepted' or 'dismissed'
        // Reset the prompt and hide the install button
        setDeferredPrompt(null);
        setInstallPromptVisible(false);
      });
    }
  };

  const handleClosePopup = () => setShowPopup(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("submitting...");
    try {
      await addDoc(collection(db, "users"), {
        name,
        phone,
      });
      toast.success("successfully submitted! 🎉", { id: toastId });
      setName("");
      setPhone("");
      setShowPopup(false);
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("something went wrong...", { id: toastId });
    }
  };

  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const name = user.email.split("@")[0];
      setUsername(name);
    }
  }, []);

  const handleNavigation = (path) => {
    setShowSplash(true);
    setRedirectPath(path);
    setTimeout(() => {
      setShowSplash(false);
      if (path.startsWith("http")) {
        window.location.href = path;
      } else {
        navigate(path);
      }
    }, 5000);
  };

  useEffect(() => {
    setShowPopup(true);
  }, []);

  return (
    <div className="home-container">
      {showSplash && (
        <div className="splash-screen">
          <h2>Loading...</h2>
          <p>Get ready for exclusive deals and rewards!</p>
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div
              className="brand-logo"
              style={{ backgroundImage: `url(${logo})` }}
            ></div>
            <h2 className="brand-title ">Enter Details to Play</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputs">
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Enter phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="popup-buttons">
                <button type="submit" className="submit-bt">
                  Submit
                </button>
                <button
                  className="close-btn"
                  type="reset"
                  onClick={handleClosePopup}
                >
                  Skip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="home-content">
        <h1 className="large rise ">
          Welcome {username ? username : ""} to Deal Grabber
        </h1>

        <h1 className="large rise ">
         Windy City Wheel
        </h1>
        <p>Take a spin on the Windy City Wheel!</p>
        {/* <p>Dealopoly is your super search engine for local offers in your area.</p> */}

        <div className="spin-game">
          <SpinWheel prizes={prizes} />
        </div>
        {/* <FiDownload size={20} /> */}

        <div id="nav-buttons">
          <button onClick={() => navigate("/localopoly")}>Deal Pages</button>
          <button onClick={() => navigate("/dealopoly")}>Deal Dynasty</button>
          <button onClick={() => navigate("/partners")}>Partners</button>
          {/* <button onClick={handleInstallClick}>
            Download to Home Screen
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
