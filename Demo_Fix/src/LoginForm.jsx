import React from 'react';
import styles from './Login.module.css'; // Import CSS module properly
import './animate.jsx'; // Import your CSS file if needed

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Implement your form submission logic here
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('Email:', email);
    console.log('Password:', password);
    // Example: You can send the form data to a backend server using fetch or Axios
  };

  return (
    <div>
      <div className="main-head">
        <h2><center>Login Page</center></h2>
      </div>
      <div className="login hide-login">
        <form className="login-container hide-form" onSubmit={handleSubmit} action="/login" method="POST">
          <img src="profile.png" alt="Profile" />
          <div className="input-container hide-section">
            <p><input type="email" placeholder="Email" name="email" /></p>
            <p><input type="password" placeholder="Password" name="password" /></p>
            <p><input type="submit" value="Log in" /></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
