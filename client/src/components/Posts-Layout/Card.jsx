import React from 'react';
import './Card.css';
const Card = ({ data }) => {
  return (
    <div className='Card'>
      <h3>{data.name}</h3>
      <p>Uploader: {data.uploader_name}</p>
      <p>Animal: {data.animal}</p>
      <p>Breed: {data.breed}</p>
      <p>Specification: {data.specification}</p>
      <p>Match Rating: {data.match_rating}</p>
      <p>Star: {data.star}</p>
    </div>
  );
};

export default Card;
