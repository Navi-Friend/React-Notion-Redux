import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { User } from "../utils/validation";
import { UserContext } from "../Components/userContext";
import fetchUser from "../utils/fetchUser";

export default function Login() {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    const [email, setEmail] = useState("");
    const handleSetEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, []);

    const [password, setPassword] = useState("");
    const handleSetPassword = useCallback((e) => {
        setPassword(e.target.value);
    });

    const [errors, setErrors] = useState(null);
    const handleLogIn = useCallback(async () => {
        try {
            User.parse({ email, password });
            setErrors(null);

            const userData = await fetchUser(email, password);
            console.log(userData)
            userContext.setUser(userData);
            navigate("/");
        } catch (err) {
            if (err instanceof z.ZodError) {
                setErrors(err.format());
            } else if (err instanceof Error) {
                setErrors({
                    notFound:
                        "User with this email and password does not found",
                });
            }
        }
    }, [email, password]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div
                className="bg-white p-6 rounded-lg shadow-md w-96 flex flex-col"
                onSubmit={handleLogIn}>
                <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
                {errors?.notFound && (
                    <div className="text-red-500 mb-5">{errors?.notFound}</div>
                )}

                <div className="mb-2">
                    <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleSetEmail}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                {errors?.email && (
                    <div className="text-red-500 mb-5">
                        {errors?.email?._errors.map((err) => (
                            <div key={err}>{err}</div>
                        ))}
                    </div>
                )}
                <div className="mb-2">
                    <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleSetPassword}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                {errors?.password && (
                    <div className="text-red-500 mb-5">
                        {errors?.password?._errors.map((err) => (
                            <div key={err}>{err}</div>
                        ))}
                    </div>
                )}
                <button
                    onClick={handleLogIn}
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200">
                    Log In
                </button>

                <Link to="/signup" className="mt-10 mx-auto w-fit">
                    Don't have an accout? Sign up!
                </Link>
            </div>
        </div>
    );
}
