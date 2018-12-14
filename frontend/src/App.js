import React, { Component } from 'react';
import ethUtil from 'ethereumjs-util'
import { Switch, Route } from 'react-router-dom'

//Relative Imports
import Header from './components/Header'
import Login from './components/Login';
import Upload from './components/Upload'
import Download from './components/Download'
import UserManagement from './components/UserManagement'
import Home from './components/Home'






//CSS Files
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state ={
      date: "never",
      dateSignature: "signature hash goes here",
      verifiedAddress:"0x..."
    }
  }


  setAddressFromSignature(originalString,signedString){
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
    this.setState({verifiedAddress:address })
}


  render() {
    return (
      <div className="App">

      <Login
        date={this.state.date}
        verifiedAddress={this.state.verifiedAddress}
        setAddressFromSignature={this.setAddressFromSignature.bind(this)}
      />

      <Header/>

      <Switch>
        <Route path="/Upload" 
        render={(props) => <Upload {...props} verifiedAddress={this.state.verifiedAddress} />}  
        />

        <Route path="/Download" 
        render={() => <Download verifiedAddress={this.state.verifiedAddress} />}  
        />

        <Route path="/UserManagement" 
        render={() => <UserManagement verifiedAddress={this.state.verifiedAddress} />}  
        />

        <Route path="/" 
        render={() => <Home verifiedAddress={this.state.verifiedAddress} />}  
        />
        
      </Switch>


      </div>
    );
  }
}

export default App;
