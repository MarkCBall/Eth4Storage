import React, { Component } from 'react';
import {connect} from 'react-redux';
import { addUserToAccount } from "../../redux/actions/todo";

//do this better - send contract through props?
import ContractABI, {ContractAddress} from '../../ContractABI';

class RenderSubRow extends Component {
    constructor(props){
        super(props)
        this.state ={
            users:[]
        }

        //set state to show if users can write
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        var acctNum = this.props.rowNum;
        MyContract.userCountsInAccount.call(acctNum, (e,response) => {
            let numUsers = response.c.toString(10);
            for (let i=0;i<numUsers;i++){
                MyContract.usersOfAccount(acctNum,i,(e,r)=>{
                    this.addUser(i,e,r)
                })
            }
        })
    }

    addUser(i,e,r){
        this.props.addUserToAccount(this.props.rowNum,  {key:i, addy:r[0], canWrite : r[1]}    );
    }   

    deleteUser(acctN, userN){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
            MyContract.deleteUser(acctN,userN,(e,r)=>{
            })
    }

    disableWrite(acctN, userN){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        MyContract.disallowWrite(acctN, userN,(e,r)=>{
        })
    }
    enableWrite(acctN, userN){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        MyContract.allowWrite(acctN, userN,(e,r)=>{
        })
    }


    getUserArray(){
        let acctN=this.props.rowNum;
        let accounts = this.props.state.todo.accounts;
        let arrIndex = accounts.findIndex(o => o.key === acctN);
        if(accounts[arrIndex].users)
            return accounts[arrIndex].users
        return []
        
    }

       render() {
        return (
            <>
                {this.getUserArray().map( (usr) => (

                    <div key={usr.key} className="row">
                        <div className="col-1 col-solid"></div>
                        <div className="col-4 col-solid"></div>
                        <div className="col-1 col-dotted"></div>
                        <div className="col-6">
                            {usr.addy}
                            {usr.canWrite ? 
                                <button onClick={()=> {this.disableWrite(this.props.rowNum,usr.key)}}>Disable write</button> 
                            : 
                                <button onClick={()=> {this.enableWrite(this.props.rowNum,usr.key)}}>Enable write</button>
                            }
                            <button onClick={()=> {this.deleteUser(this.props.rowNum,usr.key)}}>Delete</button>
                        </div>
                    </div>
                ))}

            </>
        );
    };
};

//export default RenderSubRow;
const mapStateToProps = function(state){
    return{
        state
    }
}

export default connect(mapStateToProps,{addUserToAccount})(RenderSubRow)