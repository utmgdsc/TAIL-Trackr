import React from 'react';
import { FaDog } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { FaSquare } from "react-icons/fa";



import './Card.css';
const Card = ( props ) => {
  return (
    <div className='productList'>
      <div key={props.id} className='productCard'>
          <img src={props.data.image} alt='' className='animalImage'></img>

          <div className='productCard__content'>
              <h3 className='productName'>{props.data.uploader}</h3>
              
{/* 
              <div className='displayStack__1'>
                  <div className='productPrice'>Animal: {props.data.animal}</div>
                  <div className='productSales'>Breed: {props.data.breed}</div>
              </div> */}
                      {/* const data = {
            image: imageByteCode,
            userEmail: JSON.parse(localStorage.getItem("user")).email,
            location: {latitude: latitude, longitude: longitude},
            animalStatus: selectedAnimalStatus,
            userDescription: description,
            phone: userPhone,
            animal: "Cat",
            breed: "Persian",
            colour: "Black",
            size: "Small",
            weight: "Light"
        } */}
              


              <div className='displayStack__0'>
                <FaDog classNam="dog_icon" icon="fa-solid fa-paw" />
                <div className='animals-content'>Animal: {props.data.animal}</div>
              </div>
              <div className='displayStack__0'>
                  <FaSquare classNam="dog_icon" icon="fa-solid fa-paw" />
                  <div className='animals-content'>Breed: {props.data.breed}</div>
              </div>
              <div className='displayStack__0'>
                  <FaPhone classNam="dog_icon" icon="fa-solid fa-paw" />
                  <div className='animals-content'>Phone Number: {props.data.phoneNumber}</div>
              </div>
          </div>
      </div> 
  </div>
  );
};

export default Card;
