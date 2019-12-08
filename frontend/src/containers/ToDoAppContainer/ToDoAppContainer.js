import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Aux from '../../hoc/Aux/Aux';
import Home from '../../modules/Home/Home';
import Login from '../../modules/Auth/Login/Login';

class ToDoAppContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false };
    }

    onUserLogin = () => {
        this.setState({ isLoggedIn: true })
    }

    onUserLogout = () => {
        this.setState({ isLoggedIn: false });
    }

    componentDidMount() {
        const user = localStorage.getItem('user');
        if (user) {
            this.setState({ isLoggedIn: true })
        }
    }
    render() {
        return (
            <Aux>
                <Route
                    path="/"
                    component={() => this.state.isLoggedIn ? <Home logout={this.onUserLogout} /> : <Login onLoginSuccessed={this.onUserLogin} />} />
            </Aux>
        )
    }
}

export default ToDoAppContainer;