import React from 'react';
import { Image } from 'react-bootstrap';
import unityFundImage from '../../public/images/UnityFund.png';

const HowToDonate = () => {
  return (
    <div style={{ textAlign: 'center'}}>
        <div className="about-header">
        <h2 style={{ fontFamily: 'DM Serif Display'}}> 
        How to Donate 
        </h2>
        </div>
        <div className="about-content">
      <p>
        Thank you for considering a donation to support a cause that YOU believe in! Your contribution
        helps make a positive impact and create meaningful change. Follow the steps
        below to make a donation securely and effortlessly.
     </p>

     <h3 style={{ background: '#f0f0f0', fontFamily: 'DM Serif Display'}}> Sign Up</h3>
     <p style={{ marginBottom: '4rem', marginTop: '4rem'}}>
       In order to donate you can begin by signing up, this helps to keep track of all the donations you've made as well as let you know how well it is doing etc.
      </p>

      <h3 style={{ background: '#f0f0f0', fontFamily: 'DM Serif Display'}}> Browse </h3>
      <p style={{ marginBottom: '4rem', marginTop: '4rem'}}>
        This is your chance to carefully view all the different campaigns recieving donations.
        Here you can choose which campaigns seems to align with your beliefs and read all about them!

      </p>
      <h3 style={{ background: '#f0f0f0', fontFamily: 'DM Serif Display'}}> Donate </h3>
      <p style={{ marginBottom: '4rem', marginTop: '4rem'}}>
        Each campaign will have a Donate option. Where you will be redirected to imput all of your information regarding payment.
      </p>
      {/* Display the UnityFund.png image */}
<div style={{ textAlign: 'center',  }}>
        <img src={unityFundImage} alt="UnityFund Logo" style={{ width: '850px', height: '350px' }} />
      </div>
     </div>
    </div>
  );
};

export default HowToDonate;
