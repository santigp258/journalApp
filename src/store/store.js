import { combineReducers, createStore } from "redux";
import { authReducer } from "../reducers/authReducer";

//have more reducers
const reducers = combineReducers({
  auth: authReducer,
});

//create store, Can only receive one reducer

//should import in app main (JournalApp) component
export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
