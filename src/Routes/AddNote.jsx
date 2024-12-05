import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Components/userContext";
import { endpoints } from "../utils/constants";
import {v4 as uuidv4} from "uuid"

export default function ReadNote() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

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
                const newNote = {
                    uuid: uuidv4(),
                    title: title,
                    description: textarea,
                    date: Date.now(),
                };
                userData.notes = [...userData.notes, newNote];
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
            <h1 className="text-4xl mb-3">Add note</h1>
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
                placeholder="Note title"
                type="text"
                className="border p-3 w-full "
                value={title}
                onChange={(e) => handleChangeTitle(e)}
            />
            <textarea
                placeholder="Note description"
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
