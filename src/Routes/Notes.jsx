import { Link, useNavigate } from "react-router-dom";
import useNotes from "../hooks/useNotes";
import { useSelector } from "react-redux";

export default function Notes() {
    const user = useSelector((state) => state);
    const navigate = useNavigate();

    const [notes, addNote, deleteNote] = useNotes(user.uuid);
    // Note example
    // {
    //     uuid: uuidv4(),  // must contain uuid
    //     title: "Note1",
    //     description: "sadfsadfsadfsadf",
    //     date: Date.now(),
    // })

    const handleDeleteNote = (note) => {
        deleteNote(note.uuid);
    };

    const handleClickNote = (uuid, e) => {
        if (
            e.target.closest("button") ||
            (e.target.closest("a") &&
                e.target.closest("a").getAttribute("href"))
        ) {
            return;
        }
        navigate(`/read-note/${uuid}`);
    };

    return (
        <div className="text-2xl flex flex-col gap-3 items-center w-3/4">
            <h1 className="text-5xl mb-10">Notes</h1>
            <Link
                to="/add-note"
                className=" bg-blue-500 text-white font-bold p-3 rounded hover:bg-blue-600 transition duration-200 mb-4">
                Add new Note
            </Link>

            {!notes.length
                ? ""
                : notes
                      .sort((a, b) => b.date - a.date)
                      .map((note) => (
                          <div
                              key={note.uuid}
                              onClick={(e) => handleClickNote(note.uuid, e)}
                              className="flex items-center justify-between w-full bg-gray-200 p-2 rounded cursor-pointer">
                              <div className="flex justify-center items-center gap-3">
                                  <h2>{note.title}</h2>
                                  <span className="text-sm text-slate-700">
                                      {new Date(note.date).toLocaleDateString()}
                                  </span>
                              </div>
                              <div>
                                  <Link
                                      to={`/edit-note/${note.uuid}`}
                                      className="mr-4">
                                      ✍️
                                  </Link>

                                  <button
                                      onClick={() => handleDeleteNote(note)}
                                      className="text-red-500">
                                      🗑
                                  </button>
                              </div>
                          </div>
                      ))}
        </div>
    );
}
