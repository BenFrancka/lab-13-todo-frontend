import React, { Component } from 'react'
import { signup } from './utils';

export default class SignUp extends Component {

    state = {
        email: '',
        password: ''
    }

    handleSubmit = async e => {
        e.preventDefault();

        const token = await signup(this.state.email, this.state.password);

        this.props.login(token)
        this.props.history.push('/todos');
    }

    handleEmail = e => {
        this.setState({ email: e.target.value });
    }

    handlePassword = e => {
        this.setState({ password: e.target.value });
    }


    render() {
        console.log(this.state);
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email
                        <input type="email" onChange={this.handleEmail}/>
                    </label>
                    <label>
                        Password
                        <input type="password" onChange={this.handlePassword}/>
                    </label>
                    <button>Create Account</button>
                </form>
            </div>
        )
    }
}
