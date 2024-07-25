import React from 'react';
import './MainProfile.css';
import './App.jsx';
import profilePicture from './assets/profile.png'; 

const MainProfile = () => {
  const userData = JSON.parse(localStorage.getItem('user')) || [];
  console.log(userData);

  const defaultUser = {
    name: "",
    email: "",
    dateofbirth: "",
    gender: "",
    phoneNumber: "",
      currentAddress: "",
      permanenAddress: "",
      bloodGroup: "",
      identificationMark: "",
      dateofbirth: ""
  };

  const user = userData.length > 0 ? userData[0] : defaultUser;
  console.log(user);

  return (
    <div className='profile-container' style={{marginTop:'60px'}}>
      <div className='profile-header'>
        <img src={profilePicture} alt="profile" className='profile-picture' />
        <h1>{user.name}</h1>
      </div>
      <div className='details-container'>
        <div className='detail-card'>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <div className='detail-card'>
          <p><strong>Date Of Birth:</strong> {user.dateofbirth}</p>
        </div>
        <div className='detail-card'>
          <p><strong>Gender:</strong> {user.gender}</p>
        </div>
        <div className='detail-card'>
          <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
        </div>
        <div className='detail-card'>
          <p><strong>Present Address:</strong> {user.currentAddress}</p>
        </div>
        <div className='detail-card'>
          <p><strong>Residential Address:</strong> {user.permanenAddress}</p>
        </div>
        <div className='detail-card'>
          <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
        </div>
        <div className='detail-card'>
          <p><strong>Identification Mark:</strong> {user.identificationMark}</p>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
