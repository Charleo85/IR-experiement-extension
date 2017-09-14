import {
  applyMiddleware,
  createStore
}
from 'redux';
import {
  createLogger
}
from 'redux-logger';
import rootReducer from './reducers';

import {
  wrapStore
}
from 'react-chrome-redux';

const logger = createLogger({
  predicate: (getState, action) => action.type === 'PRODUCT_INFO',
  timestamp: true
});

const store = createStore(
  rootReducer, applyMiddleware(logger)
);

wrapStore(store, {
  portName: 'example'
});
