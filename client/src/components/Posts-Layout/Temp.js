import React from 'react';
import './Card.css';
const Card = ({ data }) => {
  return (
    <div className='card-container'>
      <div className='image-container'>
        <img src={data.image} alt='' />
      </div>
      <div className='card-content'>
        <div className='card-title'>
          <h2>{data.name}</h2>
        </div>
        <div className='card-body'>
          <p>{data.specification}</p>
        </div>
        <div className='card-details'>
          <p>Uploader: {data.uploader_name}</p>
          <p>Animal: {data.animal}</p>
          <p>Breed: {data.breed}</p>
          <p>Specification: {data.specification}</p>
          <p>Match Rating: {data.match_rating}</p>
          <p>Star: {data.star}</p>
          <div className='btn'>
            <button>
              <a>
                View More
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
