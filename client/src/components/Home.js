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


    render() {
        return (
            <div className="App-Main">
              <MainPage />
              <Features />

            </div>
          );
    }
}