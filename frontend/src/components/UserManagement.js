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

class UserManagement extends Component {
    constructor(props){
        super(props)
        this.state ={
            owner:"Not Updated",
            contract: "contract not reefined",
            numAccts: -1,
            contractBal:-1,
            isExpanded:[],
            accounts:[
                {
                    key:0,
                    own:'0x3f040ef68e211d265a705f2066a33756c938615f',
                    SubUserAddys:[
                        {key:0,val:'tezp9st'},
                        {key:1,val:'ahh'}
                    ]
                }
                ,
                {
                    key:1,
                    own:'0x396e328532ac99c238730ff4b7d185d7a9920c1c',
                    SubUserAddys:[
                        {key:0,val:'garbage'},
                        {key:1,val:"0x396e328532AC99C238730Ff4B7D185D7A9920C1C"},
                        {key:2,val:'is'},
                        {key:3,val:'stored'},
                        {key:4,val:'here'}
                    ]
                }
            ]//, 
            //testData:DevelopmentData
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
            let allFilled = 0 ;
            for (let i=0;i<response.c[0];i++){
                Contract.Accounts(
                    i,
                    (e,res) => {
                        arr[i] = (this.state.accounts[i] || {key:i});
                        arr[i].key=i;
                        arr[i].own=res[0];
                        arr[i].bal=res[1].toString(10);
                        allFilled++;
                        //only sort and set array to state once
                        if (allFilled===response.c[0]){
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
                    <HeaderRow row1="Account #" row2="Managing Address" row3="Balance (Ether)" row4="Users"/>
                    {this.state.accounts.map( (acct) => (
                        <div key={acct.key}>
                            <RenderRow account={acct} expanded={this.ToggleUsers.bind(this)} />
                            {this.state.isExpanded[acct.key] ?
                                <>
                                <RenderSubRow UserAcct={this.state.accounts[acct.key]} rowNum={acct.key}/>
                                <FooterSubRow account={acct} />
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