import React, { Component } from "react";
import { connect } from "react-redux";
//import store from "../redux/index";

//relative imports redux items
import { addAccount } from "../redux/actions/todo";
import { addUserToAccount } from "../redux/actions/todo";

//relative imports smart contract data
import ContractABI, { ContractAddress } from "../ContractABI";


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //addyPermission: {}
        }
        this.contractToState();
    }

    // //WHERE WOULD THE GLOBAL STATE IDEALLY BE SET?????????
    // //its done here in the header since the header only loads once... better ideas?



    //pulls smart contract data semi-asyncronously
    contractToState() {
        let Contract = window.web3.eth.contract(ContractABI).at(ContractAddress);

        Contract.accountCount.call((e, resNumAccts) => {
            let numAccts = parseInt(resNumAccts.toString(10));
            for (let acctNum = 0; acctNum < numAccts; acctNum++) {
                this.addAccountData(Contract, acctNum)
                this.iterateUsers(Contract, acctNum)
            }
        })
    }
    //adds the ethereum address of admin to each account
    addAccountData(Contract, acctNum) {
        Contract.Accounts(acctNum, (e, resAcct) => {
            this.props.addAccount({
                key: acctNum,
                own: resAcct//account admin's ethereum address
            });
        });
    }
    //pulls user info from contract into state
    iterateUsers(Contract, acctNum) {
        //find the number of users in the account - done as a callback
        Contract.userCountsInAccount.call(acctNum, (e, resNumUsers) => {
            let numUsers = resNumUsers.toString(10);
            //iterate over each user in the account -- should this be async????
            for (let userNum = 0; userNum < numUsers; userNum++) {
                this.addUserData(Contract, acctNum, userNum);
            }
        });
    }
    //adds user's address and permission
    addUserData(Contract, acctNum, userNum) {
        Contract.usersOfAccount(acctNum, userNum, (e, resUser) => {
            this.props.addUserToAccount(acctNum, {
                key: userNum,
                addy: resUser[0],
                canWrite: resUser[1]
            });
        });
    }


    render() {
        return <div />;
    }
}

const mapStateToProps = function (state) {
    return {
        state
    };
};

// const mapDispatchToProps = dispatch => ({
//     addAccount:   (i) =>   dispatch(addAccount(i))    , 
//     addUserToAccount: (i) >  dispatch(addAccount( i))
// })

export default connect(
    mapStateToProps,
    { addAccount, addUserToAccount } //mapDispatchToProps
)(Header);
