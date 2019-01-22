import React, { Component } from "react";
import { connect } from "react-redux";

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


    //promisify used to learn more code
    promisify = (inner) =>
        new Promise((resolve, reject) =>
            inner((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            })
        )
    //pulls smart contract data semi-asyncronously
    async contractToState() {
        let Contract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        //find the number of account in the contract - done with promise
        let resNumAccts = await this.promisify(cb =>
            Contract.accountCount.call(cb)
        );
        let numAccts = parseInt(resNumAccts.toString(10));
        //iterate over the accounts in the contract
        for (let acctNum = 0; acctNum < numAccts; acctNum++) {
            this.addAccountData(Contract, acctNum)
            this.iterateUsers(Contract, acctNum)
        }
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

export default connect(
    mapStateToProps,
    { addAccount, addUserToAccount }
)(Header);
