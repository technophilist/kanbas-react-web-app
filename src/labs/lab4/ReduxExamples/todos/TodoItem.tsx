import React from "react";
import {useDispatch} from "react-redux";
import {deleteTodo, setTodo} from "./todosReducer";

function TodoItem({todo}: { todo: { id: string; title: string } }) {
    const dispatch = useDispatch()
    return (
        <li key={todo.id} className="list-group-item d-flex justify-content-between fw-semibold">
            {todo.title}
            <div>
                <button className="btn btn-primary me-2" id="wd-set-todo-click"
                        onClick={() => dispatch(setTodo(todo))}>
                    Edit
                </button>
                <button className="btn btn-danger" id="wd-delete-todo-click"
                        onClick={() => dispatch(deleteTodo(todo.id))}>
                    Delete
                </button>
            </div>
        </li>
    )
}

export default TodoItem