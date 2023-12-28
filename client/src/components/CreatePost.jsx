import React, { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import "./CreatePost.css";

function CreatePost() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [selectedAnimalStatus, setSelectedAnimalStatus] = useState(null);
  const [userPhone, setUserPhone] = useState("");
  const [description, setDescription] = useState("");
  const baseURL = "http://127.0.0.1:5000"

  console.log(localStorage.getItem("user"))
  const handleSubmit = async () => {
    setError(null)
    if (selectedImage && latitude && longitude && selectedAnimalStatus && description) {

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

        }

        // uploading all data
        const response = await fetch(baseURL + "/api/upload/", {
            method: "POST",
            // credentials: "include",
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
    event.preventDefault(); // Prevent default form submission behavior
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
    <div className="App-Main">
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
            name="myImage"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
          <button onClick={classify}>Get Features</button>
  
          {/* Geolocation */}
          {!isGeolocationAvailable ? (
            <div>Your browser does not allow location, please enter your location manually:</div>
          ) : !isGeolocationEnabled ? (
            <div>Location is not enabled</div>
          ) : coords ? (
            <div>Location received</div>
          ) : (
            <div>Getting the location data</div>
          )}
        </form>
      </div>
  
      {/* Bottom Form */}
      <div className="bottom-form">
        {/* Animal Status Radio Buttons */}
        <div className="animal-status-radio-buttons">
          <h2>Choose an Option:</h2>
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
            Enter your phone number/email
            <input
              type="text"
              value={userPhone}
              onChange={handlePhoneChange}
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
