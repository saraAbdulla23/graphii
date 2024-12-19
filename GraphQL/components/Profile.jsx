import React, { useState, useEffect } from "react";
import * as fetch from "./FetchData.jsx";
import * as Identify from "./UserProfile.jsx";
import { AuditRatioGraph } from "./AuditRatioGraph.jsx"; // Import the new graph component
import XPLevelTotal from "./XPLevelTotal.jsx"; // Import the new XP/Level/Total component
import './style.css'; // External CSS for styles

export default function Profile() {
  if (localStorage.getItem("token") === null) {
    window.location.href = "/";
    return;
  }

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchAndSetUserData() {
      try {
        const data = await fetch.retrieveUserDetails();
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAndSetUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-content">
      <div className="nav">
        <button className="LogoutBtn" onClick={Logout}>
          <svg
            viewBox="0 0 512 512"
            width="20px"
            height="20px"
            className="logout-icon"
          >
            <path
              fill="rgba(255, 255, 255, 0.644)"
              d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
            />
          </svg>
          Logout
        </button>
      </div>

      {/* User Information Section */}
      <div className="UserInfo-Container">
        <Identify.UserProfile userData={userData} />
      </div>

      {/* Add the Audit Ratio Graph here */}
      <div className="graphs-container">
        <AuditRatioGraph totalUp={userData.totalUp} totalDown={userData.totalDown} />
        
        {/* Add XP/Level/Total component */}
        <XPLevelTotal userData={userData} />
      </div>
    </div>
  );
}

function Logout() {
  localStorage.removeItem("token");
  window.location.href = "/";
}
