export const NOTES_OPERATION_START = "NOTES/ASYNC/START";
export const NOTES_OPERATION_ERROR = "NOTES/ASYNC/ERROR";

export const USERS_OPERATION_START = "USERS/ASYNC/START";
export const USERS_OPERATION_ERROR = "USERS/ASYNC/ERROR";

export const SET_USER_SUCCESS = "SET/USER/SUCCESS";
export const UNSET_USER_SUCCESS = "UNSET/USER/SUCCESS";

export const FETCH_NOTES_SUCCESS = "FETCH/NOTES/SUCCESS";
export const REMOVE_NOTE_SUCCESS = "REMOVE/NOTE/START";

// Actions generators
// Users

export function setUserSuccess(user) {
    return {
        type: SET_USER_SUCCESS,
        payload: {
            user: {
                id: user.id,
                email: user.email,
                date: user.date,
                password: user.password,
            },
        },
    };
}

export function unsetUserSuccess() {
    return { type: UNSET_USER_SUCCESS };
}

export function usersOperationError(error) {
    return { type: USERS_OPERATION_ERROR, payload: { error } };
}

export function usersOperationStart() {
    return { type: USERS_OPERATION_START };
}

// Notes

export function fetchNotesSuccess(notes) {
    return {
        type: FETCH_NOTES_SUCCESS,
        payload: { notes: notes },
    };
}

export function removeNoteSuccess(noteUUID) {
    return { type: REMOVE_NOTE_SUCCESS, payload: { noteUUID } };
}

export function notesOperationError(error) {
    return { type: NOTES_OPERATION_ERROR, payload: { error } };
}

export function notesOperationStart() {
    return { type: NOTES_OPERATION_START };
}
