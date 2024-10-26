import React, {useState} from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import {useSelector} from "react-redux";

function TodoList() {
    const {todos} = useSelector((state: any) => state.todosReducer)
    return (
        <div>
            <h2>Todo List</h2>
            <ul className="list-group border">
                <TodoForm/>
                {todos.map((todo: any) => {
                    return (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

export default TodoList