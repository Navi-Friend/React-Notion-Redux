import { useContext } from "react";
import { UserContext } from "../Components/userContext";
import { NavLink } from "react-router-dom";

export default function About() {
    const userContext = useContext(UserContext);
    const prettyDate = new Date(userContext.user.date).toLocaleString()
    return (
        <div className="flex flex-col items-center p-12 text-xl gap-3">
            <h1 className="pb-8 text-5xl">About me</h1>
            <div>
                <b>Email: </b> {userContext.user.email}
            </div>
            <div>
                <b>Date sign up: </b>
                {prettyDate}
            </div>
            <NavLink to="/notes" className="bg-blue-300 px-6 py-4 rounded-lg mt-16">Go to Notes</NavLink>
        </div>
    );
}
