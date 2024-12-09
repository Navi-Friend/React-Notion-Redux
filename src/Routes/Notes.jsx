import { Link, useNavigate } from "react-router-dom";
import { fetchNotes, removeNote } from "../Redux/middleware";
import { connect } from "react-redux";
import { useEffect } from "react";

function Notes({ getNotes, notes, removeNote }) {
    // Note example
    // {
    //     uuid: uuidv4(),  // must contain uuid
    //     title: "Note1",
    //     description: "sadfsadfsadfsadf",
    //     date: Date.now(),
    // })

    useEffect(() => {
        getNotes();
    }, []);

    const handleDeleteNote = (note) => {
        removeNote(note.uuid);
    };

    const navigate = useNavigate();
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

    if (notes.loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }
    return (
        <div className="text-2xl flex flex-col gap-3 items-center w-3/4">
            <h1 className="text-5xl mb-10">Notes</h1>
            <Link
                to="/add-note"
                className=" bg-blue-500 text-white font-bold p-3 rounded hover:bg-blue-600 transition duration-200 mb-4">
                Add new Note
            </Link>

            {!notes.notes.length ? (
                <div>There are no notes here yet</div>
            ) : (
                notes.notes.map((note) => (
                    <div
                        key={note.uuid}
                        onClick={(e) => handleClickNote(note.uuid, e)}
                        className="flex items-center justify-between w-full bg-gray-200 p-2 rounded cursor-pointer ">
                        <div className="w-3/4">
                            <h2 className="text-ellipsis overflow-hidden">
                                {note.title}
                            </h2>
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
                ))
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    notes: state.notes,
});

const mapDispatchToProps = (dispatch) => ({
    getNotes: () => dispatch(fetchNotes()),
    removeNote: (noteUUID) => dispatch(removeNote(noteUUID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
