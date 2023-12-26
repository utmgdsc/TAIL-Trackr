import { useState, useEffect } from "react";
import "./Dashboard.css"
import Card from "./Posts-Layout/Card";
import Dropdown from "./Posts-Layout/Dropdown";
import Maps from "./Posts-Layout/Maps"
import { useGeolocated } from "react-geolocated";


export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const postsPerPage = 2;
  const [animalData, setAnimalData] = useState([]);

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

  useEffect(() => {
      // Fetch animal data from the server
      const fetchData = async () => {
          try {
              const response = await fetch("http://127.0.0.1:5000/api/get/all");
              const data = await response.json();
              setAnimalData(data["Received Information"]);
          } catch (error) {
              console.error("Error fetching animal data:", error);
          }
      };

      fetchData();
  }, [animalData]);



    const options = ["All", "Cat", "Dog"]
    const cat_options = ["All", "Abyssinian","Bengal","Birman","Bombay","British_Shorthair","Egyptian_Mau","Maine_Coon","Persian","Ragdoll","Russian_Blue","Siamese","Sphynx"]
    const dog_options = ["All", "Afghan","African Wild Dog","Airedale","American  Spaniel","American Hairless","American Spaniel","Basenji","Basset","Beagle","Bearded Collie","Bermaise","Bichon Frise","Blenheim","Bloodhound","Bluetick","Border Collie","Borzoi","Boston Terrier","Boxer","Bull Mastiff","Bull Terrier","Bulldog","Cairn","Chihuahua","Chinese Crested","Chow","Clumber","Cockapoo","Cocker","Collie","Corgi","Coyote","DOG","Dalmation","Dhole","Dingo","Doberman","Elk Hound","French Bulldog","German Sheperd","Golden Retriever","Great Dane","Great Perenees","Greyhound","Groenendael","Irish Spaniel","Irish Wolfhound","Japanese Spaniel","Komondor","Labradoodle","Labrador","Lhasa","Malinois","Maltese","Mex Hairless","Newfoundland","Pekinese","Pit Bull","Pomeranian","Poodle","Pug","Rhodesian","Rottweiler","Saint Bernard","Schnauzer","Scotch Terrier","Shar_Pei","Shiba Inu","Shih-Tzu","Siberian Husky","Vizsla","Yorkie"]

    

    const [isActiveAnimal, setIsActiveAnimal] = useState(false);
    const [isActiveBreed, setIsActiveBreed] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState("Animal");
    const [selectedBreed, setSelectedBreed] = useState("Breed");
    
    const breed_options = selectedAnimal === 'Cat' ? cat_options : (selectedAnimal === 'Dog' ? dog_options : []);


      // Function to filter data based on selected animal and breed
      const locations = animalData.map(item => ({
        lat: item.latitude,
        lng: item.longitude,
        name: item.breed,
      }));
      console.log(locations)
      
      const filterData = () => {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const slicedData = animalData.slice(startIndex, endIndex);
    
        return slicedData.filter(item => {
            const isAnimalMatch = selectedAnimal === 'All' || selectedAnimal === 'Animal' || item.animal === selectedAnimal;
            const isBreedMatch = selectedBreed === 'All' || selectedBreed === 'Breed' || item.breed === selectedBreed;
    
            return isAnimalMatch && isBreedMatch;
        });
    };
    
      // Get the filtered data
      const filteredData = filterData();
    return (
        <div className="App-Main">
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
            <div className="App-dropdowns">
                <Dropdown options={options} isActive={isActiveAnimal} setIsActive={setIsActiveAnimal} selected={selectedAnimal} setSelected={setSelectedAnimal} />
                <Dropdown options={breed_options} isActive={isActiveBreed} setIsActive={setIsActiveBreed} selected={selectedBreed} setSelected={setSelectedBreed} />
            </div>

            {
              (isActiveAnimal || isActiveBreed)  && (
                <div className="spacing"></div>
              )
            }
            
              <div className="Card-Layout">
            {filteredData.map((item) => (
                <Card className="Card" key={item.id} data={item} />
            ))}
            </div>
          <div className="pagination">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                <span>Page {currentPage}</span>
              <button disabled={currentPage * postsPerPage >= animalData.length} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </div>
            <div className="Map-Layout">
              <Maps locations={locations} myLocationLat={latitude} myLocationLon={longitude} />
            </div>
        </div>
    );
            
}
