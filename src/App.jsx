import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./Routes/Wrapper";
import ErrorPage from "./Routes/ErrorPage";
import Login from "./Routes/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import About from "./Routes/About";
import SignUp from "./Routes/SignUp";
import Notes from "./Routes/Notes";
import ReadNote from "./Routes/ReadNote";
import EditNote from "./Routes/EditNote";
import AddNote from "./Routes/AddNote";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import LocalStorageAPI from "./LocalStorageAPI";
import { setUser } from "./Redux/middleware";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Wrapper />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <About />,
            },
            {
                path: "/notes",
                element: <Notes />,
            },
            {
                path: "/read-note/:noteUUID",
                element: <ReadNote />,
            },
            {
                path: "/edit-note/:noteUUID",
                element: <EditNote />,
            },
            {
                path: "/add-note",
                element: <AddNote />,
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
]);

export default function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        const user = LocalStorageAPI.getUser()
        if (user?.email) {
            dispatch(setUser(user))
        }
    }, [dispatch])
    return <RouterProvider router={router} />;
}
