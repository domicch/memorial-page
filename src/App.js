import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import MUILayout from './hoc/Layouts/Layout';
import News from './containers/News/News';
import LifeReview from './containers/LifeReview/LifeReview';
import Messages from './containers/Messages/Messages';
import CreateMessage from './containers/CreateMessage/CreateMessage';
import CreateArticle from './containers/Articles/CreateArticle';
import * as actions from './store/actions/index';


class App extends Component {

  componentDidMount() {
    console.log('App componentDidMount');
    this.props.onInitAuth();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/lifereview" component={LifeReview} />
        <Route path="/messages" component={Messages} />
        <Route path="/newmessage" component={CreateMessage} />
        <Route path="/newarticle" component={CreateArticle} />
        <Route path="/" component={LifeReview} />
      </Switch>
    );

    return (
        <MUILayout>
          {routes}
        </MUILayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitAuth: () => dispatch(actions.initAuth()),
    onRefreshLoginState: () => dispatch(actions.refreshLoginState)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);