import { useEffect, useReducer } from "react";
import { TodoReducer } from "../08-useReducer/TodoReducer";

export const useTodo = () => {

    const initialState = []
    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }
    const [todos, dispath] = useReducer(TodoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    const handleNewTodo = (todo) => {

        const action = {
            type: 'addTodo',
            payload: todo
        }
        dispath(action);
    }

    const handleDeleteTodo = (id) => {
        dispath({
            type: 'removeTodo',
            payload: id
        })
    }

    const handleToggleTodo = (id) => {
        dispath({
            type: 'toggleTodo',
            payload: id
        })
    }

    return {
        todos,
        todosCount:todos.length,
        pendingTodosCount:todos.filter(todo => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}