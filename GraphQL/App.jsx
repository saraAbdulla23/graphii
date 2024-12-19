// Import necessary dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as auth from "./functions/login.jsx";
import * as userProfile from "./functions/profile.jsx";
import NotFound from "./components/Error.jsx";

// Define the main component
function MainApp() {
  return (
    <>
      {handleRouting()}
    </>
  );
}

// Routing logic based on the current URL
const baseUrl = "http://localhost:3000";

function handleRouting() {
  const currentPath = window.location.href;
  if (currentPath === baseUrl + "/") {
    return auth.displayLogin();
  } else if (currentPath === baseUrl + "/profile") {
    return userProfile.showProfile();
  } else {
    return <NotFound message="Page Not Found" />;
  }
}

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);

export default MainApp;
