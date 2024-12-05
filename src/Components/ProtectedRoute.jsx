import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
    const user = useSelector((state) => state.user);
    if (!user?.email) {
        console.log("protected route");
        return <Navigate to="/login" />;
    }
    return children;
}
