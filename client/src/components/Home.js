import { Component } from "react";
import MainPage from "./MainPage"
import Features from "./Features"
import "./Home.css"
import Tips from "./Tips";

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
              <Tips />
            </div>
          );
    }
}