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
        console.log("deleteUser called")
        console.log(acctN)
        console.log(addy)
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);


       
            //MyContract.deleteUser(1,"0x396e328532AC99C238730Ff4B7D185D7A9920C1C",(e,r)=>{
            MyContract.deleteUser(acctN,addy,(e,r)=>{

                //update the database
                //update state
            })
                
       


    }

    //disablewrite
    //enablewrite


    



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
                                        <button>disable write</button> 
                                    : 
                                        <button>enable write</button>
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

