import React from 'react'
import cover from 'src/images /cover.jpeg'
import profile from 'src/images /profile.avif'
import './App.css';
const data = {
    contactData: `
  BEGIN:VCARD
  VERSION:3.0
  N:Alex;Decla
  ORG:Axel Group
  TEL:+449999211392
  EMAIL:declan@axlegroup.uk
  END:VCARD
  `,
    linkData: {
      Instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      website: "https://www.google.com",
    },
  };
  
 
    const sendMessage = () => {
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
      

const Card = () => {
  return (
    <div>
       <div className="card">
      <img className="cover-image" src={cover} alt="Scenic landscape" />
      <img className="profile-image" src={profile} alt="Declan, CEO & Founder of Alex Group" />

      <h1>Declan</h1>
      <p className="title">Alex Group's CEO & Founder leads with vision, fostering teamwork and innovation, propelling the company to remarkable success and technological advancement.</p>
      <p>Strathclyde University</p>
      <p className="btns">
        <button onClick={sendMessage}>Send message</button>
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
    </div>
  )
 }

export default Card ; 
