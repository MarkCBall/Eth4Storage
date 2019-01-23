import React, { Component } from "react";
//mport { Button } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "never",
      dateSignature: "signedDate here",
      verifiedAddress: "not signed in yet"
    };
  }
  //NOTE----
  //the state in this component should be changed to redux global state
  //the verifiedAddress impacts rendering throughout the application
  //the date and dateSignature are to be used in every call to external APIs as login verification

  //sets the time as a string and promps the client to sign the string with metamask
  //this can be used as a verification that the client owns the address
  //it calls a function named "setAddressFromSignature" which has been passed to it which sets verifiedAddress state
  //IMPROVE this by making verifiedAddress as redux global state
  initLogin() {
    let TS = new Date();
    let TSs =
      TS.getFullYear() +
      "-" +
      TS.getMonth() +
      "-" +
      TS.getDate() +
      " at " +
      TS.getHours() +
      ":00 o 'clock";
    //get metamask's open account address
    let signingAcct = window.web3.eth.coinbase;
    //prompt the client to sign the string
    window.web3.personal.sign(
      window.web3.fromUtf8(TSs), //strin converted to proper format
      signingAcct,
      (e, signature) => {
        this.props.setAddressFromSignature(TSs, signature);
      }
    );
  }

  render() {
    return (
      <div>
        Logged in with <strong>{this.props.verifiedAddress}</strong> on{" "}
        <strong>{this.props.date}</strong>
        &nbsp;&nbsp;
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.initLogin.bind(this)}
        >
          Login
        </button>
      </div>
    );
  }
}
export default Login;
