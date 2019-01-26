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
          <br />
          <br />
          <br />
          <h1>Eth4Storage</h1>
          <br />
          <br />
          <br />
          <p>A blockchain solution to do rad things!</p>
        </div>

        <Footer />
      </>
    );
  }
}

export default Home;
