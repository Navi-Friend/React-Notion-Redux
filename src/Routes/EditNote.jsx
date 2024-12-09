import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackendAPI from "../BackendAPI";
import { useDispatch, useSelector } from "react-redux";
import { changeNote } from "../Redux/middleware";

export default function ReadNote() {
    const { noteUUID } = useParams();

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [note, setNote] = useState({});

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const userData = await BackendAPI.getUser(user.id);
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
    }, [noteUUID, user.id]);

    const [textarea, setTextarea] = useState("");
    const handleChangeTextarea = useCallback((e) => {
        setTextarea(e.target.value);
    });

    const [title, setTitle] = useState("");
    const handleChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    });

    const [error, setErr] = useState([]);
    const handleSaveChanges = useCallback(() => {
        if (title === "") {
            setErr(["Title must not be empty."]);
            return;
        }

        dispatch(changeNote({ ...note, title: title, description: textarea }));
        navigate("/notes");
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
            {!error.length
                ? ""
                : error.map((item) => (
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
