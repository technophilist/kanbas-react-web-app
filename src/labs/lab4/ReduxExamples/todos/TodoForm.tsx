import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addTodo, setTodo, updateTodo} from "./todosReducer";

function TodoForm() {
    const {todo} = useSelector((state: any) => state.todosReducer)
    const dispatch = useDispatch()
    return (
        <li className="list-group-item d-flex">
            <input
                className="form-control me-4"
                defaultValue={"Learn mongo"}
                value={todo.title}
                onChange={(e) => dispatch(setTodo({...todo, title: e.target.value}))}
            />
            <button className="btn btn-warning me-2" id="wd-update-todo-click"
                    onClick={() => dispatch(updateTodo(todo))}>
                Update
            </button>
            <button className="btn btn-success" id="wd-add-todo-click" onClick={() => dispatch(addTodo(todo))}>
                Add
            </button>
        </li>
    )
}

export default TodoForm