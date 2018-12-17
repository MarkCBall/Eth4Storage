import React, { Component } from 'react';
import ContractABI, {ContractAddress} from '../../ContractABI';

class RenderRow extends Component {
    constructor(props){
        super(props)
        this.state ={
            checkbox:false,
            inputValue:""
        }
    }
    //calls the smart contract to change the owner if the address is valid
    changeOwner(acctN,addy){
        if (!this.validStateAddress()){
            alert("Not a valid Ethereum Address")
            return
        }
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
            MyContract.giveOwnership(acctN,addy,(e,r)=>{
        })
    }
    //calls the smart contract to create a new user with view only priviledges
    approveViewer(acctN, addy){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
            MyContract.approveViewer(acctN,addy,(e,r)=>{
            })
    }
    //calls the smart contract to create a new user with view and write priviledges
    approveWriter(acctN, addy){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
            MyContract.approveWriter(acctN,addy,(e,r)=>{
            })
    }
    //checks if the address is valid and calls appropriate create user account based on checkbox
    handleCreate = (e) => {
        if (!this.validStateAddress()){
            alert("Not a valid Ethereum Address")
            return
        }
        let inputAddress = this.state.inputValue;
        let accountN = this.props.account.key
        if (this.state.checkbox)
            this.approveWriter(accountN,inputAddress)
        else
            this.approveViewer(accountN,inputAddress)
    }

    //returns true if the address is valid
    validStateAddress(){
        return window.web3.isAddress(this.state.inputValue);
    }

    addFunds(acctN,fromAddy){
        var fundsToAdd = (function ask() {
            var n = prompt("Please enter how many wei to add\n1000000000000000000 wei is 1 eth");
            return isNaN(n) || +n < 1 ? ask() : n;
          }());
        //   if (window.confirm("You want to add "+ fundsToAdd/1000000000000000000 +" eth to your account?")){
        //     console.log("adding funds")
        //   }
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        MyContract.addFunds(
            acctN,
            {from: fromAddy, value: fundsToAdd },
            function(e, r) {}
          );
    }

    render() {
        return (
            <div className="row">
                <div className="col-1 col-solid">  
                </div>
                <div className="col-4 col-solid">
                    <button onClick={()=>this.changeOwner(this.props.account.key,this.state.inputValue)}>
                        Change owner
                    </button>
                    <button onClick={()=>this.addFunds(this.props.account.key,this.props.verifiedAddress)}>
                        Add Funds
                    </button>
                </div>
                <div className="col-1 col-dotted">
                    
                </div>
                <div className="col-6">
                    <>
                        <input 
                            type="text" 
                            placeholder="new user's address"
                            value={this.state.inputValue}
                            onChange={(e) => this.setState({ inputValue: e.target.value })}
                        />
                        <button onClick={(e) => this.handleCreate(e)}>
                            Create
                        </button>
                        <input 
                            onChange={() => this.setState({ checkbox: !this.state.checkbox })} 
                            type="checkbox" 
                        />New user can write
                    </>
                </div>
            </div>
        );
    };
};

export default RenderRow;