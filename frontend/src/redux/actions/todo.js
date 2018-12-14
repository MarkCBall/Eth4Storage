
//import { ADD_TODO } from "../constants/todo";

let nextTodoId = 0;

export const addTodo = (str) => (
    
    {
	type: "ADD_TODO",
	payload: {
		id: ++nextTodoId,
		content:str + " now"
	}
});


