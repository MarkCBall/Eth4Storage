import React, { Component } from "react";
import Footer from "./Footer";
import "./Home.css";

const IMAGE_URL = "../../images/main_image_clear.png";

class Home extends Component {
  render() {
    return (
      <>
        <div className="main-tile">
          <br />
          <br />
          <br />
          <h1>Welcome to</h1>
          <img alt="Banner" src={IMAGE_URL} className="banner-image" />

          <p>A blockchain solution to manage student transcripts</p>
        </div>

        <Footer />
      </>
    );
  }
}

export default Home;
