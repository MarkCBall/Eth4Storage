//import BigNumber from 'bignumber.js'

import React, { Component } from 'react';

import TitleTile from './SubUserManagement/TitleTile'
//import RenderRow from './SubUserManagement/RenderRow'
//import RenderSubRow from './SubUserManagement/RenderSubRow'
//import HeaderRow from './SubUserManagement/HeaderRow'
//import FooterSubRow from './SubUserManagement/FooterSubRow'

import ContractABI, {ContractAddress} from '../ContractABI';
//import DevelopmentData from './SubUserManagement/DevelopmentData';

//CSS Files
import './SubUserManagement/UserManagement.css'

class UserManagement extends Component {
    constructor(props){
        super(props)
        this.state ={
            contract: "contract not reefined",
            numAccts: -1,
            contractBal:-1,
            isExpanded:[],
            //remember to remove user as user to old accounts when when added to new one
            //ie no address can be user to two accounts at the same time
            // accounts:[
            //     {
            //         key:0,
            //         own:'0x3f040ef68e211d265a705f2066a33756c938615f',
            //         SubUserAddys:[
            //         ]
            //     }
            //     ,
            //     {
            //         key:1,
            //         own:'0x396e328532ac99c238730ff4b7d185d7a9920c1c',
            //         SubUserAddys:[
            //             {key:0,val:"0x396e328532AC99C238730Ff4B7D185D7A9920C1C"},
            //             {key:1,val:"0x0F7Cd2D9F4CEc1f7E01f880315Fd56101095fF87"},   
            //             {key:2,val:"0x24c73c0E61F7F3F62B89A5BD521f30e6804Ea86B"}
            //         ]
            //     },
            //     {
            //         key:2,
            //         own:'0x0f7cd2d9f4cec1f7e01f880315fd56101095ff87',
            //         SubUserAddys:[
            //             {key:0,val:"0x0F7Cd2D9F4CEc1f7E01f880315Fd56101095fF87"}, 
            //         ]
            //     }
            // ]
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
    // SetOwner(Contract){
    //     //IS THIS USED ANYWHERE???
    //     Contract.owner.call( (e,response) => {this.setState({owner:response})} );
    // }
    //THIS HAS BEEN REMOVED FROM THE SMART CONTRACT
    // SetBalance(){
    //     window.web3.eth.getBalance(
    //         ContractAddress, (e,response) => {
    //             this.setState({contractBal:response.toString(10)})
    //         } 
    //     )   
    // }


    GetData(Contract) {
        //numAccounts
        Contract.accountCount.call( (e,response) => {
            this.setState({numAccts:response.c.toString(10)})


        })
    }
    //         //AccountsArray
    //         let arr = [];
    //         let allFilled = 0 ;
    //         for (let i=0;i<response.c[0];i++){
    //             Contract.Accounts(
    //                 i,
    //                 (e,res) => {
    //                     arr[i] = (this.state.accounts[i] || {key:i});
    //                     arr[i].key=i;
    //                     arr[i].own=res[0];
    //                     arr[i].bal=res[1].toString(10);
    //                     allFilled++;
    //                     //only sort and set array to state once
    //                     //needed as i is not necessarily sequential
    //                     if (allFilled===response.c[0]){
    //                         arr.sort((a,b) => { 
    //                             if (a.key < b.key)
    //                                 return -1;
    //                             return 1;
    //                             })
    //                         this.setState({accounts:arr});
    //                         //console.log(arr)
    //                         //console.log(response.c.toString(10))
    //                     }
    //                 }
    //             ); 
    //         }
    //     })
    // }
 
    // ToggleUsers (acctNum) {
    //     let tmparr = this.state.isExpanded;
    //     tmparr[acctNum]=!this.state.isExpanded[acctNum]
    //     this.setState({isExpanded:tmparr})
    // }
    // addAccount = ()=> {
    //     this.GetContract().currentAccPrice.call((e,r)=>{
    //         this.GetContract().createAccount( {from: window.web3.eth.accounts[0], value:r}, function(e,r) {});
    //     })
    // }

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






            </div>
        );
    };
};

export default UserManagement;




// <div className="container-full">
// <HeaderRow 
//     row1="Account #" 
//     row2="Managing Address" 
//     row3="Balance (Ether)" 
//     row4="Users"
// />
// {this.state.accounts.map( (acct) => (
//     <div key={acct.key}>
//         <RenderRow 
//             account={acct} 
//             expanded={this.ToggleUsers.bind(this)} 
//         />
//         {this.state.isExpanded[acct.key] ?
//             <>
//             <RenderSubRow 
//                 UserAcct={this.state.accounts[acct.key]} 
//                 rowNum={acct.key}
//             />
//             <FooterSubRow account={acct} />
//             </>
//         :<></>}
//     </div>
// ))}
// <button onClick={this.addAccount}>add new account</button>
// </div>