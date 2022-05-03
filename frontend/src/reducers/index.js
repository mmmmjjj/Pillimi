import { combineReducers } from "redux";
import memberInfo from "./MemberReducer";

const rootReducer = combineReducers({
  memberInfo,
});

export default rootReducer;
