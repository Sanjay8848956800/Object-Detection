import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Dashboard from './Dashboard';
import Layout from './Layout';
import AboutUs from './AboutUs';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import MainProfile from './MainProfile';
import SignUp from './SignUp';
import UserContext from './UserContext'; 




const App = () => {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              
              <Layout component={<Home/>} />
              
            }
          />
          <Route
            path="/MainProfile"
            element={
              <ProtectedRoute>
            <Layout component={<MainProfile  />} />
            </ProtectedRoute>
          }/>
          
          <Route
            path="/dashboard"
            element={
    <ProtectedRoute>
                <Layout component={<Dashboard />} />
              </ProtectedRoute>
            }
          />
          <Route path="/aboutus"
           element={
            <ProtectedRoute>
           <Layout component={<AboutUs />} />
           </ProtectedRoute>
           } />
          <Route path="/signup" element={<Layout component={<SignUp />} />} />
        </Routes>
      </AuthProvider>
    </Router>
    </UserContext.Provider>
  );
}
export default App;