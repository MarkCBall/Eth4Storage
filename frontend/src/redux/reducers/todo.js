import { ADD_ACCOUNT } from '../constants/todo';
import { ADD_USER_TO_ACCOUNT } from '../constants/todo';

const initialState = {
    accounts: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_ACCOUNT:
            console.log(action.payload.key, "acct created")
            return { ...state, accounts: [...state.accounts, action.payload] }
        case ADD_USER_TO_ACCOUNT:

            //copy state
            let acctsArr = state.accounts.slice()
            let acctN = action.payload.acctN
            //init account if undefined
            acctsArr[acctN] = acctsArr[acctN] ? acctsArr[acctN] : {}
            //init usersArray if blank
            if (!("users" in acctsArr[acctN]))
                acctsArr[acctN].users = [];
            //put payload into usersArray at user's key
            acctsArr[acctN].users[action.payload.user.key]=action.payload.user

            console.log("acct#"+acctN+" has added user#",action.payload.user.key)

            return { ...state, accounts: acctsArr }

        //break;
        default:
            return state;
    }
}

// DATA STRUCTURE
// [
//     {
//         key: 0,
//         own: "0x...",
//         bal: "100",
//         users: [
//             {
//                 key: 0,
//                 addy: "0x",
//                 canWrite: true
//             }
//         ]
//     }
// ]