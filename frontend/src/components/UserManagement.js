//import BigNumber from 'bignumber.js'

import React, { Component } from 'react';

import TitleTile from './SubUserManagement/TitleTile'
import RenderRow from './SubUserManagement/RenderRow'
import RenderSubRow from './SubUserManagement/RenderSubRow'
import RowBotBorder from './SubUserManagement/RowBotBorder'
import update from 'immutability-helper';


import ContractABI, {ContractAddress} from '../ContractABI';
import DevelopmentData from './SubUserManagement/DevelopmentData';





//CSS Files
import './SubUserManagement/UserManagement.css'

class UserManagement extends Component {
    constructor(props){
        super(props)
        this.state ={
            owner:"Not Updated",
            contract: "contract not reefined",
            numAccts: -1,
            contractBal:-1,
            accounts:[
                {key:0, own:"addy1", bal:0., expanded:false},
            ], 
            testData:DevelopmentData
            //,
            //subv:n []
        }
    var MyContract = this.GetContract();
    this.SetOwner(MyContract);
    this.SetBalance();
    this.GetData(MyContract);
    }
    GetContract() {
        return window.web3.eth.contract(ContractABI).at(ContractAddress);
    }
    SetOwner(Contract){
        Contract.owner.call( (e,response) => {this.setState({owner:response})} );
    }
    SetBalance(){
        window.web3.eth.getBalance(
            ContractAddress, (e,response) => {
                this.setState({contractBal:response.toString(10)})
            } 
        )   
    }
    GetData(Contract) {
        //numAccounts
        Contract.numAccts.call( (e,response) => {
            this.setState({numAccts:response.c.toString(10)})
            //AccountsArray
            let arr = [];
            for (let i=0;i<response.c[0];i++){
                Contract.Accounts(
                    i,
                    (e,res) => {
                        arr.push({
                            key:i,
                            own:res[0],
                            bal:res[1].toString(10),
                            expanded:false
                        });
                        //only sort and set array to state once
                        if (arr.length===response.c[0]){
                            arr.sort((a,b) => { 
                                if (a.key < b.key)
                                    return -1;
                                return 1;
                             })
                            this.setState({accounts:arr});
                        }
                    }
                )
            }
        });
    }

    ToggleUsers (acctNum) {
        let isExpanded = this.state.accounts[acctNum].expanded;
        let newArr = update(this.state.accounts, {[acctNum]: {expanded: {$set: !isExpanded}}  });
        this.setState({accounts:newArr})
    }

    ShowMoreLessText(acct){
        return acct.expanded ? "Show less" : "Show more"
    }

    changeOwner(acctN){
        //TO MAKE METAMASK CALL HERE!!this.MyContract
        //use a variable for getcontract instead of calling the function again
        
        console.log("change owner function called on account# " + acctN)
        console.log("change owner function called on contract " + this.GetContract())

        //function giveOwnership(uint _Acct, address _newowner) public {
        //this.GetContract().giveOwnership({0, })

        //0x0F7Cd2D9F4CEc1f7E01f880315Fd56101095fF87 account 1
        //0x396e328532AC99C238730Ff4B7D185D7A9920C1C account 2

    }

    addAccount = ()=> {
        //get value parameter from the contract directly
        this.GetContract().currentAccPrice.call((e,r)=>{
            //console.log(r)
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
                        <strong> {this.state.numAccts}</strong> account(s) and 
                        <strong> {this.state.contractBal/1000000000000000000}</strong> eth
                    </p>
                </TitleTile>

                <div className="container-full">
                {/* THIS IS FLAWED AS IT STILL ASKS FOR A TOGGLE USER... */}
                    <RowBotBorder>
                        <RenderRow 
                            row1="Account #"
                            row2="Managing Address"
                            row3="Balance (Ether)"
                            row4="Users"
                            row4onclick={()=>{}}
                        />
                        {/* Passing a blank toggleusers is not ideal */}
                    </RowBotBorder>

                    {this.state.accounts.map( (acct) => (
                        <div key={acct.key}>
                            <RenderRow
                            rowNum={acct.key}                             
                            row1={acct.key}
                            row2={acct.own}

                            row3={acct.bal/1000000000000000000}
                            row4={this.ShowMoreLessText(acct)}
                            row4onclick={this.ToggleUsers.bind(this)}
                         />

                            {acct.expanded ?
                                // add loop here
                                <>
                                    
                                    <RenderSubRow
                                    UserAcct={this.state.testData[acct.key]}
                                    rowNum={acct.key}
                                    />

                                    {/* THIS IS FLAWED AS IT STILL ASKS FOR A TOGGLE USER... */}
                                    <RowBotBorder>
                                        <RenderRow
                                        row2={<button onClick={()=>this.changeOwner(acct.key)}>Change owner</button>}
                                        row4onclick={()=>{}}
                                        rowNum={acct.key+"tail"}                             
                                        row4={<>
                                            <button>Add</button> 
                                            <input type="text" placeholder="User address"></input>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <button>Create</button>
                                            <select>
                                                <option value="View">View Only</option>
                                                <option value="Write">Write or view</option>
                                            </select>
                                            </>}

                                        />
                                    </RowBotBorder>
                                </>

                            :<></>}


                        </div>

                    ))}
                    <button onClick={this.addAccount}>add new account</button>
                </div>
            </div>
        );
    };
};

export default UserManagement;