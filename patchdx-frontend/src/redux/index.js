import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

// Using Redux's compose for middleware application
const composeEnhancers = compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;