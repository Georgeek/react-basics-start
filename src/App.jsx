import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

import todos from './todos';
import Header from './components/Header';
import Todo from './components/Todo';
import Form from './components/Form';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
        axios.get('/api/todos')
            .then(res => res.data)
            .then(todos => this.setState({ todos }))
            .catch(this.handleError);
    }

    handleAdd(title) {
        axios.post('/api/todos', { title })
            .then(res => res.data)
            .then(todo => {
                const todos = [...this.state.todos, todo];

                this.setState({ todos });
            })
            .catch(this.handleError);

    } 

    handleDelete(id) {
        axios.delete(`/api/todos/${id}`)
            .then(() => {
                const todos = this.state.todos.filter(todo => todo.id !== id);

                this.setState({ todos });
            })
            .catch(this.handleError);
    }

    handleToggle(id) {
        axios.patch(`/api/todos/${id}`)
            .then(res => {
                const todos = this.state.todos.map(todo => {
                    if (todo.id === id) {
                        todo = res.data;
                    }

                    return todo;
                });

                this.setState({ todos });
            })
            .catch(this.handleError);
    }

    handleEdit(id, title) {
        axios.put(`/api/todos/${id}`, { title })
            .then(res => {
                const todos = this.state.todos.map(todo => {
                    if (todo.id === id) {
                        todo = res.data;
                    }

                    return todo;
                });

                this.setState({ todos });
            })
            .catch(this.handleError);
    }

    handleError(error) {
        console.error(error);
    }

    render() {
        return (
            <main>
                <Header todos={this.state.todos} />

                <ReactCSSTransitionGroup
                    component="section"
                    className="todo-list"
                    transitionName="slide"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    >
                    {this.state.todos.map(todo => 
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            onDelete={this.handleDelete}
                            onToggle={this.handleToggle}
                            onEdit={this.handleEdit}
                        />)
                    }
                </ReactCSSTransitionGroup>

                <Form onAdd={this.handleAdd} />
            </main>
        );
    }
}

App.propTypes = {
    initialData: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired,
        completed: React.PropTypes.bool.isRequired
    })).isRequired
};

ReactDOM.render(<App initialData={todos} />, document.getElementById('root'));