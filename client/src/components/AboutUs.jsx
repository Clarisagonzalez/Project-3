import React from 'react';
import { Image } from 'react-bootstrap';
import unityFundImage from '../../public/images/UnityFund.png';

const AboutUs = () => {
  return (
        <div style={{ textAlign: 'center', }}>
     <div className="about-header">
      <h2 style={{ fontFamily: 'DM Serif Display'}}>
        About Us
        </h2>
        </div>
        <div className="about-content">
         <p>
            Welcome to UnityFund, where compassion meets action! We are not just an online 
            fundraising platform; we are a movement dedicated to empowering individuals 
            and organizations to create positive change through impactful campaigns. Together, 
            Let's Empower Change. Join UnityFund Today!
        </p>
        </div>
        <div className="mission-header">
         <h2 style={{ fontFamily: 'DM Serif Display'}}> Our Mission</h2>
         </div>
         <div className="mission-content">
          <p>
            At UnityFund, our mission is clear - to provide a dynamic and seamless platform 
            for individuals and organizations to effortlessly create and manage 
            donation campaigns. We believe in fostering a community of generosity
             where causes can thrive and individuals can make a real difference.
          </p>
      {/* Display the UnityFund.png image */}
<div style={{ textAlign: 'center', margin: '20px' }}>
        <img src={unityFundImage} alt="UnityFund Logo" style={{ width: '850px', height: '350px' }} />
         </div>
         </div>
      
    </div>
  );
};

export default AboutUs;
