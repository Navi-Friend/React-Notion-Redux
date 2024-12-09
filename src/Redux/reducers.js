import {
    ADD_NOTE_SUCCESS,
    CHANGE_NOTE_SUCCESS,
    FETCH_NOTES_SUCCESS,
    NOTES_OPERATION_ERROR,
    NOTES_OPERATION_START,
    REMOVE_NOTE_SUCCESS,
    SET_USER_SUCCESS,
    UNSET_USER_SUCCESS,
    USERS_OPERATION_ERROR,
    USERS_OPERATION_START,
} from "./actions";

const INITIAL_NOTES_STATE = {
    notes: [],
    loading: false,
    error: null,
};

const INITIAL_USER_STATE = {
    user: {},
    loading: false,
    error: null,
};

/**
 *
 * @param {Object} state - global state
 * @param {Object} action - Conatains only 2 fields:
 * 1) type - represented with constant from ./actions.js file
 * 2) payload - userfull data
 * @returns
 */
export function userReducer(state = INITIAL_USER_STATE, action) {
    switch (action.type) {
        case SET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                loading: false,
            };
        case UNSET_USER_SUCCESS:
            return { ...state, user: {}, loading: false };
        case USERS_OPERATION_START:
            return {
                ...state,
                loading: true,
            };
        case USERS_OPERATION_ERROR:
            return {
                ...state,
                error: String(action.payload.error),
                loading: false,
            };
        default:
            return state;
    }
}

export function notesReducer(state = INITIAL_NOTES_STATE, action) {
    switch (action.type) {
        case FETCH_NOTES_SUCCESS:
            return {
                ...state,
                notes: action.payload.notes,
                loading: false,
            };
        case REMOVE_NOTE_SUCCESS:
            return {
                ...state,
                notes: state.notes.filter(
                    (note) => note.uuid != action.payload.noteUUID
                ),
                loading: false,
            };
        case CHANGE_NOTE_SUCCESS:
            return {
                ...state,
                notes: state.notes.map((note) => {
                    if (note.uuid == action.payload.note.uuid) {
                        return (note = action.payload.note);
                    }
                    return note;
                }),
                loading: false,
            };
        case NOTES_OPERATION_START:
            return {
                ...state,
                loading: true,
            };
        case NOTES_OPERATION_ERROR:
            return {
                ...state,
                error: String(action.payload.error),
                loading: false,
            };
        case ADD_NOTE_SUCCESS:
            return {
                ...state,
                notes: [...notes, action.payload.note],
                loading: false,
            };
        default:
            return state;
    }
}
