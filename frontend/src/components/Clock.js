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
      
      tick() {
        let TS = new Date()
        let TSs = TS.getFullYear()+'-'+TS.getMonth()+'-'+TS.getDate()+'-'+TS.getHours()//+'-'+TS.getMinutes();
        if (TSs != this.state.date){
            this.setState({ date: TSs });
            //console.log("THE DATE STATE HAS BEEN UPDATED")
            let signingAcct='0x0F7Cd2D9F4CEc1f7E01f880315Fd56101095fF87' //window.web3.eth.coinbase //Accounts[0]     //let signingAcct = window.web3.eth.defaultAccount;
            //let sha3Message = '0x8dfe9be33ccb1c830e048219729e8c01f54c768004d8dc035105629515feb38e'
            //let message = "xyz"
            // let sha3Message = window.web3.sha3(message);
            // console.log("signing from address "+signingAcct)
            // console.log("sha of msg xyz is " + sha3Message)
            
            //console.log(sha3Message)
            window.web3.personal.sign(window.web3.fromUtf8(TSs), signingAcct,(e,signature)=>{ //console.log);
                //code below from https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial
                const msgBuffer = ethUtil.toBuffer(TSs);
                const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
                const signatureBuffer = ethUtil.toBuffer(signature);
                const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
                const publicKey = ethUtil.ecrecover(
                    msgHash,
                    signatureParams.v,
                    signatureParams.r,
                    signatureParams.s
                );
                const addressBuffer = ethUtil.publicToAddress(publicKey);
                const address = ethUtil.bufferToHex(addressBuffer);
                console.log("address is "+address)
            })




            // window.web3.eth.sign(signingAcct,sha3Message,(e,signature)=>{
            //     console.log("the rsv signature is " +signature)

            //     const sig = utils.fromRpcSig(signature);

            //     //const utils = require('ethereumjs-util');

            //     // NOTE: Proper varint encoding is necessary for larger lengths.
            //     const prefix = '\x19Ethereum Signed Message:\n' + String.fromCharCode(message.length);
            //     const stringToSign = prefix + message;
            //     console.log(stringToSign)

                

            //     const publicKey = utils.ecrecover(new Buffer(window.web3.sha3(stringToSign).substr(2)),sig.v, sig.r, sig.s);

            //     console.log("rec addy is "+ utils.bufferToHex(utils.pubToAddress(publicKey)));



            //         // signature = signature.split('x')[1];
            //         // var r = new Buffer(signature.substring(0, 64), 'hex')
            //         // var s = new Buffer(signature.substring(64, 128), 'hex')
            //         // var v = new Buffer((parseInt(signature.substring(128, 130)) + 27).toString());
            //         // //console.log(    (parseInt(signature.substring(128, 130)) + 27).toString() )
            //         // var sha3MessageBuffer = new Buffer(sha3Message);
            //         // console.log("substr'd sha3msg is "+ sha3MessageBuffer)
                    
    
            //         // // //var pub = utils.ecrecover("xyz", v_decimal, r, s);
            //         // var pub = utils.ecrecover(sha3MessageBuffer, v, r, s);
            //         // console.log("pub is "+pub)
            //         // var recoveredAddress = '0x' + utils.pubToAddress(pub).toString('hex')
            //         // console.log("the rec addy is "+recoveredAddress)


            //     //}
            // })//end web3 sign
        }//end on minute change
      }//end tick

  
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