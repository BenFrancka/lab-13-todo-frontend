import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
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
        <div>
          <div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/todos">Todos</Link>
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
              render={(routerProps) => <SignUp {...routerProps} />}
            />
            <Route
              path="/login" 
              exact
              render={(routerProps) => <Login {...routerProps} />}
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
