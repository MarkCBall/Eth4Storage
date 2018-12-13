import React, { Component } from 'react';
import ethUtil from 'ethereumjs-util'

class Clock extends Component {
    constructor(props) {
      super(props);
      this.state = {
            date: "Year-Month-Day-Hour-Minutes",
            signedDate: "signedDate here"
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
        let TSs = TS.getFullYear()+'-'+TS.getMonth()+'-'+TS.getDate()+'-'+TS.getHours()//+'-'+TS.getMinutes();
        if (TSs != this.state.date){
            this.setState({ date: TSs });

            let signingAcct = window.web3.eth.coinbase;
            window.web3.personal.sign(window.web3.fromUtf8(TSs), signingAcct,(e,signature)=>{
                //set state of recent signature
                this.setState({ signedDate: signature });
                //get address of signature
                console.log(this.getAddressFromSignature(TSs,signature))
            })
        }
    }

  
    render() {
      return (
        <div>
          <h1>Hello, world! {this.state.signedDate}</h1>
          <h2>It is {this.state.date}.</h2>
        </div>
      );
    }
}
  export default Clock;