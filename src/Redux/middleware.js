import {
    setUserError,
    setUserStart,
    setUserSuccess,
} from "./actions";

export const setUser = (user) => async (dispatch) => {
    dispatch(setUserStart());
    try {
        const userString = JSON.stringify(user);
        localStorage.setItem("user", userString);
        console.log(user)
        dispatch(setUserSuccess(user));
    } catch (error) {
        console.error(error);
        dispatch(setUserError(error));
    }
};
