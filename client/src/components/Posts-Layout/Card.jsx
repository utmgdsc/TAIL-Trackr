import React from 'react';
import { FaCircle, FaDog } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { FaRocket } from "react-icons/fa"
import { FaSquare } from "react-icons/fa";



import './Card.css';
const Card = ( props ) => {
  return (
    <div className='productList'>
      <div key={props.id} className='productCard'>
        <div className="overlay">{props.data.index+1}</div>

          <img src={props.data.image} alt='' className='animalImage'></img>

          <div className='productCard__content'>
              <h3 className='productName'>{props.data.uploader}</h3>
              
              <div className='displayStack__0'>
                <FaDog classNam="dog_icon" icon="fa-solid fa-paw" />
                <div className='animals-content'>Animal: {props.data.animal}</div>
              </div>
              <div className='displayStack__0'>
                  <FaSquare classNam="dog_icon" icon="fa-solid fa-paw" />
                  <div className='animals-content'>Breed: {props.data.breed}</div>
              </div>
              <div className='displayStack__0'>
                  <FaCircle classNam="dog_icon" icon="fa-solid fa-paw" />
                  <div className='animals-content'>Description: {props.data.userDescription.replace(/,/g, " ")} </div>
              </div>
              <div className='displayStack__0'>
                  <FaPhone classNam="dog_icon" icon="fa-solid fa-paw" />
                  <div className='animals-content'>Phone Number: {props.data.phoneNumber}</div>
              </div>
              <div className='displayStack__0'>
                  <FaRocket classNam="dog_icon" icon="fa-solid fa-paw" />
                  <div className='animals-content'>Distance: {Math.round(props.data.distance * 1000) / 1000}km away </div>
              </div>
          </div>
      </div> 
  </div>
  );
};

export default Card;