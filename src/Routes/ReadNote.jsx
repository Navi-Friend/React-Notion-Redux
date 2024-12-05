import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Components/userContext";
import { endpoints } from "../utils/constants";

export default function ReadNote() {
    const { noteUUID } = useParams();

    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const [note, setNote] = useState({});

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(
                    endpoints.userData(userContext.user.id)
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const userData = await response.json();
                const foundNote = userData.notes.find(
                    (n) => n.uuid === noteUUID
                ); 
                setNote(foundNote);
            } catch (error) {
                console.error("Error fetching note:", error);
            }
        };

        fetchNote();
    }, [noteUUID, userContext.user.id]);

    const handleDeleteNote = () => {
        fetch(endpoints.userData(userContext.user.id))
            .then((r) => r.json())
            .then((userData) => {
                userData.notes = userData.notes.filter(
                    (note) => note.uuid !== noteUUID
                );
                fetch(endpoints.userData(userContext.user.id), {
                    method: "PUT",
                    body: JSON.stringify(userData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then(() => {
                    navigate("/notes");
                });
            });
    };

    return (
        <div className="text-2xl flex flex-col gap-3 items-center w-1/2">
            <h1 className="text-4xl">{note.title}</h1>
            <div className="flex w-full justify-between">
                <Link
                    to="/notes"
                    className="justify-self-start bg-gray-400 p-1.5 rounded">
                    Back
                </Link>
                <div>
                    <Link to={`/edit-note/${note.uuid}`} className="mr-4">
                        ✍️
                    </Link>
                    <button onClick={handleDeleteNote} className="text-red-500">
                        🗑
                    </button>
                </div>
            </div>
            <textarea className="border p-3 w-full h-52 resize-none focus-visible:none outline-none" value={note.description} ></textarea>
        </div>
    );
}
