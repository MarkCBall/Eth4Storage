import { combineReducers, createStore } from "redux";

import todo from "./reducers/todo";
//import test from "./reducers/test";
const rootReducer = combineReducers({
  todo,
  //test
});

export default createStore(rootReducer);
