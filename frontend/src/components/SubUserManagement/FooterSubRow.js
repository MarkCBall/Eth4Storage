import React, { Component } from 'react';



//CSS Files
import './RowBotBorder.css';


//do this better - send contract through props?
import ContractABI, {ContractAddress} from '../../ContractABI';

class RenderRow extends Component {
    constructor(props){
        super(props)
        this.state ={
            makeWriter:[],
            checkbox:false,
            inputValue:""
        }
    }



    //addUserToDB(){}
        //update the database
        //update state

    changeOwner(acctN,addy){
        if (!this.validStateAddress()){
            console.log("error handling somehow - not an address in changeOwner")
            return
        }
            
        console.log("changeowner called with "+ acctN + " acct and " + addy)
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
            MyContract.giveOwnership(acctN,addy,(e,r)=>{
                //update the database
                //update state
        })
    }

    approveViewer(acctN, addy){
        console.log("approveviewer called with "+ acctN + " acct and " + addy)
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
            MyContract.approveViewer(acctN,addy,(e,r)=>{
                //update the database
                //update state
            })
    }

    approveWriter(acctN, addy){
        console.log("approvewriter called with "+ acctN + " acct and " + addy)
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
            MyContract.approveWriter(acctN,addy,(e,r)=>{
                //update the database
                //update state
            })
    }

    handleCreate = (e) => {
        if (!this.validStateAddress()){
            console.log("error handling somehow - not an address in handleCreate")
            return
        }
        let inputAddress = this.state.inputValue;
        let accountN = this.props.account.key
        if (this.state.checkbox)
            this.approveWriter(accountN,inputAddress)
        else
            this.approveViewer(accountN,inputAddress)

        // console.log(this.state.checkbox)
        // //console.log(e.target.previousSibling.value)
        // console.log(this.state.inputValue)
    }

    validStateAddress(){
        return window.web3.isAddress(this.state.inputValue);
    }

    render() {
        return (
            <div className="row line-below">
                <div className="col-1 col-solid">
                    
                </div>
                <div className="col-4 col-solid">
                    <button onClick={()=>this.changeOwner(this.props.account.key,this.state.inputValue)}>
                        Change owner
                    </button>
                </div>
                <div className="col-1 col-dotted">
                    
                </div>
                <div className="col-6">
                    <>
                        <input 
                            type="text" 
                            placeholder="User address"
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