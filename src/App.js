import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Todos from './Todos';
import './App.css';

const TOKEN = 'TOKEN';

export default class App extends Component {

  state = {
    token: localStorage.getItem(TOKEN)
  }

  login = (clientToken) => {
    this.setState({ token: clientToken })
    localStorage.setItem(TOKEN, clientToken)
  }

  logout = () => {
    this.setState({ token: '' })
    localStorage.setItem('TOKEN', '')
  }

  render() {
    return(
      <Router>
        <div className="body">
          <div className="header">
            <h1>Task Munger</h1>
            <span className="link"><Link to="/">Home</Link></span>
            <span className="link"><Link to="/login">Login</Link></span>
            <span className="link"><Link to="/signup">Sign Up</Link></span>
            <span className="link"><Link to="/todos">Todos</Link></span>
            <button onClick={this.logout}>Logout</button>
          </div>
          <Switch>
            <Route
              path="/" 
              exact
              render={(routerProps) => <Home {...routerProps} />}
            />
            <Route
              path="/signup" 
              exact
              render={(routerProps) => <SignUp login={this.login} {...routerProps} />}
            />
            <Route
              path="/login" 
              exact
              render={(routerProps) => <Login login={this.login} {...routerProps} />}
            />
            <Route 
              path="/todos" 
              exact
              render={(routerProps) => 
                this.state.token 
                  ? <Todos {...routerProps} token={this.state.token} />
                  : <Redirect to='/' />
              }
              />
           </Switch>
        </div>
      </Router>
    );
  }
}
