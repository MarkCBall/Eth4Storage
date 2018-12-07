import React, { Component } from 'react';

import ContractABI, {ContractAddress} from '../ContractABI';


//CSS Files
//import './Header.css';

class UserManagement extends Component {
    constructor(props){
        super(props)
        this.state ={
            owner:"Not Updated",
            numAccts: -1,
            contractBal:-1,
            accounts:[
                {key:0, own:"addy1", balv1:2, balv2:2.1},
                {key:1, own:"addy2", balv1:2, balv2:2.1}
            ]
        }

        //console.log(this.state.accounts[0].own)
        //console.log(this.state.accounts)
    this.GetData();
    }
    //this.state.r = "yyy"

    GetData() {
        //make an instance of the contract
        var MyContract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        //owner field
        MyContract.owner.call( (e,response) => {this.setState({owner:response})} );
        //Contract balance
        window.web3.eth.getBalance(ContractAddress, (e,response) => {this.setState({contractBal:response.c[1]})} );//WHHHYYYY????
        //numAccounts
        MyContract.numAccts.call( (e,response) => {
            this.setState({numAccts:response.c[0]})//FIX THIS WEIRDNESS!
            //AccountsArray
            let arr = []//new Array()
            for (let i=0;i<response.c[0];i++){
                MyContract.Accounts(
                    i,
                    (e,res) => {
                        let ownr = res[0];
                        //im not sure which one is the correct balance and can't check now as all bals are exactly 1
                        let b1 = res[1].c[0];
                        let b2 = res[1].s;
                        //arr.push({"own":"addy1xx","balv1":20,"balv2":20.1});//{own:ownr,balv1:balv1r,balv2:balv2r};
                        //console.log(Array.isArray(arr))
                        //console.log(arr)

                        arr.push({key:i,own:ownr,balv1:b1,balv2:b2});
                        
                        //only render on the last looping to save processing - but last loop may be finished first??
                        //if (i>=response.c[0])
                            this.setState({accounts:arr})
                        
                        
                            //console.log(arr);
                        

                        // console.log("accXXcount# "+i)
                        // console.log(i+"The owner is " +response[0])
                        // console.log(i+"double check bal is " +response[1].c[0])
                        // console.log(i+"or is the bal "+ response[1].s)
                    }
                )
            }
            
            //arr[0]={own:"addy1xx",balv1:20,balv2:20.1};
            //arr[1]={own:"addy2xx",balv1:20,balv2:20.1};
            //console.log(arr);



            //console.log(result)
            //debugger;
            //this.setState({accounts:arr})

        });
        
        //UsersArray?? need to provide specific addy? diff for each Acct?

        

    }

    render() {
        return (
            <div className="main-tile">

            <br></br><br></br><br></br><br></br><br></br>
            <h1>This is the UserManagement page</h1>
            <p>Session ID:{this.props.sessionID}</p>

            <p>The owner of the account is: <strong>{this.state.owner}</strong></p>
            <p>The smart contract holds <strong>{this.state.numAccts}</strong> accounts</p>
            <p>The smart contract holds <strong>{this.state.contractBal/1000000000000000000}</strong> eth</p>
            
            
            {this.state.accounts.map((acct) => (
                <p key={acct.key}>
                Keyorder:{acct.key}<br></br> 
                Owned by:{acct.own}<br></br> 
                with balance of: {acct.balv1} or {acct.balv2}
                </p>
            ))}
            {/* {this.state.accounts[0].own} */}
           
            {/* <p>{this.state.accounts[1]}</p> */}



        
            </div>
        );
    };
};

export default UserManagement;