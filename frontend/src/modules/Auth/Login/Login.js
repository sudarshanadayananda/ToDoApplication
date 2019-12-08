import React, { Component } from 'react';

import NotificationType from '../../../static/NotificationType';
import axios from '../../../axios-orders';

import classes from './Login.module.css'
import Input from '../../../components/UI/Input/Input';
import Notification from '../../../components/Notification/Notification';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null
        };
        this.notification = React.createRef();
    }

    usernameChangedHandler = (event) => {
        this.setState({ username: event.target.value });
    }

    passwordChangedHandler = (event) => {
        this.setState({ password: event.target.value });
    }

    onKeyDownHandler = (event) => {
        if (event.key === 'Enter' && this.state.username && this.state.password) {
            this.doLogin();
        }
    }

    loginBtnClickHandler = () => {
        this.doLogin();
    }

    doLogin() {

        if (!this.state.username || !this.state.password) {
            this.notification.current.showNotification(NotificationType.WARN, 'Please enter both username and password.');
            return;
        }
        const data = { username: this.state.username, password: this.state.password };
        axios.post('/api/auth/login', data)
            .then(res => {

                if (res.status === 200) {

                    const resData = res.data;

                    if (resData.status === 'NOT_FOUND')
                        this.notification.current.showNotification(NotificationType.WARN, resData.message);
                    else if (resData.status === 'FAILED')
                        this.notification.current.showNotification(NotificationType.WARN, resData.message);
                    else if (resData.status === 'SUCCESS') {
                        localStorage.setItem('user', JSON.stringify(resData.user));
                        this.props.onLoginSuccessed();
                    }
                }
            }).catch(error => {
            
                this.notification.current.showNotification(NotificationType.ERROR, 'Error occurred. Try again.');
            });
    }

    render() {
        return (
            <div className={classes.Login}>

                <div className={ classes.Card }>

                    <div className={classes.Input}>

                        <Input 
                            type='text' 
                            placeholder='username' 
                            keyDown={this.onKeyDownHandler} 
                            onChange={(e) => this.usernameChangedHandler(e)}></Input>

                    </div>

                    <div className={classes.Input}>

                        <Input 
                            type='password' 
                            placeholder='password' 
                            keyDown={this.onKeyDownHandler} 
                            onChange={(e) => this.passwordChangedHandler(e)}></Input>

                    </div>

                    <div className={classes.Button}>

                        <button 
                            type="button" 
                            className={'btn btn-primary ' + classes.BtnSignIn} 
                            onClick={this.loginBtnClickHandler}>Log In</button>
                    </div>

                </div>

                <Notification ref={this.notification} />

            </div>
        );
    }
}

export default Login;