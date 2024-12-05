import {
    REMOVE_USER,
    SET_USER_ERROR,
    SET_USER_START,
    SET_USER_SUCCESS,
} from "./actions";

const INITIAL_STATE = {
    user: "",
    loadedUser: "",
    email: "",
    password: "",
    loading: false,
    error: null,
};

/**
 *
 * @param {Object} state - global state
 * @param {Object} action - Conatain only 2 fields:
 * 1) type - represented with constant from ./actions.js file
 * 2) payload - userfull data
 * @returns
 */
export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REMOVE_USER:
            return { ...state, user: "" };

        case SET_USER_START:
            return { ...state, loading: true };
        case SET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                loadedUser: "",
                loading: false,
            };
        case SET_USER_ERROR:
            return {
                ...state,
                error: String(action.payload.error),
                loading: false,
            };

        default:
            return state;
    }
}
