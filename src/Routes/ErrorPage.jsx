import { NavLink } from "react-router-dom";
import LocalStorageAPI from "../LocalStorageAPI";

export default function ErrorPage() {
    const user = LocalStorageAPI.getUser();

    return (
        <div id="error-page" className="text-3xl mx-auto w-fit">
            <h1 className="w-fit">Oops!</h1>
            <p className="w-fit">It seems this page is not fount.</p>

            {!user.email ? (
                <NavLink
                    className="w-fit text-xl leading-8 text-blue-700 hover:text-blue-900"
                    to="/login"
                    end>
                    Log In
                </NavLink>
            ) : (
                <NavLink
                    className="w-fit text-xl leading-8 text-blue-700 hover:text-blue-900"
                    to="/"
                    end>
                    Return Home
                </NavLink>
            )}
        </div>
    );
}
