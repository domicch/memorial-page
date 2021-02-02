import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'

import lifeReviewReducer from './store/reducers/lifeReview';
import messagesReducer from './store/reducers/messages';
import createMessageReducer from './store/reducers/createMessage';
import authReducer from './store/reducers/auth';

// for redux dev-tools Chrome extension. Please remove in PROD env
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  lifeReview: lifeReviewReducer,
  messages: messagesReducer,
  createMessage: createMessageReducer,
  auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(
    thunk
  )));

// // set firebase user token persistent to local storage
// app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
// .then(() => {
//   console.log('set firebase persistence success');
// })
// .catch((error) => {
//   console.log('set firebase persistence failed', error);
// });



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
