import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unsetUser } from "../Redux/middleware";

export default function Header() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(unsetUser())
    };

    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <NavLink to="/" end={true}>
                        {`Hello, ${user.email}!`}
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
