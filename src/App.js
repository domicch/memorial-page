import React, {Component} from 'react';
import {Route, Switch } from 'react-router-dom';

import MUILayout from './hoc/Layouts/Layout';
import LifeReview from './containers/LifeReview/LifeReview';
import Messages from './containers/Messages/Messages';
import CreateMessage from './containers/CreateMessage/CreateMessage';
import Centering4Ways from './components/UI/Example/Centering4Ways';

class App extends Component {

  render() {
    let routes = (
      <Switch>
        <Route path="/messages" component={Messages} />
        <Route path="/newmessage" component={CreateMessage} />
        <Route path="/" component={LifeReview} />
      </Switch>
    );

    return (
      <div>
        {/* <Layout>
          {routes}
        </Layout> */}
        <MUILayout>
          {routes}
        </MUILayout>
      </div>
    );
  }
}

export default App;