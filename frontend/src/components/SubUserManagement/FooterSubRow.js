import React, { Component } from 'react';



//CSS Files
import './RowBotBorder.css';


//do this better - send contract through props?
import ContractABI, {ContractAddress} from '../../ContractABI';

class RenderRow extends Component {

    //addUserToDB(){}

    changeOwner(acctN,addy){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
            MyContract.giveOwnership(acctN,addy,(e,r)=>{
                //update the database
                //update state
        })
    }

    approveViewer(acctN, addy){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
            MyContract.approveViewer(acctN,addy,(e,r)=>{
                //update the database
                //update state
            })
    }

    approveWriter(acctN, addy){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
            MyContract.approveWriter(acctN,addy,(e,r)=>{
                //update the database
                //update state
            })
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
                        <input type="text" placeholder="User address"></input>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button>Create</button>
                        <select>
                            <option value="View">View Only</option>
                            <option value="Write">Write or view</option>
                        </select>
                    </>
                </div>
            </div>
        );
    };
};

export default RenderRow;