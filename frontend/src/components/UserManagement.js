import React, { Component } from 'react';
import {connect} from 'react-redux';

//relative imports redux items
import { addAccount } from "../redux/actions/todo";
import { addUserToAccount } from "../redux/actions/todo";

//relative imports react items
import TitleTile from './SubUserManagement/TitleTile'
import RenderRow from './SubUserManagement/RenderRow'
import RenderSubRow from './SubUserManagement/RenderSubRow'
import HeaderRow from './SubUserManagement/HeaderRow'
import FooterSubRow from './SubUserManagement/FooterSubRow'

//relative imports smart contract data
import ContractABI, {ContractAddress} from '../ContractABI';

//CSS Files
import './SubUserManagement/UserManagement.css'


class UserManagement extends Component {
    constructor(props){
        super(props)
        this.state ={
            isExpanded:[]
        }


////////////////START GLOBAL STATE STUFF TO PUT ELSEWHERE
        this.contractToState();
    }

    contractToState() {
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
////////////////END GLOBAL STATE THATS ABOVE//////////////////



    
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
                        <strong> {this.props.state.todo.accounts.length}</strong> account(s)
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

const mapStateToProps = function(state){
    return{
        state
    }
}

export default connect(mapStateToProps,{addAccount,addUserToAccount})(UserManagement)









