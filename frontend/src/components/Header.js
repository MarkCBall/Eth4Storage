import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'

//relative imports redux items
import { addAccount } from "../redux/actions/todo";
import { addUserToAccount } from "../redux/actions/todo";

//relative imports smart contract data
import ContractABI, {ContractAddress} from '../ContractABI';

//CSS Files
import './Header.css';



class Header extends Component {
    constructor(props){
        super(props)
        this.contractToState();
    }



    //WHERE WOULD THE GLOBAL STATE IDEALLY BE SET?????????
    //its done here in the header since the header only loads once... better ideas?
    contractToState() {
        //possible better algorithm, to allow sorting?
        //AWAIT get # of accounts
        //AWAIT loop through all accounts and get data
        //sort accounts order
        //AWAIT loop through accounts and get # of users in each account
        //AWAIT loop through each user and get data
        //loop through accounts and sort users

        //get an instance of the smart contract
        let Contract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        //find the number of accounts
        Contract.accountCount.call( (e,response) => {
            let numAccts = parseInt(response.c.toString(10));
            //loop through the accounts
            for (let acctNum=0;acctNum<numAccts;acctNum++){
                //get the account data (owner's address and balance)
                Contract.Accounts(acctNum,(e,res) => {
                    //add each account to global state
                    this.setAccountState(acctNum,e,res)
                    //get the number of users for the account
                    Contract.userCountsInAccount.call(acctNum, (e,response) => {
                        let numUsers = response.c.toString(10);
                        //loop through each user
                        for (let i=0;i<numUsers;i++){
                            //get the user's data (address, and write permission)
                            Contract.usersOfAccount(acctNum,i,(e,r)=>{
                                //add each user to global state
                                this.addUser(acctNum,i,e,r)
                            })
                        }
                    })
                }) 
            }
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

    render() {
        return (
            <div className="header-box">
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                        <br></br>
                        <Link to="Upload">Upload Page</Link>
                        </div>
                        <div className="col-sm">
                        <br></br>
                        <Link to="Download">Download Page</Link>
                        </div>
                        <div className="col-sm">
                        <br></br>
                        <Link to="UserManagement">User Management Page</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default connect(null,{addAccount,addUserToAccount})(Header)


