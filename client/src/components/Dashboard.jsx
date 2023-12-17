import { useState } from "react";
import "./Dashboard.css"
import Card from "./Posts-Layout/Card";
import Dropdown from "./Posts-Layout/Dropdown";

export default function Dashboard() {

    let state = {
      data: [
        {
          uploader_name: "inaam",
          image: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xNV9waG90b19vZl9hX2RvZ19ydW5uaW5nX3dpdGhfb3duZXJfYXRfcGFya19lcF9mM2I3MDQyZC0zNWJlLTRlMTQtOGZhNy1kY2Q2OWQ1YzQzZjlfMi5qcGc.jpg",
          name: "doggo",
          animal: "cat",
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
          animal: "cat",
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
            animal: "cat",
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
            animal: "cat",
            breed: "rat",
            specification: "cat rat",
            match_rating: 0.5,
            star: 1,
            phone: "647-999-9999",
          },
      ],
    };
  
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
    const [selected, setSelected] = useState("Animal");
    const [breedSelected, setBreedSelected] = useState("Breed");
    
    return (
        <div className="App-Main">
            <div className="App-dropdowns">
                <Dropdown isActive={isActiveAnimal} setIsActive={setIsActiveAnimal} selected={selected} setSelected={setSelected} />
                <Dropdown isActive={isActiveBreed} setIsActive={setIsActiveBreed} selected={breedSelected} setSelected={setBreedSelected} />
            </div>

            {
              (isActiveAnimal || isActiveBreed)  && (
                <div className="spacing"></div>
              )
            }
            
            <div className="Card-Layout">
            {state.data.map((item) => (
                <Card className="Card" key={item.id} data={item} />
            ))}
            </div>
        </div>
    );
            
}
