import LocalStorageAPI from "../LocalStorageAPI";
import BackendAPI from "../BackendAPI";
import {
    addNoteSuccess,
    changeNoteSuccess,
    fetchNotesSuccess,
    notesOperationError,
    notesOperationStart,
    removeNoteSuccess,
    setUserSuccess,
    unsetUserSuccess,
    usersOperationError,
    usersOperationStart,
} from "./actions";
import store from "./Store";
import { v4 as uuidv4 } from "uuid";

export const setUser = (user) => async (dispatch) => {
    dispatch(usersOperationStart());
    try {
        LocalStorageAPI.setUser(user);
        dispatch(setUserSuccess(user));
    } catch (error) {
        console.error(error);
        dispatch(usersOperationError(error));
    }
};

export const unsetUser = () => async (dispatch) => {
    dispatch(usersOperationStart());
    try {
        LocalStorageAPI.unsetUser();
        dispatch(unsetUserSuccess());
    } catch (error) {
        console.error(error);
        dispatch(usersOperationError(error));
    }
};

export const fetchNotes = () => async (dispatch) => {
    dispatch(notesOperationStart());
    try {
        const userID = LocalStorageAPI.getUser().id;
        if (!userID) {
            dispatch(unsetUser());
        }
        const userData = await BackendAPI.getUser(userID);
        console.log(userData.notes)
        dispatch(fetchNotesSuccess(userData.notes));
    } catch (error) {
        console.error(error);
        dispatch(notesOperationError(error));
    }
};

export const removeNote = (noteUUID) => async (dispatch) => {
    dispatch(notesOperationStart());
    try {
        const userID = store.getState().user.user.id;
        const userData = await BackendAPI.getUser(userID);

        userData.notes = userData.notes.filter(
            (note) => note.uuid !== noteUUID
        );
        BackendAPI.changeUserData(userData).then(() => {
            dispatch(removeNoteSuccess(noteUUID));
        });
    } catch (error) {
        console.error(error);
        dispatch(notesOperationError());
    }
};

export const changeNote = (newNote) => async (dispatch) => {
    dispatch(notesOperationStart());
    try {
        const userID = store.getState().user.user.id;
        const userData = await BackendAPI.getUser(userID);
        userData.notes = userData.notes.map((note) => {
            if (note.uuid == newNote.uuid) {
                return newNote;
            }
            return note;
        });

        BackendAPI.changeUserData(userData).then(() => {
            dispatch(changeNoteSuccess(newNote));
        });
    } catch (error) {
        console.error(error);
        dispatch(notesOperationError());
    }
};


export const addNote = (noteData) => async (dispatch) => {
    dispatch(notesOperationStart());
    try {
        const userID = store.getState().user.user.id;
        const userData = await BackendAPI.getUser(userID);

        const newNote = {
            uuid: uuidv4(),
            title: noteData.title,
            description: noteData.description,
            date: Date.now()
        }
        console.log(newNote)
        userData.notes.push(newNote)

        BackendAPI.changeUserData(userData).then(() => {
            dispatch(addNoteSuccess(newNote));
        });
    } catch (error) {
        console.error(error);
        dispatch(notesOperationError());
    }
};