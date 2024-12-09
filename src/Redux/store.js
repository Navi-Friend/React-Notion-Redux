import { applyMiddleware, combineReducers, createStore } from "redux";
import { notesReducer, userReducer } from "./Reducers";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension/";

let store = createStore(
    combineReducers({
        user: userReducer,
        notes: notesReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
