import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import lifeReviewReducer from './store/reducers/lifeReview';
import messagesReducer from './store/reducers/messages';
import createMessageReducer from './store/reducers/createMessage';

// for redux dev-tools Chrome extension. Please remove in PROD env
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  lifeReview: lifeReviewReducer,
  messages: messagesReducer,
  createMessage: createMessageReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(
    thunk
  )));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
