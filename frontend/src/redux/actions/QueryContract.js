import { ADD_ACCOUNT } from "../constants/QueryContract";
import { ADD_USER_TO_ACCOUNT } from "../constants/QueryContract";
import ContractABI, { ContractAddress } from "../../ContractABI";

export default {

    addAccount: (dispatch, acctNum) => {
        //move this contract to global state
        let Contract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        //REFACTOR ME AWAY - (contract)

        //putting the callback into a promise - error handling not done?
        let AccountDataAsPromise = new Promise((resolve, reject) => {
            Contract.Accounts(acctNum, (e, resAcct) => {
                resolve(resAcct);
            })
        });
        //WHATS GOING ON HERE - it works, but why - why is this line needed?
        return (dispatch) => {
            //takes a promise 
            return AccountDataAsPromise.then((res) =>
                dispatch({
                    type: ADD_ACCOUNT,
                    payload: {
                        key: acctNum,
                        own: res
                    }
                })
            )
        }
    },

    addUserToAccount: (dispatch, acctNum, userNum) => {
    //move this contract to global state
    let Contract = window.web3.eth.contract(ContractABI).at(ContractAddress);
    //REFACTOR ME AWAY - (contract)

    //putting the callback into a promise - error handling not done?
    let UserDataAsPromise = new Promise((resolve, reject) => {
        Contract.usersOfAccount(acctNum, userNum, (e, resUser) => {
            resolve(resUser);
        })
    });
            return dispatch => {
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
