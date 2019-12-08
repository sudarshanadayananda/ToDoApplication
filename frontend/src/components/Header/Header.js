import React, { Component } from 'react';

import classes from './Header.module.css';
import Logo from '../Logo/Logo';
import DropDownItems from '../DropDownItems/DropDownItems';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    onLogOutBtnClickHandler = () => {
        localStorage.clear();
        this.props.logout();
    }

    render() {
        return (
            <header className={classes.Header}>

                <div className={classes.Logo}>
                    <Logo />
                </div>

                <h2>To Do Application</h2>

                <div className={classes.Dropdown}>

                    <i className="fa fa-angle-down"></i>
                    <div className={classes.DropdownContent}>
                        <DropDownItems logout={this.onLogOutBtnClickHandler}></DropDownItems>
                    </div>

                </div>
            </header>
        )
    }
}

export default Header;