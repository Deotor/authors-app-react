import { combineReducers } from "redux";
import authorsReducer from "./authorsReducer";

export default combineReducers({
  authors: authorsReducer
});
