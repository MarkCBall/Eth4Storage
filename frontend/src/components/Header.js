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
        this.state = {
            addyPermission: {}
        }
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
        Contract.Accounts(acctNum, (e,resAcct)=>{
            this.props.addAccount({ key: acctNum, own: resAcct[0], bal: resAcct[1].toString(10) })
        })
    }

    addUserData(Contract, acctNum, userNum) {
        Contract.usersOfAccount(acctNum, userNum, (e,resUser)=>{
            this.props.addUserToAccount(acctNum, { key: userNum, addy: resUser[0], canWrite: resUser[1] });
        })
    }

    iterateUsers(Contract, acctNum) {
        Contract.userCountsInAccount.call(acctNum, (e,resNumUsers)=>{
        let numUsers = resNumUsers.toString(10);
            for (let userNum = 0; userNum < numUsers; userNum++) {
                this.addUserData(Contract, acctNum, userNum);
            }
        })
    }
    iterateAccounts(Contract,numAccts){
        for (let acctNum = 0; acctNum < numAccts; acctNum++) {
            this.addAccountData(Contract, acctNum)
            this.iterateUsers(Contract,acctNum)
        }
    }

    async contractToState() {
        let Contract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        let resNumAccts = await this.promisify(cb => Contract.accountCount.call(cb))
        let numAccts = parseInt(resNumAccts.toString(10));
        await this.iterateAccounts(Contract,numAccts)
        // for (let acctNum = 0; acctNum < numAccts; acctNum++) {
        //     this.addAccountData(Contract, acctNum)
        //     this.iterateUsers(Contract,acctNum)
        // }

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

                <button onClick={()=>  {
                console.log(this.state.addyPermission)
                this.logAccountsForAddress()
                }}>Show permission state</button>

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


