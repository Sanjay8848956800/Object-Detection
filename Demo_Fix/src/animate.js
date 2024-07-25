import React, { useEffect } from 'react';

const MyComponent = () => {
  useEffect(() => {
    const section = document.querySelector(".hide-section");
    const formContainer = document.querySelector(".login-container");
    const loginContainer = document.querySelector(".login");
    const profile = document.querySelector("img");

    if (profile) {
      profile.onclick = () => {
        requestAnimationFrame(() => {
          loginContainer.classList.remove("hide-login");
          formContainer.classList.remove("hide-form");

          setTimeout(() => {
            section.classList.remove("hide-section");
          },);
        });
      };
    } else {
      console.error("Profile image not found");
    }
  }, []); // Empty dependency array ensures this runs once after the initial render

  return (
    <div>
      <img src="profile.jpg" alt="Profile" />
      <div className="login-container hide-form">
        <div className="login hide-login">
          {/* login form elements */}
        </div>
      </div>
      <div className="hide-section">
         
      </div>
    </div>
  );
};

export default MyComponent;
