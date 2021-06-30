import React, { useState, useEffect } from "react";
import WebFont from "webfontloader";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoFunctions() {
	const [todos, setTodos] = useState([]);
	const apiUrl = `https://assets.breatheco.de/apis/fake/todos/user/cristiangutie349086756441523412`;

	const addTodo = todo => {
		if (!todo.label || /^\s*$/.test(todo.label)) {
			return;
		}

		setTodos([todo, ...todos]);
	};

	const removeTodo = id => {
		setTodos([...todos].filter(todo => todo.id !== id));
	};

	useEffect(() => {
		fetch(apiUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(todos => {
				setTodos(todos);
			});
	}, []);

	useEffect(() => {
		if (!todos.length) {
			return;
		}
		fetch(apiUrl, {
			method: "PUT",
			body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(todos => todos.json());
	}, [todos]);

	useEffect(() => {
		WebFont.load({
			google: {
				families: ["Poiret One", "Comfortaa"]
			}
		});
	}, []);

	return (
		<div className="d-flex flex-column align-items-center stack p-0">
			<h1 className="px-5 title display-1 font-weight-light text-muted">
				todos
			</h1>
			<TodoForm onSubmit={addTodo} />
			<Todo todos={todos} removeTodo={removeTodo} />
			<p className="footer-text pt-3 pl-3 align-self-start text-muted">
				{!todos.length
					? "No todos, add a todo"
					: todos.length == 1
					? `${todos.length} todo left`
					: `${todos.length} todos left`}
			</p>
		</div>
	);
}

export default TodoFunctions;
