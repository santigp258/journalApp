import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { NotesReducer } from "../reducers/NotesReducer";
import { uiReducer } from "../reducers/uiReducer";

//have more reducers
const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notes: NotesReducer,
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
