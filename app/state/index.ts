import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import reducers from './notes/reducers';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    notes: reducers
  });
}
