import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import memberInfo from "./MemberReducer";

const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  memberInfo,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
