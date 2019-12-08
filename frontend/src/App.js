import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import ToDoAppContainer from './containers/ToDoAppContainer/ToDoAppContainer';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <ToDoAppContainer />
        </Layout>
      </div>
    )
  }
}

export default App;
