import { Navigate } from "react-router-dom";
import LocalStorageAPI from "../LocalStorageAPI";

export default function ProtectedRoute({ children }) {
    const user = LocalStorageAPI.getUser()
    console.log(user)
    if (!user?.email) {
        console.log("protected route");
        return <Navigate to="/login" />;
    }
    return children;
}
