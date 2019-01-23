import { ADD_ACCOUNT } from "../constants/todo";
import { ADD_USER_TO_ACCOUNT } from "../constants/todo";
import ContractABI, { ContractAddress } from "../../ContractABI";

//let key = 0;

export default {

      addAccount: (dispatch, obj) => {
        
        
        // let promisify = (inner) =>
        //     new Promise((resolve, reject) =>
        //         inner((err, res) => {
        //             if (err) {
        //                 reject(err);
        //             } else {
        //                 resolve(res);
        //             }
        //         })
        //     )

        let Contract = window.web3.eth.contract(ContractABI).at(ContractAddress);
        let acctNum = obj.key

        let testFunc2 = new Promise ((resolve, reject) =>{
            Contract.Accounts(acctNum, (e, resAcct) => {
                //resolve(2)
                resolve(resAcct);
            })
        });

        testFunc2.then(res => console.log(res));

                //return dispatch => {
                    return dispatch => {
                        return testFunc2.then((res)=>
                                        dispatch({
                                            type: ADD_ACCOUNT,
                                            // payload:
                                            // {
                                            //     key: acctNum,
                                            //     own: resAcct
                                            // }
                                            payload: {
                                                key:acctNum,//+testFunc2(),
                                                own:res 
                                                //...obj 
                                            }
                                        })
                        )
                                           
                                        }
                    //}




        // //return dispatch => {
        //                     return dispatch => {
        //     //return testFunc2().then((res)=>
        //                     dispatch({
        //                         type: ADD_ACCOUNT,
        //                         // payload:
        //                         // {
        //                         //     key: acctNum,
        //                         //     own: resAcct
        //                         // }
        //                         payload: {
        //                             key:obj.key,//+testFunc2(),
        //                             own:obj.own 
        //                             //...obj 
        //                         }
        //                     })
        //     //)
                               
        //                     }
        // //}

    },

    //WORKING CODE
    // addAccount: (dispatch, obj) => {
    //     return dispatch => {
    //         dispatch({
    //             type: ADD_ACCOUNT,
    //             payload: { ...obj }
    //         })
    //     }
    // },


    addUserToAccount : (dispatch, acctN, user) => {
        return dispatch => {
            dispatch({
                type: ADD_USER_TO_ACCOUNT,
                payload: { acctN: acctN, user: user }
            })
        }
    }





}
