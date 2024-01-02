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
      const filteredAndSortedData = filterData();
    }
  }, [coords]);

  useEffect(() => {
      // Fetch animal data from the server
      const fetchData = async () => {
        setIsLoading(true);   
        try {
              const response = await fetch("http://127.0.0.1:5000/api/get/all");
              const data = await response.json();
              console.log(data);
              setAnimalData(data["Received Information"]);
          } catch (error) {
              console.error("Error fetching animal data:", error);
          }
        finally {
          setIsLoading(false);
        }
      };

      fetchData();
  }, [animalData]);



    const options = ["All", "Cat", "Dog"]
    const cat_options = ["All", "Abyssinian","Bengal","Birman","Bombay","British_Shorthair","Egyptian_Mau","Maine_Coon","Persian","Ragdoll","Russian_Blue","Siamese","Sphynx"]
    const dog_options = ["All", "Afghan","African Wild Dog","Airedale","American  Spaniel","American Hairless","American Spaniel","Basenji","Basset","Beagle","Bearded Collie","Bermaise","Bichon Frise","Blenheim","Bloodhound","Bluetick","Border Collie","Borzoi","Boston Terrier","Boxer","Bull Mastiff","Bull Terrier","Bulldog","Cairn","Chihuahua","Chinese Crested","Chow","Clumber","Cockapoo","Cocker","Collie","Corgi","Coyote","DOG","Dalmation","Dhole","Dingo","Doberman","Elk Hound","French Bulldog","German Sheperd","Golden Retriever","Great Dane","Great Perenees","Greyhound","Groenendael","Irish Spaniel","Irish Wolfhound","Japanese Spaniel","Komondor","Labradoodle","Labrador","Lhasa","Malinois","Maltese","Mex Hairless","Newfoundland","Pekinese","Pit Bull","Pomeranian","Poodle","Pug","Rhodesian","Rottweiler","Saint Bernard","Schnauzer","Scotch Terrier","Shar_Pei","Shiba Inu","Shih-Tzu","Siberian Husky","Vizsla","Yorkie"]
    const [num, setNum] = useState(1);
    

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

      function haversineDistance(coord1, coord2) {
        // Radius of the Earth in kilometers
        const R = 6371.0;
    
        // Convert latitude and longitude from degrees to radians
        const [lat1, lon1] = coord1.map(deg => deg * (Math.PI / 180));
        const [lat2, lon2] = coord2.map(deg => deg * (Math.PI / 180));
    
        // Differences in coordinates
        const dlat = lat2 - lat1;
        const dlon = lon2 - lon1;
    
        // Haversine formula
        const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        // Calculate the distance
        const distance = R * c;
    
        return distance;
    }
      
    const filterData = () => {
      if (!latitude || !longitude) {
        return [];
      }
  
      const startIndex = (currentPage - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const slicedData = animalData.slice(startIndex, endIndex);
  
      const filteredAndSortedData = slicedData
        .filter((item) => {
          const isAnimalMatch =
            selectedAnimal === "All" || selectedAnimal === "Animal" || item.animal === selectedAnimal;
          const isBreedMatch = selectedBreed === "All" || selectedBreed === "Breed" || item.breed === selectedBreed;
  
          return isAnimalMatch && isBreedMatch;
        })
        .map((item) => {
          const distance = haversineDistance([latitude, longitude], [item.latitude, item.longitude]);
          return { ...item, distance };
        })
        .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
        .map((item, index) => ({ ...item, index: index + startIndex }));
  
      return filteredAndSortedData;
    };
    
    // Get the filtered and sorted data
    const filteredAndSortedData = filterData();

    return (
        <div className="App-Main">
          {/* Geolocation */}
          {!isGeolocationAvailable ? (
            <div>Your browser does not allow location, please enter your location manually:</div>
          ) : !isGeolocationEnabled ? (
            <div>Location is not enabled</div>
          ) : coords ? (
            <div className="location">Location received</div>
          ) : (
            <div>Getting the location data</div>
          )}

      {animalData.length < 1 ? ( // Check if isLoading is true or animalData has less than 1 item
        <div className="loading">Loading...</div>
        ) :
        (
          <>
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
            {filteredAndSortedData.map((item, number) => (
                <Card className="Card" key={item.id} data={item} num={number} />
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
            </>
        )
             } </div>
    );
            
}