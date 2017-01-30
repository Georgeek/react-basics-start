import React from 'react';
import ReactDOM from 'react-dom';

import todos from './todos';
import Header from './components/Header';
import Todo from './components/Todo';
import Form from './components/Form'

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: this.props.initiallData
		};

		this.handleStatusChange = this.handleStatusChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}

	nexId() {
		this._nextId = this._nextId || 4;
		return this._nextId++
	}
	
	handleStatusChange(id) {
		let todos = this.state.todos.map(todo => {
			if(todo.id === id) {
				todo.completed = !todo.completed;
			}

			return todo;
		});

		this.setState({ todos });
	}

	handleAdd(title) {
		let todo = {
			id: this.nexId(),
			title,
			completed: false
		};

		let todos = [...this.state.todos, todo];

		this.setState({ todos });
	}

	handleDelete(id) {
		let todos = this.state.todos.filter(todo => todo.id !== id);

		this.setState({ todos });
	}

	handleEdit(id, title) {
		let todos = this.state.todos.map(todo => {
			if (todo.id === id) {
				todo.title = title;
			}
			
			return todo;
		});

		this.setState({ todos });
	}

	render() {
		return (
			<main>
				<Header title={this.props.title} todos={this.state.todos} />

				<section className="todo-list">
					{this.state.todos.map(todo => // с помощью map мы перебираем массив todos (напоминание себе)
						<Todo 
							key={todo.id}
							id={todo.id}
							title={todo.title}
							completed={todo.completed}
							onStatusChange={this.handleStatusChange} 
							onDelete={this.handleDelete}
							onEdit={this.handleEdit}
						/>)
					}
				</section>

				<Form onAdd={this.handleAdd} />
			</main>
		);
	}

}

App.propTypes = {
	title: React.PropTypes.string,
	initiallData: React.PropTypes.arrayOf(React.PropTypes.shape({ // Можно передать object, но мы передаем shape
		id: React.PropTypes.number.isRequired,
		title: React.PropTypes.string.isRequired,			// который позволяет для каждого элемента объета
		completed: React.PropTypes.bool.isRequired		// определить желаемый тип элемента
	})).isRequired
};

App.defaultProps = {
	title: "React ToDo"
};

ReactDOM.render(<App initiallData={todos} />, document.getElementById('root')); // испортируемый массив указываем в App
