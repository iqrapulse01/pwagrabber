import React, {useState, useEffect} from "react";
import "../styles/SplashScreenPolys.css";
import partnersImage from "../assets/desktop/partners.png";
import partnersMobileImage from "../assets/mobileview/partner.png";

const SplashScreenPartners = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 786);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 786);
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
        <div className="splash-images-dealopoly">
         <img src={isMobile ? partnersMobileImage : partnersImage} alt="Deal 3" className="splash-image-dealopoly" />
        </div>
    );
}

export default SplashScreenPartners