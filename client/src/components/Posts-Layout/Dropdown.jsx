import { set } from 'mongoose';
import React, {useState} from 'react';
import './Dropdown.css';

function Dropdown({ options, isActive, setIsActive, selected, setSelected }){
    // const options = ["Cats", "Dogs"]
    const cat_options = ["Abyssinian","Bengal","Birman","Bombay","British_Shorthair","Egyptian_Mau","Maine_Coon","Persian","Ragdoll","Russian_Blue","Siamese","Sphynx"]
    const dog_options = ["Afghan","African Wild Dog","Airedale","American  Spaniel","American Hairless","American Spaniel","Basenji","Basset","Beagle","Bearded Collie","Bermaise","Bichon Frise","Blenheim","Bloodhound","Bluetick","Border Collie","Borzoi","Boston Terrier","Boxer","Bull Mastiff","Bull Terrier","Bulldog","Cairn","Chihuahua","Chinese Crested","Chow","Clumber","Cockapoo","Cocker","Collie","Corgi","Coyote","DOG","Dalmation","Dhole","Dingo","Doberman","Elk Hound","French Bulldog","German Sheperd","Golden Retriever","Great Dane","Great Perenees","Greyhound","Groenendael","Irish Spaniel","Irish Wolfhound","Japanese Spaniel","Komondor","Labradoodle","Labrador","Lhasa","Malinois","Maltese","Mex Hairless","Newfoundland","Pekinese","Pit Bull","Pomeranian","Poodle","Pug","Rhodesian","Rottweiler","Saint Bernard","Schnauzer","Scotch Terrier","Shar_Pei","Shiba Inu","Shih-Tzu","Siberian Husky","Vizsla","Yorkie"]
    return(
        <div className="dropdown">
            <div className="dropdown-btn" onClick={e => setIsActive(!isActive)}> 
                {selected}
                <span className='fas fa-caret-down'></span>
            </div>
        {isActive && (
            <div className="dropdown-content">
                {options.map(
                    option => (
                    <div onClick={e => {
                        setSelected(option)
                        setIsActive(false)
                    }} 
                    className="dropdown-item">
                        {option}
                    </div>
                    )
                )}
            </div>
        )}
        </div>
    )
}

export default Dropdown;