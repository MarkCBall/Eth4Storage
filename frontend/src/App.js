import { Provider } from "react-redux";
import store from "./redux/index";

import React, { Component } from "react";
import ethUtil from "ethereumjs-util";
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

  setAddressFromSignature(originalString, signedString) {
    //code below from https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial
    const msgBuffer = ethUtil.toBuffer(originalString);
    const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
    const signatureBuffer = ethUtil.toBuffer(signedString);
    const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
    const publicKey = ethUtil.ecrecover(
      msgHash,
      signatureParams.v,
      signatureParams.r,
      signatureParams.s
    );
    const addressBuffer = ethUtil.publicToAddress(publicKey);
    const address = ethUtil.bufferToHex(addressBuffer);

    this.setState({ dateSignature: signedString });
    this.setState({ date: originalString });
    this.setState({ verifiedAddress: address });
    console.log("date", this.state.date);
    console.log("dadateSignaturete", this.state.dateSignature);
    console.log("verifiedAddress", this.state.verifiedAddress);
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <NavHeader />
          <br />
          <Login
            date={this.state.date}
            verifiedAddress={this.state.verifiedAddress}
            setAddressFromSignature={this.setAddressFromSignature.bind(this)}
          />

          <ContractData />

          <Switch>
            <Route
              path="/Upload"
              render={props => (
                <Upload
                  {...props}
                  verifiedAddress={this.state.verifiedAddress}
                  date={this.state.date}
                  dateSignature={this.state.dateSignature}
                />
              )}
            />

            <Route
              path="/Download"
              render={() => (
                <Download
                  verifiedAddress={this.state.verifiedAddress}
                  date={this.state.date}
                  dateSignature={this.state.dateSignature}
                />
              )}
            />

            <Route
              path="/UserManagement"
              render={() => (
                <UserManagement verifiedAddress={this.state.verifiedAddress} />
              )}
            />

            <Route
              path="/"
              render={() => (
                <Home verifiedAddress={this.state.verifiedAddress} />
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
