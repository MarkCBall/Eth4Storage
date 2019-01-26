
import { ADD_ACCOUNT } from "../constants/QueryContract";
import { ADD_USER_TO_ACCOUNT } from "../constants/QueryContract";
import { SET_CONTRACT } from "../constants/QueryContract";
import { SET_PRICES } from "../constants/QueryContract";

const initialState = {
  accounts: [],
  addyPermission: {},
  contract: {},
  prices: {}
};

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_PRICES:
    return {...state, prices:action.payload}//{AccPrice:action.payload.res.AccPrice,UserPrice:action.payload.res.UserPrice} }

    case SET_CONTRACT:
    //console.log(action.payload)
    return {...state,contract:action.payload}

    case ADD_ACCOUNT:
      //console.log("adding acct#",action.payload.key)
      let acctsAr = state.accounts.slice();
      let actN = action.payload.key;
      acctsAr[actN] = { users: [], ...acctsAr[actN], ...action.payload };
      //console.log(acctsAr)
      return { ...state, accounts: acctsAr };

    case ADD_USER_TO_ACCOUNT:
      //copy state and make variables for legibility
      let acctsArr = state.accounts.slice();
      let acctN = action.payload.acctN;
      let userN = action.payload.user.key;
      //init account if undefined
      acctsArr[acctN] = acctsArr[acctN] ? acctsArr[acctN] : { users: [] };
      //set user to payload
      acctsArr[acctN].users[userN] = action.payload.user;
      //console.log("acct#"+acctN+" has added user#",acctsArr[acctN].users[userN].key)
      let addy = action.payload.user.addy;
      return {
        ...state,
        accounts: acctsArr,
        addyPermission: {
          ...state.addyPermission,
          [addy]: {
            ...state.addyPermission[addy],
            [acctN]:
              action.payload.user.permission
          }
        }
      };

    default:
      return state;
  }
}
