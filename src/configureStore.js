import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";

import dataSaga from './sagas';

const sagaMiddleware = createSagaMiddleware({
  onError: (error, action) => {
    if (error) {
      console.log('ERROR');
      console.log(error);
      console.log(action);
    }
  }
});

export default function configureStore() {
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(dataSaga);
  return store;
}