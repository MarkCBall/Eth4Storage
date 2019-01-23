import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import QueryContract from "./reducers/QueryContract";
//import test from "./reducers/test";
const rootReducer = combineReducers({
  QueryContract,
  //test
});

export default createStore(rootReducer, applyMiddleware(thunk));
