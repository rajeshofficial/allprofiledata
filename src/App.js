import './App.css';
import cover from './images /cover.jpeg'
import profile from './images /profile.avif'
// import React, { useState } from 'react';

const data = {
  contactData: `
BEGIN:VCARD
VERSION:3.0
N:Alex;Decla
ORG:Axel Group
TEL:+44 9999211391 
EMAIL:declan@axlegroup.uk
END:VCARD
`,
  linkData: {
    Instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    website: "https://www.google.com",
  },
};

function App() {
  const showContact = () => {
    const telMatch = data.contactData.match(/TEL:(.+)/);
    if (telMatch) {
      const telNumber = telMatch[1].trim();
      window.location.href = `sms:${telNumber}`;
    }
  };

  const downloadContact = () => {
    const blob = new Blob([data.contactData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contact.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // const callFromContact = () => {
  //   const telRegex = /TEL:(\+?[0-9]+)\b/; // Updated regex to handle optional plus sign
  //   const match = data.contactData.match(telRegex);
  //   if (match && match[1]) {
  //     const phoneNumber = match[1];
  //     const cleanedPhoneNumber = phoneNumber.replace(/\s/g, ''); // Remove spaces
  //     window.location.href = `tel:${cleanedPhoneNumber}`;
  //   } else {
  //     console.log("Phone number not found in vCard data");
  //   }
  // };
  const callFromContact = () => {
    const telRegex = /TEL:(\+?[0-9\s]+)\b/; // Updated regex to handle optional plus sign and spaces
    const match = data.contactData.match(telRegex);
    if (match && match[1]) {
      const phoneNumber = match[1];
      const cleanedPhoneNumber = phoneNumber.replace(/\s/g, ''); // Remove spaces
      window.location.href = `tel:${cleanedPhoneNumber}`;
    } else {
      console.log("Phone number not found in vCard data");
    }
  };
  

  

  return (
    <div className="card">
      <img className="cover-image" src={cover} alt="Scenic landscape" />
      <img className="profile-image" src={profile} alt="Declan, CEO & Founder of Alex Group" />

      <h1>Declan</h1>
      <p className="title">Alex Group's CEO & Founder leads with vision, fostering teamwork and innovation, propelling the company to remarkable success and technological advancement.</p>
      <p>Strathclyde University</p>
      <p className="btns">
        <button onClick={showContact}>Send message</button>
        <a href={data.linkData.website} target="_blank" rel="noopener noreferrer">
          <button>Website</button>
        </a>
        <a href={data.linkData.Instagram} target="_blank" rel="noopener noreferrer">
          <button>Instagram</button>
        </a>
        <a href={data.linkData.linkedin} target="_blank" rel="noopener noreferrer">
          <button>LinkedIn</button>
        </a>
      </p>
      <div className="btns2">
        <button onClick={downloadContact}>Save Contact</button>
        <button onClick={callFromContact}>Call</button>
      </div>
    </div>
  );
}

export default App;
