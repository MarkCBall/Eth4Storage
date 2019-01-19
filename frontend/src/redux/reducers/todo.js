import { ADD_ACCOUNT } from "../constants/todo";
import { ADD_USER_TO_ACCOUNT } from "../constants/todo";

const initialState = {
  accounts: [],
  addyPermission: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ACCOUNT:
      //console.log("adding acct#",action.payload.key)
      let acctsAr = state.accounts.slice();
      let actN = action.payload.key;
      acctsAr[actN] = { users: [], ...acctsAr[actN], ...action.payload };
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
              action.payload.user.canWrite ||
              (addy in state.addyPermission &&
                acctN in state.addyPermission[addy] &&
                state.addyPermission[addy][acctN]) ||
              false
          }
        }
      };

    default:
      return state;
  }
}
