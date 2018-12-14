//import BigNumber from 'bignumber.js'
import {connect} from 'react-redux';
import React, { Component } from 'react';
import { addTodo } from "../redux/actions/todo";

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
            isExpanded:[],
            accounts:[]

        }
        var MyContract = this.GetContract();
        this.contractToState(MyContract);
    }

    GetContract() {
        return window.web3.eth.contract(ContractABI).at(ContractAddress);
    }

    contractToState(Contract) {
        Contract.accountCount.call( (e,response) => {
            let usersInAccount = parseInt(response.c.toString(10));
            this.setState({numAccts:usersInAccount})
            for (let i=0;i<usersInAccount;i++){
                Contract.Accounts(i,(e,res) => {
                        this.setAccountState(i,e,res)
                    }
                ) 
            }
            //when should state be sorted??
        })
    }

    setAccountState = (i,e,r) => {
        this.setState(prevState => ({ 
            accounts:[
                ...prevState.accounts,
                {key:i,own:r[0],bal:r[1].toString(10)}
            ]
        }))
    }

 
    ToggleUsers (acctNum) {
        let tmparr = this.state.isExpanded;
        tmparr[acctNum]=!this.state.isExpanded[acctNum]
        this.setState({isExpanded:tmparr})
    }
    addAccount = ()=> {
        this.GetContract().currentAccPrice.call((e,r)=>{
            this.GetContract().createAccount( {from: window.web3.eth.accounts[0], value:r}, function(e,r) {});
        })
    }
    

    //NOTE this only goes through accounts and not users inside each account
    //figure out redux and continue
    logAccountsForAddress(address){
        let accts = this.state.accounts;
        for (let i=0;i<accts.length;i++){
            if (accts[i].own === address)
                console.log("you own account#" + i)
            else
                console.log("you don't own account# " + i)
        }
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
                {this.state.accounts.map( (acct) => (
                     <div key={acct.key}>
                        {true? /*acct.own===this.props.verifiedAddress? REPLACE THIS TO HIDE NON OWNED ACCOUNTS */
                            <>
                                <RenderRow 
                                    account={acct} 
                                    expanded={this.ToggleUsers.bind(this)} 
                                />
                                {this.state.isExpanded[acct.key] ?
                                <>
                                <RenderSubRow 
                                    UserAcct={this.state.accounts[acct.key]} 
                                    rowNum={acct.key}
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
                <button onClick={()=>this.logAccountsForAddress(this.props.verifiedAddress)}>alert accounts possible</button>
                <br></br><br></br>
                <button onClick={()=> console.log(this.props.store.dispatch())}>consolelog store</button>
                <br></br>
                <button onClick={()=>console.log(this.props.state)}>consolelog todos</button>
                <br></br>
                <button onClick={()=>this.props.addTodo("take out cheeseburger")}>addTodo action?</button>
                
	


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



// const mapDispatchToProps = dispatch => ({
//     toggleTodo: id => dispatch(toggleTodo(id))
//   })


export default connect(mapStateToProps,{addTodo})(UserManagement)









