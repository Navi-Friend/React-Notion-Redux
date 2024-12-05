import { useContext } from "react";
import { UserContext } from "./userContext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const userContext = useContext(UserContext);
    if (!userContext.user?.email) {
        console.log("protected route")
        return <Navigate to="/login" />;
    }
    return children;
}
