import React, { Component } from 'react';

import ContractABI, {ContractAddress} from '../ContractABI';


//CSS Files
//import './Header.css';

class UserManagement extends Component {
    constructor(props){
        super(props)
        this.state ={
            owner:"Not Updated",
            numAccts: -1,
            contractBal:-1
        }

    this.GetData();
    }
    //this.state.r = "yyy"

    GetData() {
        //make an instance of the contract
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        //owner field
        MyContract.owner.call( (e,response) => {this.setState({owner:response})} );
        //Contract balance
        window.web3.eth.getBalance(ContractAddress, (e,response) => {this.setState({contractBal:response.c[1]})} );//WHHHYYYY????
        //numAccounts
        MyContract.numAccts.call( (e,response) => {
            this.setState({numAccts:response.c[0]})//FIX THIS WEIRDNESS!
            //AccountsArray
            let arr;//put the console logs into an array but figure out async ordering first
            for (let i=0;i<response.c[0];i++){
                MyContract.Accounts(//THIS IS ASYNC - HOW TO MAKE SURE IT GOES IN ORDER???
                    i,
                    (e,response) => {
                        console.log("account# "+i)
                        console.log("The owner is " +response[0])
                        console.log("double check bal is " +response[1].c[0])
                        console.log("or is the bal "+ response[1].s)
                    }
                )
            }

        });
        
        //UsersArray?? need to provide specific addy? diff for each Acct?

        

    }

    render() {
        return (
            <div className="main-tile">

            <br></br><br></br><br></br><br></br><br></br>
            <h1>This is the UserManagement page</h1>
            <p>Session ID:{this.props.sessionID}</p>

            <p>The owner of the account is: <strong>{this.state.owner}</strong></p>
            <p>The smart contract holds <strong>{this.state.numAccts}</strong> accounts</p>
            <p>The smart contract holds <strong>{this.state.contractBal/1000000000000000000}</strong> eth</p>



        
            </div>
        );
    };
};

export default UserManagement;