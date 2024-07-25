import React, { useState, useContext } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import UserContext from '../UserContext';

function Profile({ showProfile, onClose }) {
  const { logout } = useAuth();
  const { userDetails, setUserDetails } = useContext(UserContext);

  // State for managing the zoom-in effect
  const [isZooming, setIsZooming] = useState(false);

  const handleImageClick = () => {
    setIsZooming(true);

    // Delay navigation to allow animation to complete
    setTimeout(() => {
      onClose(false); // Close the profile modal
      // Navigate to MainProfile
      window.location.href = '/MainProfile';
    }, 300); // Duration of the zoom-in animation
  };

  const userDataString = localStorage.getItem('user');
  let userData = [];
  try {
    userData = userDataString ? JSON.parse(userDataString) : [];
  } catch (e) {
    console.error('Error parsing user data:', e);
  }

  return (
    <div
      className="profile-modal"
      style={{ display: showProfile ? 'block' : 'none' }}
    >
      <div className="profile-header">
        <Link to="/MainProfile" className="profile-link">
          <img
            src="/profile.png"
            alt="Profile"
            className={`profile-pic ${isZooming ? 'zoom-in' : ''}`}
            onClick={handleImageClick} // Add click handler
          />
          <br></br>
        </Link>
        <h2>Hi {userData.length > 0 && userData[0]?.name}</h2>
      </div>
      <div className="profile-details">
        <p>email:{userData.length > 0 && userData[0]?.email}</p>
      </div>
      <div className="profile-icons">
        <img src="/sync.png" alt="Icon 1" className="icon" />
        <img src="/location.png" alt="Icon 2" className="icon" />
        <img src="/payment.png" alt="Icon 3" className="icon" />
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', }}>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <div className="profile-actions">
        <p>Sync is on</p>
        <p><a href="https://www.entab.in/" target="_blank" rel="noopener noreferrer">Manage your Account</a></p>
      </div>
      <button className="close-button-profile" onClick={() => onClose(false)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
  );
}

export default Profile;
