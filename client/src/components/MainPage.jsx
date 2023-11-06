import React, { useEffect } from 'react'
import './MainPage.css'
import Typed from 'typed.js';

function MainPage() {
    
  useEffect(() => {
    // Define options for the Typed.js instance
    const options = {
      strings: [
        "Dedicated to reuniting lost animals with their owners",
        "Providing shelter for homeless animals",
        "Finding new homes for adoptable animals",
      ],
      typeSpeed: 50, // typing speed in milliseconds
      backSpeed: 30, // backspacing speed in milliseconds
      loop: true, // loop the animation
    };

    const typed = new Typed('.main-page-description', options);

    // Clean up on unmount (important to prevent memory leaks)
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className='main-page'>
            <h1 className='main-page-txt-header'>TailTrackR</h1>
            <p className='main-page-description'></p>
            <button className='cta-button'>Get Started</button>
    </div>

  );
}

export default MainPage
