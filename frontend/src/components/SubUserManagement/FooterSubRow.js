import React, { Component } from 'react';



//CSS Files
import './RowBotBorder.css';


//do this better - send contract through props?
import ContractABI, {ContractAddress} from '../../ContractABI';

class RenderRow extends Component {
    constructor(props){
        super(props)
        this.state ={
            makeWriter:[]
        }
    }



    //addUserToDB(){}

    changeOwner(acctN,addy){
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

    handleCreate = () => {
        console.log(this.state.checkbox)
        console.log(this.state.inputValue.target)
    }

    render() {
        return (
            <div className="row line-below">
                <div className="col-1 col-solid">
                    
                </div>
                <div className="col-4 col-solid">
                    <button onClick={()=>this.changeOwner(this.props.account.key)}>Change owner</button>
                </div>
                <div className="col-1 col-dotted">
                    
                </div>
                <div className="col-6">
                    <>
                        <button>Add</button> 
                        <input 
                            type="text" 
                            placeholder="User address"
                            onChange={(value) => this.setState({ inputValue: value })}
                        />
                        <button onClick={() => this.handleCreate()}>
                            Create
                        </button>
                        <input onChange={() => this.setState({ checkbox: !this.state.checkbox })} type="checkbox" name="x" value="y"/>New user can write
                    </>
                </div>
            </div>
        );
    };
};

export default RenderRow;