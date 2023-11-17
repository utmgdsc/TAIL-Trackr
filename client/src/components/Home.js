import { Component } from "react";
import MainPage from "./MainPage"
import Features from "./Features"
import "./Home.css"

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
          selectedImage: null,
        };
      }
    
      handleSubmit = async () => {
        let imageByteCode = "";
    
        this.getBase64(this.state.selectedImage, (result) => {
          imageByteCode = result;
        });
    
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(imageByteCode),
        });
    
        console.log(JSON.stringify({encodedString: imageByteCode}))
    
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


    render() {
        return (
            <div className="App-Main">
              <MainPage />
              <Features />
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
      
              <br />
              <br />
      
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
    }
}