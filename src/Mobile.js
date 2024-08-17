// Mobile.js

import React from 'react';
import './Mobile.module.css';

const Mobile = () => {
  return (
    <div className="mobile-container">
      <div className="navbar-95">
        <h1>Hayden Janes</h1>
      </div>

      <div className="mobile-content">
        <p>Welcome to the mobile version of my Win95-themed portfolio.</p>

        {/* Add icons, buttons, or any content you want for the mobile view */}
        <button className="btn btn-primary" onClick={() => window.location.href = 'https://github.com/valley3dprints'}>
          Visit My GitHub
        </button>
      </div>
      
      <div className="mobile-footer">
        <p>© 2024 Hayden Janes</p>
      </div>
    </div>
  );
};

export default Mobile;
