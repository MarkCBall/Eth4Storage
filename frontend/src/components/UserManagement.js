import React, { Component } from 'react';

import TitleTile from './SubUserManagement/TitleTile'
import RenderRow from './SubUserManagement/RenderRow'
import RenderSubRow from './SubUserManagement/RenderSubRow'
import RenderTitleRow from './SubUserManagement/RenderTitleRow'
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
            numAccts: -1,
            contractBal:-1,
            accounts:[
                {key:0, own:"addy1", balv1:2, balv2:2.1, expanded:false},
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

    render() {
        return (
            <div className="main-tile">
                <TitleTile title="User Management Page">
                    <p>
                        The contract address is: <strong>{ContractAddress}</strong> and it has
                        <strong> {this.state.numAccts}</strong> accounts and 
                        <strong> {this.state.contractBal/1000000000000000000}</strong> eth
                    </p>
                </TitleTile>

                <div className="container">
                    <RenderTitleRow>
                        <RenderRow 
                            row1="Account#"
                            row2="Managing Address"
                            row3="Balance"
                            row4="Users"
                        />
                    </RenderTitleRow>

                    {this.state.accounts.map( (acct) => (
                        <div key={acct.key}>
                            <RenderRow
                            rowNum={acct.key}                             
                            row1={acct.key}
                            row2={acct.own}
                            row3={acct.bal}
                            row4="Show more/less"
                            ToggleUsers={this.ToggleUsers.bind(this)}
                            />

                            

                            {acct.expanded ?
                                // add loop here
                                    
                                    <RenderSubRow
                                    UserAcct={this.state.testData[acct.key]}
                                    rowNum={acct.key}
                                    row1="----"
                                    row2="----"
                                    row3="----"
                                    row4="User addy here - make into loop"
                                    />
                            :<></>}


                        </div>

                    ))}
                </div>
            </div>
        );
    };
};

export default UserManagement;