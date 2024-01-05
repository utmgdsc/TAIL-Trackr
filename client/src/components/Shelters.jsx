import React from 'react'
import "./Shelters.css"

function ShelterPost({ shelter }) {
    return (
      <div className='shelter-post'>
        <h2 className='shelter-name'>{shelter.name}</h2>
        <p className='shelter-location'>{shelter.location}</p>
        <a href={shelter.link} target='_blank' rel='noopener noreferrer' className='shelter-link'>
          Visit Shelter Website
        </a>
      </div>
    );
  }

function Shelters() {
    const data = {
        "Brampton": {
            "name": "Brampton Animal Services",
            "location": "475 Chrysler Dr, Brampton, ON L6S 6G3",
            "link": "https://www1.brampton.ca/en/residents/Animal-Services/pages/welcome.aspx"
        }, 
        "Mississauga": {
            "name": "Mississauga Animal Services",
            "location": "735 Central Pkwy W, Mississauga, ON L5C 1T8",
            "link": "http://www.mississauga.ca/portal/residents/animalservices"
        },
        "Toronto": {
            "name": "Toronto Animal Services",
            "location": "146 The East Mall, Etobicoke, ON M8Z 5V5",
            "link": "https://www.toronto.ca/community-people/animals-pets/animal-shelters/"
        },
        "Oakville and Milton": {
            "name": "Oakville and Milton Humane Society",
            "location": "445 Cornwall Rd, Oakville, ON L6J 7S8",
            "link": "http://omhs.ca/"
        },
        "Barrie": {
            "name": "Ontario SPCA Barrie Animal Centre",
            "location": "91 Patterson Rd, Barrie, ON L4N 3V9",
            "link": "https://ontariospca.ca/barrie/"
        },
        "Guelph": {
            "name": "Guelph Humane Society",
            "location": "190 Hanlon Creek Boulevard, Guelph, ON N1C 0A1",
            "link": "http://www.guelphhumane.ca/"
        },
        "Hamilton and Burlington": {
            "name": "Hamilton Burlington SPCA",
            "location": "245 Dartnall Rd, Hamilton, ON L8W 3V9",
            "link": "http://hbspca.com/"
        },
        "Niagara Falls":{
            "name": "Niagara SPCA - Niagara Falls",
            "location": "6025 Chippawa Pkwy, Niagara Falls, ON L2G 0E4",
            "link": "https://www.niagaraspca.com/?utm_source=google%20my%20business%20niagara&utm_medium=organic&utm_campaign=GMB"
        }
    }
    return (
    <div className='shel-main'>
        <h1 className='txt-title'>Popular Shelters</h1>
        <div className='shelter-container'>
            {Object.keys(data).map((key) => (
            <ShelterPost key={key} shelter={data[key]} />
        ))}
      </div>
    </div>

    
  )
}

export default Shelters