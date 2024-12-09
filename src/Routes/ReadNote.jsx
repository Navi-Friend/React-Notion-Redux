import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BackendAPI from "../BackendAPI";
import { removeNote } from "../Redux/middleware";

export default function ReadNote() {
    const { noteUUID } = useParams();

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [note, setNote] = useState("");
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const userData = await BackendAPI.getUser(user.id);
                const foundNote = userData.notes.find(
                    (n) => n.uuid === noteUUID
                );
                setNote(foundNote);
            } catch (error) {
                console.error("Error fetching note:", error);
            }
        };

        fetchNote();
    }, [noteUUID, user.id]);

    const handleDeleteNote = () => {
        dispatch(removeNote(noteUUID));
        navigate("/notes");
    };

    return (
        <div className="text-2xl flex flex-col gap-3 items-center w-1/2">
                <div className="text-4xl max-w-60 overflow-hidden text-ellipsis text-nowrap">{note.title}</div>
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
            <textarea
                className="border p-3 w-full h-52 resize-none focus-visible:none outline-none"
                value={note.description}></textarea>
        </div>
    );
}
