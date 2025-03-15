import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "../styles/DealDetails.css"
import toast from "react-hot-toast";


const DealDetails = () => {
  const { id } = useParams();
  const [deal, setDeal] = useState(null);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const docRef = doc(db, "deals", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDeal(docSnap.data());
        } else {
          console.error("Deal not found");
        }
      } catch (error) {
        console.error("Error fetching deal:", error);
      }
    };

    fetchDeal();
  }, [id]);


  const handleClaimDeal = () => {
    toast.success(`You have claimed ${deal.name} deal! 🎉`); 
  };

  if (!deal) {
    return <p>Loading...</p>;
  }

  return (
    <div className="deal-details">
      <img src={deal.image} alt={deal.name} className="deal-image" />
      <h1 className="deal-title">{deal.name}</h1>
      <p className="deal-description">{deal.description}</p>
      <button className="claim-deal-button" onClick={handleClaimDeal}>
        Claim Deal
      </button>
    </div>

    
  );
};

export default DealDetails;
