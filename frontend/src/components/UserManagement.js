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
    var MyContract = this.GetContract();
    this.SetOwner(MyContract);
    this.SetBalance(MyContract);
    this.GetData(MyContract);

    }

    GetContract() {
        return window.web3.eth.contract(ContractABI).at(ContractAddress);
    }

    SetOwner(Contract){
        Contract.owner.call( (e,response) => {this.setState({owner:response})} );
    }

    SetBalance(Contract){
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
                            bal:res[1].toString(10)
                        });

                        //DEAL WITH THIS CODE IN A CLEAN WAY
                            //sort in another function
                            //only set state once at the end of for loop - callback challenge
                        arr.sort((a,b) => {
                            if (a.key < b.key) 
                                return -1; 
                            return 1;
                        })
                        this.setState({accounts:arr});
                    }
                )
            }
        });
    }

    render() {
        return (
            <div className="main-tile">
                <h1>UserManagement page</h1>
                <p>
                    The contract address is: <strong>{ContractAddress}</strong> and it has
                    <strong> {this.state.numAccts}</strong> accounts and 
                    <strong> {this.state.contractBal/1000000000000000000}</strong> eth
                </p>
                <hr></hr>
                

                <div className="container">
                    <div className="row row-top">
                        <div className="col-1 col-solid">
                        Account#
                        </div>
                        <div className="col-4 col-solid">
                        Managing Address
                        </div>
                        <div className="col-1 col-dotted">
                        Balance
                        </div>
                        <div className="col-6">
                        Users
                        </div>
                    </div>{/* end title row */}
                    {this.state.accounts.map( (acct) => (
                        <div className="row" key={acct.key}>
                            <div className="col-1 col-solid">
                            {acct.key}
                            </div>
                            <div className="col-4 col-solid">
                            {acct.own}
                            </div>
                            <div className="col-1 col-dotted">
                            {acct.bal}
                            </div>
                            <div className="col-6">
                            NA
                            </div>
                        </div>
                    ))}{/* end mapping */}
                </div>
            </div>
        );
    };
};

export default UserManagement;