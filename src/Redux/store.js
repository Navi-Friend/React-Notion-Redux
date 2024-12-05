import { applyMiddleware, createStore } from "redux";
import { userReducer } from "./Reducers";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension/";


let store = createStore(
    userReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store