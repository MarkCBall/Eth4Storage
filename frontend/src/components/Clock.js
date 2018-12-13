import React, { Component } from 'react';

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
            console.log("THE DATE STATE HAS BEEN UPDATED")
            //sign the date
        
            let signingAcct = window.web3.eth.defaultAccount;
            //console.log(signingAcct)
            window.web3.eth.sign(signingAcct,window.web3.sha3("xyz"),(e,r)=>{
                console.log("signing callback called")
                //console.log(e)
                console.log(r)
                this.setState({signedDate:r})
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