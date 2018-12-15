import React, { Component } from 'react';
import {connect} from 'react-redux';

import { addAccount } from "../redux/actions/todo";
import { addUserToAccount } from "../redux/actions/todo";

import TitleTile from './SubUserManagement/TitleTile'
import RenderRow from './SubUserManagement/RenderRow'
import RenderSubRow from './SubUserManagement/RenderSubRow'
import HeaderRow from './SubUserManagement/HeaderRow'
import FooterSubRow from './SubUserManagement/FooterSubRow'

import ContractABI, {ContractAddress} from '../ContractABI';

//CSS Files
import './SubUserManagement/UserManagement.css'
//import { connect } from 'http2';

class UserManagement extends Component {
    constructor(props){
        super(props)
        this.state ={
            contract: "contract not queried yet",
            numAccts: -1,
            contractBal:-1,
            isExpanded:[]

        }
        var MyContract = this.GetContract();
        this.contractToState(MyContract);
    }

    GetContract() {
        return window.web3.eth.contract(ContractABI).at(ContractAddress);
    }

    contractToState(Contract) {
        Contract.accountCount.call( (e,response) => {
            let numAccts = parseInt(response.c.toString(10));
            this.setState({numAccts:numAccts})
            for (let acctNum=0;acctNum<numAccts;acctNum++){
                Contract.Accounts(acctNum,(e,res) => {
                    this.setAccountState(acctNum,e,res)


                    //var Contract = window.web3.eth.contract(ContractABI).at(ContractAddress);
                    //var acctNum = this.props.acctNum;
                    //find the # of users and loop through them
                    Contract.userCountsInAccount.call(acctNum, (e,response) => {
                        let numUsers = response.c.toString(10);
                        for (let i=0;i<numUsers;i++){
                            //add each user to global state
                            Contract.usersOfAccount(acctNum,i,(e,r)=>{
                                this.addUser(acctNum,i,e,r)
                            })
                        }
                    })

                }) 
            }
            //when should state be sorted??
        })
    }

     //changes global state to add user to account
     addUser(acctNum,i,e,r){
        this.props.addUserToAccount(acctNum,  {key:i, addy:r[0], canWrite : r[1]}    );
    }
    //changes global state to add account
    setAccountState = (i,e,r) => {
        this.props.addAccount({key:i,own:r[0],bal:r[1].toString(10)})
    }

    //changes the status of is users are displayed under the account
    ToggleUsers (acctNum) {
        let tmparr = this.state.isExpanded;
        tmparr[acctNum]=!this.state.isExpanded[acctNum]
        this.setState({isExpanded:tmparr})
    }
    //interacts with the smart contract to add a account
    addAccount = ()=> {
        this.GetContract().currentAccPrice.call((e,r)=>{
            this.GetContract().createAccount( {from: window.web3.eth.accounts[0], value:r}, function(e,r) {});
        })
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////   
    render() {
        return (
            <div className="main-tile">
                <TitleTile title="User Management Page">
                    <p>
                        The contract address is: <strong>{ContractAddress}</strong> and it has
                        <strong> {this.state.numAccts}</strong> account(s)
                    </p>
                </TitleTile>
                <div className="container-full">
                <HeaderRow 
                    row1="Account #" 
                    row2="Account Owner's Address" 
                    row3="Balance (Ether)" 
                    row4="Users"
                />
                {this.props.state.todo.accounts.map( (acct) => (
                     <div key={acct.key}>
                        {true? /*acct.own===this.props.verifiedAddress? REPLACE THIS TO HIDE NON OWNED ACCOUNTS */
                            <>
                                <RenderRow 
                                    account={acct} 
                                    isExpanded={this.state.isExpanded}
                                    expanded={this.ToggleUsers.bind(this)} 
                                />
                                {this.state.isExpanded[acct.key] ?
                                <>
                                <RenderSubRow 
                                    UserAcct={this.props.state.todo.accounts[acct.key]} 
                                    acctNum={acct.key}
                                />
                                <FooterSubRow account={acct} />
                                </>
                                :<></>}
                            </>
                        :<></>}
                    </div> 
                        
                ))}
                </div>
                <button onClick={this.addAccount}>add new account</button><br></br>
                
                
                <br></br><br></br>

                <button onClick={()=>{
                    console.log(this.props.state.todo.accounts)}}>
                consolelog redux state</button>


            </div>
            
        );
    };
};

//export default UserManagement;
const mapStateToProps = function(state){
    return{
        state
        //xxx:state.test.foo,
        //yyy:state.todo.todos
    }
}


export default connect(mapStateToProps,{addAccount,addUserToAccount})(UserManagement)









