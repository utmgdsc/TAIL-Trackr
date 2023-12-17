import { Component } from "react";
import "./NewPostPage.css"

export default class NewPostPage extends Component {

  constructor() {
    super();
    this.state = {
      selectedImage: null,
      data: [
        {
          uploader_name: "inaam",
          name: "doggo",
          animal: "cat",
          breed: "rat",
          specification: "cat rat",
          match_rating: 0.5,
          star: 1,
        },
        {
          uploader_name: "dev",
          name: "doggo",
          animal: "cat",
          breed: "rat",
          specification: "cat rat",
          match_rating: 0.5,
          star: 1,
        },
      ],
      filteredData: [],
    };
  }
    
      handleSubmit = async () => {
        let imageByteCode = "";
    
        this.getBase64(this.state.selectedImage, (result) => {
          imageByteCode = result;
        });
    
        const response = await fetch("/api/upload/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imageByteCode),
        });
    
        const json = await response.json();
        console.log(json);
      };
    
      getBase64(file, callback) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          callback(reader.result);
        };
        reader.onerror = (error) => {
          console.error("Error converting image to base64:", error);
        };
      }
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

    


    render() {
        return (
            <div className="App-Main">
              <h1>Upload Image of Animal Here</h1>
      
              {this.state.selectedImage && (
                <div>
                  <img
                    alt="not found"
                    width={"250px"}
                    src={URL.createObjectURL(this.state.selectedImage)}
                  />
                  <br />
                  <button onClick={this.handleSubmit}>Submit</button>
                </div>
              )}
              <input
                type="file"
                name="myImage"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  this.setState({ selectedImage: event.target.files[0] });
                }}
              />
            </div>
            
          );



            {/* 
            add remaining details here (animal type checkbox, uploader info, etc.): 
            */}
    }
}