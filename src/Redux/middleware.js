import LocalStorageAPI from "../LocalStorageAPI";
import {
    setUserError,
    setUserStart,
    setUserSuccess,
    unsetUserSuccess,
} from "./actions";

export const setUser = (user) => async (dispatch) => {
    dispatch(setUserStart());
    try {
        LocalStorageAPI.setUser(user)
        dispatch(setUserSuccess(user));
    } catch (error) {
        console.error(error);
        dispatch(setUserError(error));
    }
};

export const unsetUser = (user) => async (dispatch) => {
    dispatch(setUserStart());
    try {
        LocalStorageAPI.unsetUser()
        dispatch(unsetUserSuccess(user));
    } catch (error) {
        console.error(error);
        dispatch(setUserError(error));
    }
};
