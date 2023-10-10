import React from 'react'
import "./Features.css"

function Features() {
  return (
    <div className='features-div'>
        <h1 className='features-title'>Features</h1>

        <ol className='features-list'>
            <li className='features-description'>
                Search and report lost pets
            </li>
            <li className='features-description'>
                Adopt homeless animals from local shelters
            </li>
            <li className='features-description'>
                Connect with animal lovers in your community
            </li>
            <li className='features-description'>
                Receive alerts about lost/found pets in your area
            </li>
        </ol>

        <a className='features-slogan'>Join us in our mission to create a world where every animal has a safe and loving place to call home</a>

    </div>

  )
}

export default Features