import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Header from '../../components/Header/Header';
import HomeBody from '../../components/HomeBody/HomeBody';
import Footer from '../../components/Footer/Footer';

class Home extends Component {

    constructor (props) {
        super(props);
        this.state = {
            activeCount: null
        }
    }

    updateActiveCountHandler = (count) => {
        this.setState({ activeCount: count });
    }

    render() {
        return (
            <div>
                <Aux>
                    <Header logout={this.props.logout}></Header>
                    <HomeBody activeCountChanged={this.updateActiveCountHandler}></HomeBody>
                    <Footer activeCount={this.state.activeCount}></Footer>
                </Aux>
            </div>
        );
    }
}

export default Home;