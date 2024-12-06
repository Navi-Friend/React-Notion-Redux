import { useCallback, useEffect, useState } from "react";
import BackendAPI from "../BackendAPI";


export default function useNotes(userUUID) {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch(BackendAPI.getUser(userUUID))
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setNotes(data.notes);
            })
            .catch((err) => {
                setNotes([]);
                throw new Error("Unable to load notes", err);
            });
    }, [userUUID]);

    const handleAddNote = useCallback(
        (note) => {
            fetch(BackendAPI.getUser(userUUID))
                .then((r) => r.json())
                .then((userData) => {
                    userData.notes = [...userData.notes, note];

                    fetch(BackendAPI.getUser(userUUID), {
                        method: "PUT",
                        body: JSON.stringify(userData),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then(() => {
                        setNotes(userData.notes);
                    });
                })
                .catch((err) => {
                    console.err(err);
                });
        },
        [notes]
    );

    const handleDeleteNote = useCallback((noteUUID) => {
        fetch(BackendAPI.getUser(userUUID))
            .then((r) => r.json())
            .then((userData) => {
                userData.notes = userData.notes.filter(
                    (note) => note.uuid !== noteUUID
                );
                fetch(BackendAPI.getUser(userUUID), {
                    method: "PUT",
                    body: JSON.stringify(userData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then(() => {
                    setNotes(userData.notes);
                });
            })
            .catch((err) => {
                console.err(err);
            });

        [notes];
    });
    return [notes, handleAddNote, handleDeleteNote];
}
