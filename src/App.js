import './App.css';
import cover from './images /cover.jpeg'
import profile from './images /profile.avif'
// import React, { useState } from 'react';

const contactData = `
BEGIN:VCARD
VERSION:3.0
N:Alex;Decla
ORG:Axel Group
TEL:+44 9999211391 
EMAIL:declan@axlegroup.uk
END:VCARD
`;
const linkData = {
  Instagram : "https://www.instagram.com/",
  linkedin : "https://www.linkedin.com/",
  website: "https://www.google.com",
 
}
function App() {
  // const [displayText, setDisplayText] = useState('Send Messsge');

  const showContact  = () => {
    const telMatch = contactData.match(/TEL:(.+)/);
    if (telMatch) {
      const telNumber = telMatch[1].trim();
      // setDisplayText(telNumber);
      window.location.href = `sms:${telNumber}`;
    } 

  }; 
  
 
  const downloadContact = () => {                                       // This function is called when the "Save Contact" button is clicked
                                                                       // Contact information formatted as a vCard

    // Creating a Blob with the contact data and specifying the MIME type
    const blob = new Blob([contactData], { type: 'text/vcard' });

    // Creating a URL for the Blob to enable downloading
    const url = URL.createObjectURL(blob);

    // Creating a temporary link element for downloading
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contact.vcf'; // Setting the download filename
    document.body.appendChild(link);

    // Simulating a click on the link to trigger the download
    link.click();

    // Removing the temporary link element and releasing the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const callFromContact = () => {
    // Regular expression to match TEL field in vCard
    const telRegex = /TEL:(\+[0-9]+)\b/;

    // Extracting phone number using regular expression
    const match = contactData.match(telRegex);
    if (match && match[1]) {
      const phoneNumber = match[1];
      window.location.href = `tel:${phoneNumber}`;
    } else {
      console.log("Phone number not found in vCard data");
    }
  };

  return (
    <div className="card">
      <img className="cover-image" src={cover} alt="Scenic landscape" />
      <img className="profile-image" src={profile} alt="Declan, CEO & Founder of Alex Group" />

      <h1>Declan</h1>
      <p className="title">CAlex Group's CEO & Founder leads with vision, fostering teamwork and innovation, propelling the company to remarkable success and technological advancement.</p>
      <p>Strathclyde University</p>
      <p className="btns">
        <button onClick={showContact}>{`Send message`}</button>
        <a href={linkData.website} target="_blank" rel="noopener noreferrer">
        <button>Website </button>
        </a>
        <a href={linkData.Instagram} target="_blank" rel="noopener noreferrer">
        <button>Instagram </button>
        </a>
        <a href={linkData.linkedin} target="_blank" rel="noopener noreferrer">
        <button> Linkedin  </button>
        </a>
      </p>
      <div class="btns2">
        <button onClick={downloadContact}> Save Contact</button>
        <button onClick={callFromContact}>Call</button>
      </div>
    </div>
  );
}

export default App;
