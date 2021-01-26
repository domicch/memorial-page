import React, {Component} from 'react';
import {Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import LifeReview from './containers/LifeReview/LifeReview';
import Messages from './containers/Messages/Messages'

class App extends Component {

  render() {
    let routes = (
      <Switch>
        <Route path="/messages" component={Messages} />
        <Route path="/" component={LifeReview} />
      </Switch>
    );

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

export default App;