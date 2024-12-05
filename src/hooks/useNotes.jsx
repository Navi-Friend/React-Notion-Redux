import { useCallback, useEffect, useState } from "react";
// import { endpoints } from "../utils/constants";

export default function useNotes(userId) {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch(endpoints.userData(userId))
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
    }, [userId]);

    const handleAddNote = useCallback(
        (note) => {
            fetch(endpoints.userData(userId))
                .then((r) => r.json())
                .then((userData) => {
                    userData.notes = [...userData.notes, note];

                    fetch(endpoints.userData(userId), {
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
        fetch(endpoints.userData(userId))
            .then((r) => r.json())
            .then((userData) => {
                userData.notes = userData.notes.filter(
                    (note) => note.uuid !== noteUUID
                );
                fetch(endpoints.userData(userId), {
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
