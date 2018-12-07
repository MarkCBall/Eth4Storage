import React, { Component } from 'react';

import ContractABI, {ContractAddress} from '../ContractABI';


//CSS Files
//import './Header.css';

class UserManagement extends Component {

    //infura API key
    //https://ropsten.infura.io/v3/8d2a7e57caa64b7c8a2444a762865c01


    GetData = () => {
         //var ContractInstance = new window.web3.eth.contract(ContractABI, ContractAddress)
        //console.log(ContractInstance);
        //DON'T DELETE ORIGINAL WORKING VERSION


        // var web3 = new Web3(new Web3.providers.HttpProvider(
        //     'https://ropsten.infura.io/v3/8d2a7e57caa64b7c8a2444a762865c01'
        // ));

        //console.log(ContractABI);
        //console.log("break line");
        //console.log(JSON.parse(ContractABI));

        var MyContract = window.web3.eth.contract(ContractABI);
        console.log(MyContract)

        // instantiate by address
        //var contractInstance = MyContract.at("0x7023aCfD191cf652db0168d67bF6652f9e4aBA72");
        // console.log(contractInstance);

        //console.log(new window.web3.eth.contract(ContractABI).at(ContractAddress))

        //var callData = ContractInstance.owner.call();
        //console.log(callData);


        //var result = myContractInstance.myConstantMethod('myParam');

        return "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxx";
    }

//     // creation of contract object
// 
// // initiate contract for an address
// var myContractInstance = MyContract.at('0x78e97bcc5b5dd9ed228fed7a4887c0d7287344a9');
// var result = myContractInstance.myConstantMethod('myParam');
// console.log(result) // '0x25434534534'
// myContractInstance.myStateChangingMethod('someParam1', 23, {value: 200, gas: 2000}, function(err, result){ ... });


    render() {
        return (
            <div className="main-tile">

            <br></br><br></br><br></br><br></br><br></br>
            <h1>This is the UserManagement page</h1>

            <p>{this.props.sessionID}</p>

            <p>enter your account number <input type="text"></input></p>

            temp show output of GetData function
            <p>{this.GetData()}</p>

            <br></br><br></br><br></br><br></br>

            <p> THEe contract address is {ContractAddress}</p>
            <p></p>
            <p> the contract ABI is</p>
        
            </div>
        );
    };
};

export default UserManagement;