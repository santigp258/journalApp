import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";

//have more reducers
const reducers = combineReducers({
  auth: authReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

//create store, Can only receive one reducer
export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk) //async actions
  )
);
