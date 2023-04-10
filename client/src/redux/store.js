import {
  legacy_createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/auth.reducer";
import { profileReducer } from "./profile/profile.reducer";
import { bmiReducer } from "./bmi/bmi.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  profile:profileReducer,
  bmi: bmiReducer
});

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let enhanser = composer(applyMiddleware(thunk));

export const store = legacy_createStore(rootReducer, enhanser);
