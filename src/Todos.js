import React, { Component } from 'react'
import { addTodo, accomplishTask, getTodos } from './utils';

export default class Todos extends Component {

    state = {
        todos: [],
        todo: ''
    }

    componentDidMount = async () => {
        await this.doFetch()
    }

    doFetch = async () => {
        const todos = await getTodos(this.props.token);
        this.setState({ todos: todos })
    }

    handleSubmit = async e => {
        e.preventDefault();

        await addTodo(this.state.todo, this.props.token);
        await this.doFetch();
    }

    handleTask = e => {
        this.setState({ todo: e.target.value })
    }
    render() {
        console.log(this.state)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Task
                        <input onChange={this.handleTask}/>       
                    </label>
                    <button>Add Task</button>
                </form>
                <div>
                    {
                        this.state.todos.map(todo =>
                            <p
                            className={ todo.completed ? 'is-completed' : 'not-completed'}
                            key={`${todo.todo}${todo.id}`}
                            onClick={async () => {
                                await accomplishTask(todo.id, this.props.token)
                                await this.doFetch()
                            }}
                            >
                                {todo.todo}
                            </p>
                            )
                    }
                </div>
            </div>
        )
    }
}
