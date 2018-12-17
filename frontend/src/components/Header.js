import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

//relative imports redux items
import { addAccount } from "../redux/actions/todo";
import { addUserToAccount } from "../redux/actions/todo";

//relative imports smart contract data
import ContractABI, { ContractAddress } from '../ContractABI';

//CSS Files
import './Header.css';



class Header extends Component {
    constructor(props) {
        super(props)
        this.contractToState();
    }

    // //WHERE WOULD THE GLOBAL STATE IDEALLY BE SET?????????
    // //its done here in the header since the header only loads once... better ideas?


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

    addAccountData(Contract, acctNum) {

        // var date = new Date();
        // var curDate = null;
        // do { curDate = new Date(); }
        // while(curDate-date < 500);


        // let resAcct = await this.promisify(cb => Contract.Accounts(acctNum, cb))
        // this.props.addAccount({ key: acctNum, own: resAcct[0], bal: resAcct[1].toString(10) })

        Contract.Accounts(acctNum, (e,resAcct)=>{
            this.props.addAccount({ key: acctNum, own: resAcct[0], bal: resAcct[1].toString(10) })
        })
    }

    addUserData(Contract, acctNum, userNum) {
        // let resUser = await this.promisify(cb => Contract.usersOfAccount(acctNum, userNum, cb))
        // this.props.addUserToAccount(acctNum, { key: userNum, addy: resUser[0], canWrite: resUser[1] });

        Contract.usersOfAccount(acctNum, userNum, (e,resUser)=>{
            this.props.addUserToAccount(acctNum, { key: userNum, addy: resUser[0], canWrite: resUser[1] });
        })
    }

    iterateUsers(Contract, acctNum) {
        // //get the number of users for the account
        // let resNumUsers = await this.promisify(cb => Contract.userCountsInAccount.call(acctNum, cb))
        // let numUsers = resNumUsers.toString(10);
        //  //loop through each user
        //  for (let userNum = 0; userNum < numUsers; userNum++) {
        //     this.addUserData(Contract, acctNum, userNum)
        // }

        Contract.userCountsInAccount.call(acctNum, (e,resNumUsers)=>{
        let numUsers = resNumUsers.toString(10);
            //loop through each user
            for (let userNum = 0; userNum < numUsers; userNum++) {
                this.addUserData(Contract, acctNum, userNum);
            }
        })
    }

    async contractToState() {
        let Contract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        let resNumAccts = await this.promisify(cb => Contract.accountCount.call(cb))
        let numAccts = parseInt(resNumAccts.toString(10));
        for (let acctNum = 0; acctNum < numAccts; acctNum++) {
            this.addAccountData(Contract, acctNum)
            this.iterateUsers(Contract, acctNum)
        }

        // let Contract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        // Contract.accountCount.call((e,resNumAccts)=>{
        //     let numAccts = parseInt(resNumAccts.toString(10));
        //     for (let acctNum = 0; acctNum < numAccts; acctNum++) {
        //         this.iterateUsers(Contract, acctNum)
        //         this.addAccountData(Contract, acctNum)
        //     }
        // })
    }

    render() {
        return (
            <div className="header-box">
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <br></br>
                            <Link to="Upload">Upload Page</Link>
                        </div>
                        <div className="col-sm">
                            <br></br>
                            <Link to="Download">Download Page</Link>
                        </div>
                        <div className="col-sm">
                            <br></br>
                            <Link to="UserManagement">User Management Page</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = function (state) {
    return {
        state
    }
}

export default connect(mapStateToProps, { addAccount, addUserToAccount })(Header)


