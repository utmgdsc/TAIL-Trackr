import { useState } from "react";
import "./Dashboard.css"
import Card from "./Posts-Layout/Card";
import Dropdown from "./Posts-Layout/Dropdown";
import Maps from "./Posts-Layout/Maps";

export default function Dashboard() {

    let state = {
      data: [
        {
          uploader_name: "inaam",
          image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xNV9waG90b19vZl9hX2RvZ19ydW5uaW5nX3dpdGhfb3duZXJfYXRfcGFya19lcF9mM2I3MDQyZC0zNWJlLTRlMTQtOGZhNy1kY2Q2OWQ1YzQzZjlfMi5qcGc.jpg",
          name: "doggo",
          animal: "Cat",
          breed: "Persian",
          specification: "cat rat",
          match_rating: 0.5,
          star: 1,
          phone: "647-999-9999",

        },
        {
          uploader_name: "dev",
          image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xNV9waG90b19vZl9hX2RvZ19ydW5uaW5nX3dpdGhfb3duZXJfYXRfcGFya19lcF9mM2I3MDQyZC0zNWJlLTRlMTQtOGZhNy1kY2Q2OWQ1YzQzZjlfMi5qcGc.jpg",
          name: "doggo",
          animal: "Cat",
          breed: "rat",
          specification: "cat rat",
          match_rating: 0.5,
          star: 1,
          phone: "647-999-9999",
        },
        {
            uploader_name: "dev",
            image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xNV9waG90b19vZl9hX2RvZ19ydW5uaW5nX3dpdGhfb3duZXJfYXRfcGFya19lcF9mM2I3MDQyZC0zNWJlLTRlMTQtOGZhNy1kY2Q2OWQ1YzQzZjlfMi5qcGc.jpg",
            name: "doggo",
            animal: "Dog",
            breed: "Afghan",
            specification: "cat rat",
            match_rating: 0.5,
            star: 1,
            phone: "647-999-9999",
          },
          {
            uploader_name: "dev",
            image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xNV9waG90b19vZl9hX2RvZ19ydW5uaW5nX3dpdGhfb3duZXJfYXRfcGFya19lcF9mM2I3MDQyZC0zNWJlLTRlMTQtOGZhNy1kY2Q2OWQ1YzQzZjlfMi5qcGc.jpg",
            name: "doggo",
            animal: "Cat",
            breed: "rat",
            specification: "cat rat",
            match_rating: 0.5,
            star: 1,
            phone: "647-999-9999",
          },
      ],
    };
    const options = ["All", "Cat", "Dog"]
    const cat_options = ["All", "Abyssinian","Bengal","Birman","Bombay","British_Shorthair","Egyptian_Mau","Maine_Coon","Persian","Ragdoll","Russian_Blue","Siamese","Sphynx"]
    const dog_options = ["All", "Afghan","African Wild Dog","Airedale","American  Spaniel","American Hairless","American Spaniel","Basenji","Basset","Beagle","Bearded Collie","Bermaise","Bichon Frise","Blenheim","Bloodhound","Bluetick","Border Collie","Borzoi","Boston Terrier","Boxer","Bull Mastiff","Bull Terrier","Bulldog","Cairn","Chihuahua","Chinese Crested","Chow","Clumber","Cockapoo","Cocker","Collie","Corgi","Coyote","DOG","Dalmation","Dhole","Dingo","Doberman","Elk Hound","French Bulldog","German Sheperd","Golden Retriever","Great Dane","Great Perenees","Greyhound","Groenendael","Irish Spaniel","Irish Wolfhound","Japanese Spaniel","Komondor","Labradoodle","Labrador","Lhasa","Malinois","Maltese","Mex Hairless","Newfoundland","Pekinese","Pit Bull","Pomeranian","Poodle","Pug","Rhodesian","Rottweiler","Saint Bernard","Schnauzer","Scotch Terrier","Shar_Pei","Shiba Inu","Shih-Tzu","Siberian Husky","Vizsla","Yorkie"]
  
      // Everything underneath is for VisiblePosts.jsx
      // const [data, setData] = useState([]); // Your dataset state
      // const [filteredData, setFilteredData] = useState([]); // State for filtered data
      // const [sortOrder, setSortOrder] = useState('asc'); // Initial sorting order
    
      // // Fetch your data (you can use useEffect to simulate a data fetch)
      // useEffect(() => {
      //   // Simulated data fetch
      //   // Replace this with actual data fetching logic
      //   const fetchData = async () => {
      //     // Fetch data and set it to the state
      //     // For example: const result = await fetch('your-api-endpoint');
      //     // setData(result);
      //     // setFilteredData(result);
      //   };
    
      //   fetchData();
      // }, []);
    
      // // Function to handle sorting
      // const handleSort = () => {
      //   const sortedData = [...filteredData].sort((a, b) => {
      //     if (sortOrder === 'asc') {
      //       return a.match_rating - b.match_rating;
      //     } else {
      //       return b.match_rating - a.match_rating;
      //     }
      //   });
    
      //   setFilteredData(sortedData);
      //   setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      // };

    

    const [isActiveAnimal, setIsActiveAnimal] = useState(false);
    const [isActiveBreed, setIsActiveBreed] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState("Animal");
    const [selectedBreed, setSelectedBreed] = useState("Breed");
    
    const breed_options = selectedAnimal === 'Cat' ? cat_options : (selectedAnimal === 'Dog' ? dog_options : []);

      // Function to filter data based on selected animal and breed
      const filterData = () => {
        return state.data.filter(item => {
          const isAnimalMatch = selectedAnimal === 'All' || selectedAnimal === 'Animal' || item.animal === selectedAnimal;
          const isBreedMatch = selectedBreed === 'All' || selectedBreed === 'Breed' || item.breed === selectedBreed;
    
          return isAnimalMatch && isBreedMatch;
        });
      };
    
      // Get the filtered data
      const filteredData = filterData();
    return (
        <div className="App-Main">
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
            <div className="Map-Layout">
              <Maps />
            </div>
        </div>
    );
            
}
