//import BigNumber from 'bignumber.js'

import React, { Component } from 'react';

import TitleTile from './SubUserManagement/TitleTile'
import RenderRow from './SubUserManagement/RenderRow'
import RenderSubRow from './SubUserManagement/RenderSubRow'
import HeaderRow from './SubUserManagement/HeaderRow'
import FooterSubRow from './SubUserManagement/FooterSubRow'

import ContractABI, {ContractAddress} from '../ContractABI';
//import DevelopmentData from './SubUserManagement/DevelopmentData';

//CSS Files
import './SubUserManagement/UserManagement.css'
//import { WSAEINVALIDPROCTABLE } from 'constants';

class UserManagement extends Component {
    constructor(props){
        super(props)
        this.state ={
            contract: "contract not reefined",
            numAccts: -1,
            contractBal:-1,
            isExpanded:[],
            accounts:[]

        }

        var MyContract = this.GetContract();
    //     this.SetOwner(MyContract);
    //     this.SetBalance();
        this.GetData(MyContract);

    //     //get new account state from express server
    //     // fetch('http://localhost:3000/users')
    //     // .then(function(response) {
    //     //     return response.json();
    //     // })
    //     // .then(data => {
    //     //     this.setState({accounts:JSON.parse(data)})
    //     //     // console.log("state is set to")
    //     //     // console.log(data);
    //     // })
      }
    GetContract() {
        return window.web3.eth.contract(ContractABI).at(ContractAddress);
    }



    GetData(Contract) {
        //numAccounts
        Contract.accountCount.call( (e,response) => {
            this.setState({numAccts:response.c.toString(10)})


        
    
    //         //AccountsArray
            let arr = [];
            let allFilled = 0 ;
            for (let i=0;i<parseInt(response.c.toString(10));i++){
                //console.log("num accounts is " +parseInt(response.c.toString(10)))

                Contract.Accounts(
                    i,
                    (e,res) => {
                        arr[i] = (this.state.accounts[i] || {key:i});
                        arr[i].key=i;
                        arr[i].own=res[0];
                        arr[i].bal=res[1].toString(10);
                        allFilled++;
                        //only sort and set array to state once
                        //needed as i is not necessarily sequential
                        if (allFilled===parseInt(response.c.toString(10))){
                            arr.sort((a,b) => { 
                                if (a.key < b.key)
                                    return -1;
                                return 1;
                                })
                            this.setState({accounts:arr});
                            //console.log(arr)
                            //console.log(response.c.toString(10))
                        }
                    }
                ); 
            }
        })
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
            if (accts[i].own == address)
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
                    row2="Managing Address" 
                    row3="Balance (Ether)" 
                    row4="Users"
                />
                {this.state.accounts.map( (acct) => (
                    <div key={acct.key}>
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
                    </div>
                ))}
                </div>
                <button onClick={this.addAccount}>add new account</button><br></br>
                <button onClick={()=>this.logAccountsForAddress(this.props.verifiedAddress)}>alert accounts possible</button>
            </div>
            
        );
    };
};

export default UserManagement;










