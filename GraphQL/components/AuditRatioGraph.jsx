import React, { useState, useEffect } from "react";

export function AuditRatioGraph({ totalUp, totalDown }) {
  const [graphData, setGraphData] = useState({ upPercentage: 0, downPercentage: 0 });

  // Calculate the total sum of up and down
  const total = totalUp + totalDown;

  // Calculate the percentages
  const upPercentage = (totalUp / total) * 100;
  const downPercentage = (totalDown / total) * 100;

  // Set the data for animation
  useEffect(() => {
    setGraphData({
      upPercentage,
      downPercentage,
    });
  }, [totalUp, totalDown]);

  // Function to create the stroke-dasharray for SVG circle
  const getStrokeDashArray = (percentage) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    return (circumference * percentage) / 100;
  };

  return (
    <div className="audit-ratio-container">
              <span className="ratio-label">Audits Ratio</span>
      <div className="donut-chart">
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* Background circle (gray) */}
          <circle cx="60" cy="60" r="50" stroke="red" strokeWidth="10" fill="none" />

          {/* Total Down section (red) */}
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="#FF5722"
            strokeWidth="10"
            fill="none"
            strokeDasharray={`${getStrokeDashArray(downPercentage)} 314`}
            strokeDashoffset="25"
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1s ease-out" }}
          />

          {/* Total Up section (green) */}
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="#4CAF50"
            strokeWidth="10"
            fill="none"
            strokeDasharray={`${getStrokeDashArray(upPercentage)} 314`}
            strokeDashoffset="25"
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1s ease-out" }}
          />

          {/* Center Circle */}
          <circle cx="60" cy="60" r="40" fill="white" />

          {/* Displaying Ratio in the center */}
          <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fontSize="18" fill="#4CAF50">
            {(totalUp / totalDown).toFixed(2)}
          </text>
        </svg>
      </div>
      <div className="donut-text">
  <div className="ratio-details">
    <div className="ratio-item">
      {/* Corrected upward arrow for Total Up */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M5 12l7-7 7 7" />
      </svg>
      <div className="ratio-text">
        <span className="label">Done Audits:</span>
        <span className="value">{totalUp}</span>
      </div>
    </div>

    <div className="ratio-item">
      {/* Downward arrow for Total Down */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M19 12l-7 7-7-7" />
      </svg>
      <div className="ratio-text">
        <span className="label">Received Audits:</span>
        <span className="value">{totalDown}</span>
      </div>
    </div>
  </div>
</div>



    </div>
  );
}
