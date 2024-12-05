import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./userContext";

export default function Header() {
    const userContext = useContext(UserContext);
    const handleLogout = () => {
        userContext.setUser({ email: "", password: "", date: "" });
    };

    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <NavLink to="/" end={true}>
                        {`Hello, ${userContext.user.email}!`}
                    </NavLink>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <NavLink
                                to="/"
                                end={true}
                                className="hover:text-blue-300">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/notes"
                                end={true}
                                className="hover:text-blue-300">
                                Notes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                //TODO Logout
                                to="/login"
                                end={true}
                                onClick={handleLogout}
                                className="hover:text-blue-300">
                                Log out
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
