import React from 'react';
import './AboutUs.css'; 

const AboutUs = () => {
  return (
    <div>
      <div className="about-header">
        <h2>About Us</h2>
      </div>
      <div className="about-content">
        <p>
          Welcome to UnityFund, where compassion meets action...
        </p>
      </div>
      <div className="mission-header">
        <h2>Our Mission</h2>
      </div>
      <div className="mission-content">
        <p>
          At UnityFund, our mission is clear...
        </p>
      </div>
      <div className="bottom-image">
        {/* Image or additional content goes here */}
      </div>
    </div>
  );
};

export default AboutUs;
