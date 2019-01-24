import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import QueryContract from "./reducers/QueryContract";
import VerifySignature from "./reducers/VerifySignature";

//import test from "./reducers/test";
const rootReducer = combineReducers({
  QueryContract,
  VerifySignature
});

export default createStore(rootReducer, applyMiddleware(thunk));
