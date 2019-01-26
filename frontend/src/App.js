import { Provider } from "react-redux";
import store from "./redux/index";

import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

//Relative Imports
import ContractData from "./components/ContractData";
import Login from "./components/Login";
import Upload from "./components/Upload";
import Download from "./components/Download";
import UserManagement from "./components/UserManagement";
import Home from "./components/Home";
import NavHeader from "./components/navHeader";
import Footer from "./components/Footer";

//CSS Files
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);



    this.state = {
      //change these defaults to an account that has more info
      date: "(Not logged in)",
      dateSignature:
        "0xda48e9e6024d16bd4268c13afce15a17574ad50f8280f57f27afe84a80bec0a4084df72842055a3c3bd5489c3066060717d9242764cbd7b47fd30dd677034b401b",
      verifiedAddress: "(Not logged in)"
    };
  }



  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <NavHeader />
          <br />


          <Login/>

          <ContractData/>

          <Switch>
            <Route
              path="/Upload"
              render={() =>  <Upload/> }
            />

            <Route
              path="/Download"
              render={() => <Download/>}
            />

            <Route
              path="/UserManagement"
              render={() => (
                <UserManagement />
              )}
            />

            <Route
              path="/"
              render={() => (
                <Home/>
              )}
            />
          </Switch>
        </div>
        <Footer />
      </Provider>
    );
  }
}

export default App;
