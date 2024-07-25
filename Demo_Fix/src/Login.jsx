import React, { useState, useEffect, useContext } from 'react';
import userAxios from './Config/config'; 
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import UserContext from './UserContext';

const Login = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const { userDetails, setUserDetails } = useContext(UserContext);

  const handleLogin = async (email, password) => {
    try {
        const response = await userAxios.post('/login', { email, password });
        if (response.data.message === 'exists') {
            localStorage.setItem('userEmail', email);
        } else {
            // Handle login failure
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    console.log('Email:', email);
    console.log('Password:', password);

    try {
      let result = await userAxios.post('/login', { email, password });

      if (result.data.message === 'exists') {
        console.log(result.data.message);
        alert('Login success');
        navigate('/home');
      }

      setUserDetails(result.data.userDetails);
      localStorage.setItem('user', JSON.stringify(result.data.userDetails));
      localStorage.setItem('isAuthenticated', true);
      
      if (result.data.message === 'not exists') {
        alert('You Need to Sign Up');
        navigate('/SignUp');
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles['login-card-container']}>
      <div className={styles['login-card']}>
        <h2 className={styles['login-card-heading']}>Login</h2>
        <form className={styles['login-card-form']} onSubmit={handleSubmit} action="/login" method="POST">
          <div className={styles['login-card-input-container']}>
            <p><input type="email" placeholder="Email" name="email" className={styles['login-card-input']} /></p>
            <p><input type="password" placeholder="Password" name="password" className={styles['login-card-input']} /></p>
            <p><input type="submit" value="Log in" className={styles['login-card-button']} /></p>
          </div>
          <button className={styles['login-card-signup-button']} onClick={() => navigate('/SignUp')}>Create Account</button>
        </form>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
