import React, { Component } from 'react';
import ethUtil from 'ethereumjs-util'

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
            date: "never",
            dateSignature: "signedDate here",
            signedInAs:"not signed in yet"
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          5000//every 5 seconds
        );
    }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
    }
      
    getAddressFromSignature(originalString,signedString){
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

        return address
    }


    tick() {
        let TS = new Date()
        let TSs = TS.getFullYear()+'-'+TS.getMonth()+'-'+TS.getDate()+' '+TS.getHours()+":00 o 'clock"
            if (TSs != this.state.date){

            let signingAcct = window.web3.eth.coinbase;
            window.web3.personal.sign(window.web3.fromUtf8(TSs), signingAcct,(e,signature)=>{
                //remember the signature for server verification
                this.setState({ dateSignature: signature });
                
                //set the address and when it last refreshed login info
                this.setState({ date: TSs });
                this.setState({signedInAs: this.getAddressFromSignature(TSs,signature) })
                
            })
        }
    }

  
    render() {
      return (
        <div>
          {/* <h2>You last signed at {this.state.date}.</h2> */}
          Logged in with <strong>{this.state.signedInAs}</strong> at <strong>{this.state.date}</strong>
        </div>
      );
    }
}
  export default Login;