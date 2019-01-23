import { ADD_ACCOUNT } from "../constants/todo";
import { ADD_USER_TO_ACCOUNT } from "../constants/todo";
import ContractABI, { ContractAddress } from "../../ContractABI";

//let key = 0;

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
        return () => {
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



        addUserToAccount: (dispatch, acctN, user) => {
            return dispatch => {
                dispatch({
                    type: ADD_USER_TO_ACCOUNT,
                    payload: { acctN: acctN, user: user }
                })
            }
        }





    }
