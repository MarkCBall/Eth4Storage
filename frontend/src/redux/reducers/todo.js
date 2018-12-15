import { ADD_ACCOUNT } from '../constants/todo';
import { ADD_USER_TO_ACCOUNT } from '../constants/todo';

const initialState = {
  accounts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ACCOUNT:
      return {...state, accounts: [action.payload, ...state.accounts]}
    case ADD_USER_TO_ACCOUNT:
      //copy the state array
      let arr = state.accounts.slice();
      //get the index in accounts for account specified and reference
      let arrIndex = arr.findIndex(o => o.key === action.payload.acctN);
      //reference the specified account
      let acct = arr[arrIndex]
      //make a new users array to go in the account
      let newUsers = (acct.users) ? acct.users : []
      //put the payload user into the users array
      newUsers.push(action.payload.user)
      arr[arrIndex].users = newUsers
      //replace state accounts with accounts array
      return {...state, accounts:arr}

      //break;
    default:
      return state;
  }
}