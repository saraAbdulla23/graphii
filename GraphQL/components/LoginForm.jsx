import React, { useState } from 'react';
import './login.css'; // External CSS for styles

function LoginPage() {
  const [loginError, setLoginError] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    submitLogin(username, password, setLoginError);
  };

  return (
    <div className="login-container">
      <form className="login-form" method="POST" onSubmit={handleFormSubmit}>
        <h1 className="login-heading">Reboot 01</h1>
        {loginError && <p className="error-message">{loginError}</p>}

        <div className="input-container">
          <svg
            viewBox="0 0 16 16"
            fill="white"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            className="input-icon"
          >
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input
            placeholder="Email or Username"
            id="username"
            className="input-field"
            type="text"
            required
          />
        </div>

        <div className="input-container">
          <svg
            viewBox="0 0 16 16"
            fill="white"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            className="input-icon"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            placeholder="Password"
            id="password"
            className="input-field"
            type="password"
            required
          />
        </div>

        <button className="login-button" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

async function submitLogin(username, password, setLoginError) {
  const authHeader = `${username}:${password}`;
  const encodedAuth = btoa(authHeader);

  try {
    const response = await fetch("https://learn.reboot01.com/api/auth/signin", {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedAuth}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      storeToken(responseData);
      window.location.href = "/profile";
    } else {
      setLoginError("Invalid username or password.");
    }
  } catch (error) {
    setLoginError("Connection error, please try again later.");
  }
}

function storeToken(token) {
  localStorage.setItem("token", token);
}
