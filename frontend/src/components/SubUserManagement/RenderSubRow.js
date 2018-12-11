import React, { Component } from 'react';


//import update from 'react-addons-update';
//import {BigNumber} from 'bignumber.js'


//do this better - send contract through props?
import ContractABI, {ContractAddress} from '../../ContractABI';

class RenderSubRow extends Component {
    constructor(props){
        super(props)
        this.state ={
            canWrite:[]
        }

        //set state to show if users can write
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        this.props.UserAcct.SubUserAddys.forEach((user)=>{
            MyContract.Users(user.val,(e,r)=>{
                this.setCanWrite(user.key,r[1])
            })
        })
    }

    setCanWrite(i,boolVal){
        let arr = JSON.parse(JSON.stringify(this.state.canWrite));
        arr[i]=boolVal;
        this.setState({canWrite:arr});
    }


    deleteUser(acctN, addy){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
            MyContract.deleteUser(acctN,addy,(e,r)=>{
                //update the database
                //update state
            })
    }

    disableWrite(acctN, addy){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        MyContract.disallowWrite(acctN,addy,(e,r)=>{
            //update the database
            //update state
        })
    }
    enableWrite(acctN, addy){
        //note the same solidity function is used as to create a whole new writer
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        MyContract.approveWriter(acctN,addy,(e,r)=>{
            //update the database
            //update state
        })
    }


    



    userCanWrite(){

    }
    
       render() {
        return (
            <>
            {/* <p onClick={this.disp.bind(this)}>MEMEMEME</p> */}
                {this.props.UserAcct.SubUserAddys.length>0 ?
                    <>
                        {this.props.UserAcct.SubUserAddys.map( (usr) => (
                            <div key={usr.key} className="row">
                                <div className="col-1 col-solid"></div>
                                <div className="col-4 col-solid"></div>
                                <div className="col-1 col-dotted"></div>
                                <div className="col-6">
                                    {usr.val}
                                    {this.state.canWrite[usr.key] ? 
                                        <button onClick={()=> {this.disableWrite(this.props.UserAcct.key,usr.val)}}>Disable write</button> 
                                    : 
                                        <button onClick={()=> {this.enableWrite(this.props.UserAcct.key,usr.val)}}>Enable write</button>
                                    }
                                    <button onClick={()=> {this.deleteUser(this.props.UserAcct.key,usr.val)}}>Delete</button>
                                    

                                    
                                </div>
                            </div>
                        ))}
                    </>
                :<></>}
                
            </>
        );
    };
};

export default RenderSubRow;

