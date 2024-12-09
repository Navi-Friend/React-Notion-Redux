import { Navigate } from "react-router-dom";
import LocalStorageAPI from "../LocalStorageAPI";

export default function ProtectedRoute({ children }) {
    const user = LocalStorageAPI.getUser()
    if (!user?.id) {
        return <Navigate to="/login" />;
    }
    return children;
}
