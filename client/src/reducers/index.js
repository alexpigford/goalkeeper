import { combineReducers } from "redux";
import goalReducer from "./goalReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  goal: goalReducer,
  auth: authReducer,
  error: errorReducer
});

// this file is the rootReducer
// it holds all reducers to be used as they are defined
// goal, auth, error