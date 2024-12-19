// XPLevelTotal.jsx

import React, { useState, useEffect } from 'react';
import * as fetch from './FetchData.jsx';
import * as XPchart from './XPprogression.jsx';

export default function XPLevelTotal({ userData }) {
  const [levelData, setLevelData] = useState(null);
  const [xpData, setXpData] = useState(null);

  useEffect(() => {
    async function retrieveUserLevelData() {
      try {
        const level = await fetch.retrieveUserLevel(userData.login);
        setLevelData(level);

        const xp = await fetch.retrieveXP();
        setXpData(xp);
      } catch (error) {
        console.log('Error fetching level and XP:', error);
      }
    }

    if (userData) {
      retrieveUserLevelData();
    }
  }, [userData]);

  if (!levelData || !xpData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="xp-level-total-container">
      {/* XP Progression */}
      <div className="xp-chart-container">
        
        <XPchart.XPprogression Data={userData.timeline} />
      </div>

      {/* Level */}
      <div className="user-level">
        <h3>Current Level: {levelData}</h3>
      </div>

      {/* Total XP */}
      <div className="user-xp">
        <h3>Total XP: {xpData}</h3>
      </div>
    </div>

    
  );
}
