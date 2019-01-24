import { ADD_ACCOUNT } from "../constants/QueryContract";
import { ADD_USER_TO_ACCOUNT } from "../constants/QueryContract";
import { SET_CONTRACT } from "../constants/QueryContract";
import ContractABI, { ContractAddress } from "../../ContractABI";

export default {

    setContract:() =>{
        let Contract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        
        return (dispatch) =>
        dispatch ({
            type: SET_CONTRACT,
            payload: Contract    //window.web3.eth.contract(ContractABI).at(ContractAddress) }
        }) 
    },

    addAccount: (dispatch, acctNum) => {

        return ((dispatch, state) => {
            let Contract =state().QueryContract.contract;
            let AccountDataAsPromise = new Promise((resolve, reject) => {
                Contract.Accounts(acctNum, (e, resAcctAddress) => {
                    Contract.balanceOf.call(resAcctAddress,(e, r) => {

                        //         resolve(parseInt(r.toString(10)));
                    
                        resolve(
                            {
                                AdminAddress:resAcctAddress,
                                Balance: parseInt(r.toString(10))
                            }
                        );
                    })
                })
            });

            return AccountDataAsPromise.then((res) =>
                dispatch({
                    type: ADD_ACCOUNT,
                    payload: {
                        key: acctNum,
                        own: res.AdminAddress,
                        bal: res.Balance
                    }
                })
            )
        })
    },

    addUserToAccount: (dispatch, acctNum, userNum) => {

            return (dispatch,state) => {
                let Contract =state().QueryContract.contract;
                let UserDataAsPromise = new Promise((resolve, reject) => {
                    Contract.usersOfAccount(acctNum, userNum, (e, resUser) => {
                        resolve(resUser);
                    })
                });
                return UserDataAsPromise.then((res) =>
                    dispatch({
                        type: ADD_USER_TO_ACCOUNT,
                        payload: { 
                            user: {
                                key: acctNum,
                                addy: res[0],
                                canWrite: true// THIS NEEDS TO BE CHANGED AND DOWNSTREAM AS WELL
                            },
                            acctN: acctNum,
                        }
                    })
                )
            }
        }
    }
