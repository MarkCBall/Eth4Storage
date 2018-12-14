import { ADD_TODO } from '../constants/todo';

const initialState = {
  todos: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {...state, todos: [action.payload, ...state.todos]}
      // break;
    default:
      return state;
  }
}