import React, { Component } from 'react';

import {BigNumber} from 'bignumber.js'


//do this better - send contract through props?
import ContractABI, {ContractAddress} from '../../ContractABI';

class RenderSubRow extends Component {
    constructor(props){
        super(props)
        this.state ={
            isValid:[this.props.UserAcct.SubUserAddys.length],
            canWrite:[this.props.UserAcct.SubUserAddys.length]
        }
        this.addUser()

        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        let arrValid = [];
        let arrWrite = [];
        let userArray = this.props.UserAcct.SubUserAddys;
        //THIS IS UGLY - DO IT BETTER
        for (let i=0;i<userArray.length;i++){
            //if its an ethereum address
            if (/[0-9A-Fa-f]{6}/g.test(userArray[i].val)){
                //console.log(userArray[i].val)
                //add arrValid bool values
                MyContract.Users(userArray[i].val,(e,r)=>{
                    arrValid[i]=(r[0].toString()==userArray[i].key.toString());
                    this.setState({isValid:arrValid.slice()})
                    console.log(r)
                    
                    //will future callack overwrite a current one???
                    arrValid[i]=(
                            (r[0].toString()==userArray[i].key.toString()) 
                            && r[1]);
                    this.setState({canWrite:arrWrite.slice()})


                })
                //add arrWrite bool values

            }
            
            

        }
    }

    addUser(){
        console.log("User added")
    }

    
    disp(){
        console.log(this.state)
    }

    
    //console.log(arr)
    //console.log(this.state.isExpanded)
    

    canWrite(str,acctN){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);

        //return has write access
    }
    
       render() {
        return (
            <>
            <p onClick={this.disp.bind(this)}>MEMEMEME</p>
                {this.props.UserAcct.SubUserAddys ?
                    <>
                        {this.props.UserAcct.SubUserAddys.map( (usr) => (
                            <div key={usr.key} className="row">
                                <div className="col-1 col-solid"></div>
                                <div className="col-4 col-solid"></div>
                                <div className="col-1 col-dotted"></div>
                                <div className="col-6">
                             
                                    {this.state.isValid[usr.key] ? 
                                    <>
                                        {usr.val}
                                        <button>Delete</button>
                                        {this.state.canWrite[usr.key] ? <button>disable write</button> : <button>enable write</button>}
                                    
                                    </> : <></>}
                                    
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