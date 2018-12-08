import React, { Component } from 'react';
import update from 'immutability-helper';


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
                {key:0, own:"addy1", balv1:2, balv2:2.1, expanded:false},
            ]
            //,
            //subv:n []
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
                            bal:res[1].toString(10),
                            expanded:false
                        });
                        //only sort and set array to state once
                        if (arr.length==response.c[0]){
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
                        <>
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
                                <div className="col-6" onClick={
                                    () => {
                                        let isExpanded = this.state.accounts[acct.key].expanded;
                                        const newArr = update(this.state.accounts, {[acct.key]: {expanded: {$set: !isExpanded}}  });
                                        this.setState({accounts:newArr})
                                    }
                                }>
                                Show more/less
                                </div>
                            </div>
                            <>
                                {acct.expanded ?
                                    <div className="row">
                                        <div className="col-1 col-solid">
                                        ----
                                        </div>
                                        <div className="col-4 col-solid">
                                        ----
                                        </div>
                                        <div className="col-1 col-dotted">
                                        ----
                                        </div>
                                        <div className="col-6">
                                        User addy here - make into loop
                                        </div>
                                    </div>
                                :<></>}
                            </>
                        </>

                    ))}{/* end mapping */}
                </div>
            </div>
        );
    };
};

export default UserManagement;