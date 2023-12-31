import React from 'react'
import "./Tips.css"

export default function Tips() {
  return (
    <div className='tips-div'>
        <h1 className='tips-title'>Tips: Prevent Losing Pets</h1>
        <div className='tips-divider'>
            <div className='tips-left'>
                <ol className='tips-list'>
                    <li className='tips-description'>
                    Approach with Caution
                    </li>
                    <li className='tips-description'>
                    Assess the Situation
                    </li>
                    <li className='tips-description'>
                    Do Not Force Interaction
                    </li>
                    <li className='tips-description'>
                    Check for Identification
                    </li>
                    <li className='tips-description'>
                    Use Social Media and Local Networks
                    </li>
                    <li className='tips-description'>
                    Contact Local Authorities
                    </li>
                    <li className='tips-description'>
                    Use a form of Tracking ie. AirTag
                    </li>
                </ol>
            </div>
            <div className='tips-right'>
                <img className='tips-img' src='https://www.caninejournal.com/wp-content/uploads/man-dog-owner-is-grieving-sitting-on-a-bench-with-the-lovely-pet-collar-and-deep-weeping-about-animal-loss.jpg.webp' alt='Cat Tips Image' />
            </div>
        </div>

    </div>
  )
}
