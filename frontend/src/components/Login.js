import React, { Component } from 'react';


class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
            date: "never",
            dateSignature: "signedDate here",
            verifiedAddress:"not signed in yet"
        };
    }

    initLogin() {
        let TS = new Date()
        let TSs = TS.getFullYear()+'-'+TS.getMonth()+'-'+TS.getDate()+' at '+TS.getHours()+":00 o 'clock"
            let signingAcct = window.web3.eth.coinbase;
            window.web3.personal.sign(window.web3.fromUtf8(TSs), signingAcct,(e,signature)=>{
                this.props.setAddressFromSignature(TSs,signature)
            })
    }

  
    render() {
      return (
        <div>
          {/* <h2>You last signed at {this.state.date}.</h2> */}
          Logged in with <strong>{this.props.verifiedAddress}</strong> on <strong>{this.props.date}</strong>
          <button onClick={this.initLogin.bind(this)}>Login</button>
        </div>
      );
    }
}
  export default Login;