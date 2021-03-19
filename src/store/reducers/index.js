import { combineReducers } from "redux";
import contentfulReducer from "./contentfulReducer";

const reducers = combineReducers({
  contentful: contentfulReducer,
});

export default reducers;
