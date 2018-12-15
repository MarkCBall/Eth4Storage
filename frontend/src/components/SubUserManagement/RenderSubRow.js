import React, { Component } from 'react';
import {connect} from 'react-redux';


//do this better - send contract through props?
import ContractABI, {ContractAddress} from '../../ContractABI';

class RenderSubRow extends Component {
    constructor(props){
        super(props)
        this.state ={
        }
    }
    //call smart contract to delete user
    deleteUser(acctN, userN){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
            MyContract.deleteUser(acctN,userN,(e,r)=>{
            })
    }
    //call smart contract to disable write access
    disableWrite(acctN, userN){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        MyContract.disallowWrite(acctN, userN,(e,r)=>{
        })
    }
    //call smart contract to enable write access
    enableWrite(acctN, userN){
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        MyContract.allowWrite(acctN, userN,(e,r)=>{
        })
    }

    //searches the global state for account# and returns the associated user array
    getUserArray(acctN){
        let accounts = this.props.state.todo.accounts;
        let arrIndex = accounts.findIndex(o => o.key === acctN);
        if(accounts[arrIndex].users)
            return accounts[arrIndex].users
        return []
    }
       render() {
        return (
            <>
                {this.getUserArray(this.props.acctNum).map( (usr) => (

                    <div key={usr.key} className="row">
                        <div className="col-1 col-solid"></div>
                        <div className="col-4 col-solid"></div>
                        <div className="col-1 col-dotted"></div>
                        <div className="col-6">
                            {usr.addy}
                            {this.props.acctAddy===this.props.verifiedAddress?
                            <>
                                {usr.canWrite ? 
                                    <button onClick={()=> {this.disableWrite(this.props.acctNum,usr.key)}}>Disable write</button> 
                                : 
                                    <button onClick={()=> {this.enableWrite(this.props.acctNum,usr.key)}}>Enable write</button>
                                }
                                <button onClick={()=> {this.deleteUser(this.props.acctNum,usr.key)}}>Delete</button>
                            </>
                            :<></>
                        
                            }
                            
                            
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

export default connect(mapStateToProps)(RenderSubRow)