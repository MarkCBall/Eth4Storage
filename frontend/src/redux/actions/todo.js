import { ADD_ACCOUNT } from "../constants/todo";
import { ADD_USER_TO_ACCOUNT } from "../constants/todo";

//let key = 0;

export const addAccount = obj => ({
  type: ADD_ACCOUNT,
  payload: {
    //		id: ++key,
    ...obj
  }
});

export const addUserToAccount = (acctN, user) => ({
  type: ADD_USER_TO_ACCOUNT,
  payload: { acctN: acctN, user: user } //,obj]//,{...obj}]
});
