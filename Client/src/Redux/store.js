import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["dataUser", "loginUser"],
    // blacklist:["userLogedIn"]
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);