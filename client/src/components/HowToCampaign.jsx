import React from 'react';
import { Image } from 'react-bootstrap';
import unityFundImage from '../../public/images/UnityFund.png';


const HowToCampaign = () => {
  return (
    <div style={{ fontFamily:'Nunito, sans-serif'}} >
        <div className="about-header">
        <h2 style={{ fontFamily: 'DM Serif Display', textAlign: 'center' }}>How to Set Up Your Campaign</h2>
</div>
<div className="about-content">
      <p>Welcome to UnityFund! Setting up a campaign is easy. Follow these simple steps:</p>
      <ol>
        <li>
          <strong>Create an Account:</strong> If you don't have an account, start by creating one. This will allow you to manage and track your campaigns.
        </li>
        <li>
          <strong>Log In:</strong> Log in to your UnityFund account using your credentials.
        </li>
        <li>
          <strong>Go to Your Dashboard:</strong> Once logged in, navigate to your dashboard. You'll find a button or link labeled "Dashboard" in the navigation menu.
        </li>
        <li>
          <strong>Click on "Start a Campaign":</strong> In your dashboard, look for the "Start a Campaign" button. Click on it to initiate the campaign setup process.
        </li>
        <li>
          <strong>Fill in Campaign Details:</strong> Provide essential details for your campaign, such as the campaign name, goal amount, and a compelling description. You may also be asked to upload images or videos related to your cause.
        </li>
        <li>
          <strong>Set a Fundraising Goal:</strong> Clearly define the financial goal of your campaign. This is the amount you aim to raise from your supporters.
        </li>
        <li>
          <strong>Choose a Timeframe:</strong> Decide on the duration of your campaign. Consider factors like the urgency of your cause and the time you'll need to reach your fundraising goal.
        </li>
        <li>
          <strong>Select a Payment Method:</strong> Choose how you want to receive donations. UnityFund supports various payment methods to make it convenient for your supporters to contribute.
        </li>
        <li>
          <strong>Review and Confirm:</strong> Before finalizing your campaign, review all the information you've provided. Make sure everything is accurate and compelling. Once satisfied, confirm to launch your campaign.
        </li>
        <li>
          <strong>Share Your Campaign:</strong> Spread the word! Use social media, emails, and other channels to share your campaign with friends, family, and your community. The more people who know about your cause, the better chance you have of reaching your goal.
        </li>
      </ol>

      <p>That's it! You've successfully set up your campaign on UnityFund. Thank you for making a positive impact!</p>
      {/* Display the UnityFund.png image */}
<div style={{ textAlign: 'center', margin: '20px' }}>
        <img src={unityFundImage} alt="UnityFund Logo" style={{ width: '850px', height: '350px' }} />
      </div>
    </div>
    </div>
  );
};

export default HowToCampaign;
