import React, { Component } from "react";
import { connect } from "react-redux";

//relative imports redux items
import todoActions from "../redux/actions/todo";

//relative imports smart contract data
import ContractABI, { ContractAddress } from "../ContractABI";


class Header extends Component {
    constructor(props) {
        super(props)
        this.contractToState();
    }


    //pulls smart contract data semi-asyncronously
    contractToState() {
        let Contract = window.web3.eth.contract(ContractABI).at(ContractAddress);

        Contract.accountCount.call((e, resNumAccts) => {
            let numAccts = parseInt(resNumAccts.toString(10));
            for (let acctNum = 0; acctNum < numAccts; acctNum++) {
                this.props.addAccount(acctNum);
                this.iterateUsers(Contract, acctNum)
            }
        })
    }
    //pulls user info from contract into state
    iterateUsers(Contract, acctNum) {
        //find the number of users in the account - done as a callback
        Contract.userCountsInAccount.call(acctNum, (e, resNumUsers) => {
            let numUsers = resNumUsers.toString(10);
            //iterate over each user in the account -- should this be async????
            for (let userNum = 0; userNum < numUsers; userNum++) {
                this.props.addUserToAccount(acctNum, userNum);
            }
        });
    }
 


    render() {
        return <div />;
    }
}


function mapDispatchToProps(dispatch){
    return {
        addAccount:(acctNum) =>{
            dispatch(todoActions.addAccount(dispatch,acctNum))
        },
        addUserToAccount:(acctNum,user) => {
            dispatch(todoActions.addUserToAccount(dispatch,acctNum,user))
        }
    }
}

export default connect(null,mapDispatchToProps)(Header);
