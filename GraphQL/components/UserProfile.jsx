// UserProfile.jsx
import React from "react";

export function UserProfile({ userData }) {
  return (
    <div className="user-profile">
      <div className="profile-item">
        <strong>Full Name:</strong> {userData.firstName} {userData.lastName}
      </div>
      <div className="profile-item">
        <strong>Email:</strong> {userData.email}
      </div>
      <div className="profile-item">
        <strong>Campus:</strong> {userData.campus}
      </div>
      <div className="profile-item">
        <strong>Campus:</strong> {userData.gender}
      </div>
      
    </div>
  );
}


