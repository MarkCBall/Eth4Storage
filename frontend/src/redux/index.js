import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import todo from "./reducers/todo";
//import test from "./reducers/test";
const rootReducer = combineReducers({
  todo,
  //test
});

export default createStore(rootReducer, applyMiddleware(thunk));
