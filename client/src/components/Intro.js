import React from 'react';
import './Intro.css';

function Intro() {
  return (
    <div className="intro-container">
      <h1>Welcome to TailTrackr</h1>
      <p>
        TailTrackr is a web application dedicated to reuniting lost animals with their owners
        and providing shelter for homeless animals.
      </p>
      <p>
        Our mission is to make sure every furry friend has a loving home and that lost pets
        can find their way back to their families.
      </p>
      <h2>Key Features:</h2>
      <ul>
        <li>Search and report lost pets</li>
        <li>Adopt homeless animals from local shelters</li>
        <li>Connect with animal lovers in your community</li>
        <li>Receive alerts about found pets in your area</li>
      </ul>
      <p>
        Join us in our mission to create a world where every animal has a safe and loving place to call home.
      </p>
    </div>
  );
}

export default Intro;
