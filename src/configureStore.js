import { createStore, applyMiddleware } from "redux";
import { persistCombineReducers, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";

import { createBrowserHistory } from "history";

import { rootProductListReducer, serviceRequestReducer } from "./reducers";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["toastr", "classes", "login", "pdfViewer"]
  // debug: true,
};

const rootReducer = persistCombineReducers(rootPersistConfig, {
  rootProductList: rootProductListReducer,
  serviceRequestList: serviceRequestReducer
});

const history = createBrowserHistory();
const middleWare = [thunk];

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(...middleWare)
);

persistStore(store);

export { history };
export default store;
