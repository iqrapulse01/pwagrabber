import React, {useState, useEffect} from "react";
import "../styles/SplashScreenPolys.css";
import image1 from "../assets/images/black-couple.jpg"; // Add actual image paths
import dealopolyImage from "../assets/desktop/dealopoly.png";
import dealopolyMobileImage from "../assets/mobileview/dealopoly.png";
import image3 from "../assets/newedit/dealpageslogo.png";
import dealPagesMobileImage from "../assets/mobileview/dealpages.png";

const SplashScreenDealPages = ({dealopoly}) => {

   const [isMobile, setIsMobile] = useState(window.innerWidth < 786);
  
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 786);
      window.addEventListener("resize", handleResize);
      
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    
  return (
        <div className="splash-images-dealopoly">
         {dealopoly ? <img src={isMobile ?  dealopolyMobileImage : dealopolyImage} alt="Deal 3" className="splash-image-dealopoly" />: <img src={isMobile? dealPagesMobileImage : image3} alt="Deal 2" className="splash-image-dealopoly"/>}
        </div>
    );
}

export default SplashScreenDealPages