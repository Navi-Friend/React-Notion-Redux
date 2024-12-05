import { useCallback, useContext, useEffect, useState } from "react";
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
                if (foundNote) {
                    setNote(foundNote);
                    setTextarea(foundNote.description);
                    setTitle(foundNote.title);
                }
            } catch (error) {
                console.error("Error fetching note:", error);
            }
        };

        fetchNote();
    }, [noteUUID, userContext.user.id]);

    const [textarea, setTextarea] = useState("");
    const handleChangeTextarea = useCallback((e) => {
        setTextarea(e.target.value);
    });

    const [title, setTitle] = useState("");
    const handleChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    });

    const [err, setErr] = useState([]);
    const handleSaveChanges = useCallback(() => {
        if (title === "") {
            setErr(["Title must not be empty."]);
            return;
        }
        fetch(endpoints.userData(userContext.user.id))
            .then((r) => r.json())
            .then((userData) => {
                let userDataNote = userData.notes.filter(
                    (note) => note.uuid === noteUUID
                )[0];
                userDataNote.title = title;
                userDataNote.description = textarea;
                userData = { ...userData, userDataNote };
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
    });

    return (
        <div className="text-2xl flex flex-col gap-3 items-center w-1/2">
            <h1 className="text-4xl mb-3">Edit note</h1>
            <div className="flex w-full justify-between">
                <Link
                    to="/notes"
                    className="justify-self-start bg-gray-400 p-2 px-2.5 rounded-md my-2">
                    Back
                </Link>
            </div>
            {!err.length
                ? ""
                : err.map((item) => (
                      <div className="text-red-500 mb-5">{item}</div>
                  ))}
            <input
                type="text"
                className="border p-3 w-full "
                value={title}
                onChange={(e) => handleChangeTitle(e)}
            />
            <textarea
                className="border p-3 w-full h-52 resize-none"
                value={textarea}
                onChange={(e) => handleChangeTextarea(e)}></textarea>
            <button
                className=" bg-blue-500 text-white font-bold p-3 rounded hover:bg-blue-600 transition duration-200 mb-4"
                onClick={handleSaveChanges}>
                Save
            </button>
        </div>
    );
}
