import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './SignUp.css';
import userAxios from './Config/config'; 


const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateofbirth:'',
    password: '',
    gender: '',
    currentAddress: '',
    permanentAddress: '',
    bloodGroup: '',
    pincode: '',
    alternativeNumber: '',
    identificationMark: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Use navigate instead of useHistory

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData({
      ...formData,
      [name]: value
    });
  };

  console.log(formData)

  const handleSubmit =async(e) => {
    e.preventDefault();
    try {
        const { password, confirmPassword,name,email, mobileNumber,gender,currentAddress,permanentAddress,bloodGroup,pincode,alternativeNumber,identificationMark } = formData;

        if (password !== confirmPassword) {
          alert('Passwords do not match');
        } else {
             
            let result = await userAxios.post('/SignUp',formData)//backend
            if(result.data.message==='created'){

                alert('Success');
                navigate('/'); // Redirect to home page
            }
          // You can also make an API call here to register the user
        }

    } catch (error) {
        console.log(error)
    }

  };

  return (
    <div className='formal'>
        <div>
      <h1 >Signup Page</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
          style={{width:'93%',height:'35px'}}
            type="date"
            name="dateofbirth"
            value={formData.dateofbirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label>Current Address:</label>
        <input type="text" 
        name="currentAddress" 
        value={formData.currentAddress} onChange={handleChange} required />
      </div>
      <div>
        <label>Permanent Address:</label>
        <input type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required />
      </div>
      <div>
        <label>Blood Group:</label>
        <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required />
      </div>
      <div>
        <label>Pincode:</label>
        <input type="number" name="pincode" value={formData.pincode} onChange={handleChange} required />
      </div>
      <div>
        <label>Alternative Number:</label>
        <input type="tel" name="alternativeNumber" value={formData.alternativeNumber} onChange={handleChange} required />
      </div>
      <div>
        <label>Identification Mark:</label>
        <input type="text" name="identificationMark" value={formData.identificationMark} onChange={handleChange} required />
      </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
};

export default SignUp;
