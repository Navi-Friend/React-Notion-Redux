export const SET_USER_START = "SET/USER/START";
export const SET_USER_SUCCESS = "SET/USER/SUCCESS";
export const SET_USER_ERROR = "SET/USER/ERROR";
export const UNSET_USER_SUCCESS = "UNSET/USER/SUCCESS";

// Actions generators

export function setUserStart() {
    return { type: SET_USER_START };
}

export function setUserSuccess(user) {
    return {
        type: SET_USER_SUCCESS,
        payload: {
            user: {
                uuid: user.uuid,
                email: user.email,
                date: user.date,
                password: user.password,
            },
        },
    };
}

export function setUserError(error) {
    return { type: SET_USER_ERROR, payload: { error: error } };
}

export function unsetUserSuccess() {
    return { type: UNSET_USER_SUCCESS };
}
