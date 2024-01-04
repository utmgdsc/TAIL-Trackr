import React, { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import "./CreatePost.css";
import { useSelector } from "react-redux";
import MyList from "./MyList";

function CreatePost() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [selectedAnimalStatus, setSelectedAnimalStatus] = useState(null);
  const [userPhone, setUserPhone] = useState("");
  const [description, setDescription] = useState("");
  const [breed, setBreed] = useState("");
  const [animal, setAnimal] = useState("");
  const baseURL = "http://127.0.0.1:5000"
  // const email = JSON.parse(useSelector((state) => state.user.value)).email
  const email = "inaam"

  console.log(email)
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  const handleSubmit = async () => {
    setError(null)

    if (!phoneRegex.test(userPhone)) {
      setError("Please enter a valid phone number in the format XXX-XXX-XXXX");
      return;
    }

    if (selectedImage && latitude && longitude && selectedAnimalStatus && description) {
        if (!breed) {
          await classify();
          if (!breed) {
            return;
          }
        }

        // converting to bytes
        const imageByteCode = await getBase64(selectedImage);

        if (!imageByteCode) {
            return
        }

        // "_id": uuid.uuid4().hex,
        // "uploader": data["data"]["userEmail"],
        // "image": data["data"]["image"],
        // "latitude": data["data"]["location"]["latitude"],
        // "longitude": data["data"]["location"]["longitude"],
        // "animalStatus": data["data"]["animalStatus"],
        // "userDescription": data["data"]["userDescription"],
        // "phoneNumber": data["data"]["phone"],
        // "animal": data["data"]["animal"],
        // "breed": data["data"]["breed"],
        // "colour": data["data"]["colour"],
        // "size": data["data"]["size"],
        // "weight": data["data"]["weight"]

        // combining form data
        const data = {
            image: imageByteCode,
            userEmail: email,
            location: {latitude: latitude, longitude: longitude},
            animalStatus: selectedAnimalStatus,
            userDescription: description,
            phone: userPhone,
            animal: animal,
            breed: breed
        }

        // uploading all data
        const response = await fetch(baseURL + "/api/upload/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data })
        });
    
        const json = await response.json();

        // if the response is bugged, output the error with it
        if (!response.ok) {
            setError(json.error)
        }
        else {
            console.log(json)
        }
    }
  };
  
const classify = async (event) => {
    if (!selectedImage) {
      return;
    }

    event.preventDefault();
    setError(null)
      // converting to bytes
      const imageByteCode = await getBase64(selectedImage);
      
      if (!imageByteCode) {
          return
      }

      // combining form data
      const data = {
          image: imageByteCode
      }
      console.log(imageByteCode)

      // uploading all data
      const response = await fetch(baseURL + "/api/classify/", {
          method: "POST",
          //credentials: "include",
          headers: {
              "Content-Type": "application/text",
          },
          body: JSON.stringify({ data })
      });
      
      const json = await response.json();

      // if the response is bugged, output the error with it
      if (!response.ok) {
          setError(json.error)
      }
      else {
          if (json['Breed'] == null) {
            alert("Enter a dog or cat")
            setSelectedImage(null)
          } else {
            if (description != ""){
              setDescription(description + ", " + json['Features'])
            } else {
              setDescription(json['Features'])
            }
            setBreed(json['Breed'])
            setAnimal(json["Animal"])
          }
      }
  };

    // converting data to b64
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                console.error("Error converting image to base64:", error);
                reject(error);
            };
        });
    };
  

  // handling changes
  const handleAnimalStatusChange = (event) => {
    setSelectedAnimalStatus(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setUserPhone(event.target.value);
  }

  // tracking geolocation
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 3000,
  });

  useEffect(() => {
    if (coords) {
      setLongitude(coords.longitude);
      setLatitude(coords.latitude);
    }
  }, [coords]);

  return (
    <div className="App-Main1">
      {/* Top Form */}
      <div className="top-form">
        {error && <div className="error-message">The following error has occurred: {error}</div>}
        <h1>Upload Image of Animal Here</h1>
        <form>
          <div className="image-preview">
            {selectedImage && (
              <div>
                <img
                  alt="not found"
                  className="Image-feature"
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
              </div>
            )}
          </div>
          <input
            type="file"
            className="file-inp"
            name="myImage"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
          {/* <label for="imageInput" className="file-label">
              Choose Image
         </label> */}
          <button className="btn-class" onClick={classify}>Get Features</button>
          {/* Geolocation */}
          {!isGeolocationAvailable ? (
            <div>Your browser does not allow location, please enter your location manually:</div>
          ) : !isGeolocationEnabled ? (
            <div className="loc-dis">Location is not enabled</div>
          ) : coords ? (
            <div className="loc-en">Location received</div>
          ) : (
            <div>Getting the location data</div>
          )}
        </form>
      </div>
  
      {/* Bottom Form */}
      <div className="bottom-form">
        {/* Animal Status Radio Buttons */}
        <div className="animal-status-radio-buttons">
          <h2>Animal Status:</h2>
          <div className="animals-stat">
          <label>
            <input
              type="radio"
              value="Lost"
              checked={selectedAnimalStatus === "Lost"}
              onChange={handleAnimalStatusChange}
            />
            Lost
          </label>
          <label>
            <input
              type="radio"
              value="Stray"
              checked={selectedAnimalStatus === "Stray"}
              onChange={handleAnimalStatusChange}
            />
            Stray
          </label>
          <label>
            <input
              type="radio"
              value="Don't Know"
              checked={selectedAnimalStatus === "Don't Know"}
              onChange={handleAnimalStatusChange}
            />
            Don't Know
          </label>
          </div>
        </div>
  
        {/* Additional Information */}
        <div className="additional-info">
          <label>
            Enter additional information which would help a user find their animal (i.e. where you found it, if it has a collar or not...):
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
            />
          </label>
  
          <label>
            Enter your Phone Number (XXX-XXX-XXXX)
            <input
              type="text"
              value={userPhone}
              onChange={handlePhoneChange}
              className={error ? "error-input" : ""} // Apply the class conditionally

            />
          </label>
        </div>
      </div>
  
      {/* Submit Button */}
      <button className="btn-sub" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreatePost;
