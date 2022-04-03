import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import userReducer from '../store/reducers/userData';
import authReducer from '../store/reducers/auth';
import deviceOrientationReducer from '../store/reducers/forOrientation';

const appReducer = combineReducers({
  auth: authReducer,
  userData: userReducer,
  deviceStatus:deviceOrientationReducer
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'USER_LOGGED_OUT') {
    console.log("app logout called store");

    state = undefined;
  }

  return appReducer(state, action);
};
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
