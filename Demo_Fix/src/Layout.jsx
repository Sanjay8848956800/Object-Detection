import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './components/profile';


function Layout({ component }) {
    const [showProfile, setShowProfile] = useState(false);

    // Get the user name from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user ? user[0]?.name : 'Guest';
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const getLinkStyle = (path) => {
        return location.pathname === path ? { fontWeight: 'bold', color: 'yellow' } : { color: 'white' };
    };
    const profileActiveStyle = showProfile ? { border: '2px solid yellow' } : { border: '2px solid blue' };
    return (
        <div className="layout-container">
            <nav style={{
                position: 'fixed',//removeed fixed for content clarity
                top:0,
                zIndex: 1000,
                width: '100vw', 
                display: 'flex', 
                justifyContent: 'space-between',
                 padding: '10px',
                  background: 'blue',
                   color: 'white'
            }} >
                <ul style={{ listStyleType: 'none', display: 'flex', margin: 0, padding: 15, gap: '30px' }} >
                <li 
                        style={{ ...getLinkStyle('/Home'), cursor: 'pointer' }} 
                        onClick={() => handleNavigation('/Home')}
                    >
                        Home
                    </li>
                    <li 
                        style={{ ...getLinkStyle('/AboutUs'), cursor: 'pointer' }} 
                        onClick={() => handleNavigation('/AboutUs')}
                    >
                        About Us
                    </li>
                    <li 
                        style={{ ...getLinkStyle('/Dashboard'), cursor: 'pointer' }} 
                        onClick={() => handleNavigation('/Dashboard')}
                    >
                        Dashboard
                    </li>
                </ul>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        <img
                            onClick={() => setShowProfile(!showProfile)}
                            src="/person.png"
                            alt="Person Icon"
                            className="person-icon"
                            style={{
                                cursor: 'pointer',
                                borderRadius: '50%',
                                height: '40px',
                                width: '40px',
                                ...profileActiveStyle
                            }}
                        />
                    </div>
                    <span
                        onClick={() => setShowProfile(!showProfile)}
                        className="user-name"
                        style={{ marginRight: '60px', cursor: 'pointer', color: showProfile ? 'yellow' : 'white' }}
                    >
                        {userName}
                    </span>
                </div>
                <Profile showProfile={showProfile} onClose={() => setShowProfile(false)} />
            </nav>
            <main className="content">
                {component}
            </main>
        </div>
    );
}

export default Layout;
