import React, { Component } from 'react';


import ContractABI, {ContractAddress} from '../ContractABI';


//CSS Files
import './UserManagement.css'

class UserManagement extends Component {
    constructor(props){
        super(props)
        this.state ={
            owner:"Not Updated",
            numAccts: -1,
            contractBal:-1,
            accounts:[
                {key:0, own:"addy1", balv1:2, balv2:2.1},
            ]
        }
    this.GetData();
    }

    GetData() {
        //make an instance of the contract
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        //owner field
        MyContract.owner.call( (e,response) => {this.setState({owner:response})} );
        //Contract balance
        window.web3.eth.getBalance(ContractAddress, (e,response) => {
            this.setState({contractBal:response.toString(10)} )//CHECK BIG NUMBER DOCS FOR WHY!
        })

        //numAccounts
        MyContract.numAccts.call( (e,response) => {
            this.setState({numAccts:response.c.toString(10)})
            //AccountsArray
            let arr = [];
            for (let i=0;i<response.c[0];i++){
                MyContract.Accounts(
                    i,
                    (e,res) => {
                        arr.push({
                            key:i,
                            own:res[0],
                            bal:res[1].toString(10)
                        });
                        this.setState({accounts:arr});
                    }
                )
            }
        });
        //UsersArray?? need to provide specific addy? diff for each Acct?
    }

    render() {
        return (
            <div className="main-tile tabbed">
                <h1>This is the UserManagement page</h1>
                <p>
                    The contract address is: <strong>{ContractAddress}</strong> and it has
                    <strong> {this.state.numAccts}</strong> accounts and 
                    <strong> {this.state.contractBal/1000000000000000000}</strong> eth
                </p>
                <hr></hr>
                
                
                {this.state.accounts.map(
                    (acct) => (
                        <div className="Accounts" key={acct.key}>
                            <strong>AccountID: </strong>{acct.key}<br></br> 
                            <strong>Owned by: </strong>{acct.own}<br></br> 
                            <strong>with balance of: </strong>{acct.bal} <br></br>
                            <div className="tabbed">
                                <strong>Address Permissions:</strong><br></br>
                                {/* how to let the user add stuff here?? */}
                                Permissioned User Address:<input type="text"></input>
                            </div>
                        <br></br></div>
                    )
                )}




        
            </div>
        );
    };
};

export default UserManagement;