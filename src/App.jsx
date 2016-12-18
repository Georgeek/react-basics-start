import React from 'react';
import ReactDOM from 'react-dom';

import todos from './todos';
import Header from './components/Header';
import Todo from './components/Todo';

function App(props) {
	console.log(props);
	return (
		<main>
			<Header title={props.title} />

			<section className="todo-list">
				{props.todos.map(todo => // с помощью map мы перебираем массив todos (напоминание себе)
					<Todo key={todo.id} title={todo.title} completed={todo.completed} />)
				}
			</section>
		</main>
	);
}

App.propTypes = {
	title: React.PropTypes.string,
	todos: React.PropTypes.arrayOf(React.PropTypes.shape({ // Можно передать object, но мы передаем shape
		id: React.PropTypes.number.isRequired,
		title: React.PropTypes.string.isRequired,			// который позволяет для каждого элемента объета
		completed: React.PropTypes.bool.isRequired		// определить желаемый тип элемента
	})).isRequired
};

App.defaultProps = {
	title: "React ToDo"
};

ReactDOM.render(<App todos={todos} />, document.getElementById('root')); // испортируемый массив указываем в App
