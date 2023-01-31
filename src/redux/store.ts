import { applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createStore } from "redux";
import { reducers } from "./reducers";
import { rootSaga } from "./root.sagas";

export const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const store = createStore(reducers, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);
  return store;
};

export const store = configureStore();
