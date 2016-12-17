import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import Todo from './components/Todo';

function App(props) {
	console.log(props);
	return (
		<main>
			<Header title={props.title} />

			<section className="todo-list">
				<Todo title={"Изучить JavaSctipt"} completed={true} />
				<Todo title={"Изучить React"} completed={false} />
			</section>
		</main>
	);
}

const dom = ReactDOM.render(<App title={"React ToDo"}/>, document.getElementById('root'));

console.log(dom);
