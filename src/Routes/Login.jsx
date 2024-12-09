import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { User } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/middleware";
import BackendAPI from "../BackendAPI";

export default function Login() {
    const navigate = useNavigate();

    const isLoading = useSelector((state) => state.user.loading);
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const handleSetEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, []);

    const [password, setPassword] = useState("");
    const handleSetPassword = useCallback((e) => {
        setPassword(e.target.value);
    });

    const [loadedUser, setLoadedUser] = useState(null);
    const [errors, setErrors] = useState(null);
    const handleLogIn = useCallback(async () => {
        try {
            User.parse({ email, password });
            setErrors(null);

            const user = await BackendAPI.getUser(
                "",
                email,
                password
            );
            if (user === null) throw new Error()
            setLoadedUser(user);
        } catch (err) {
            if (err instanceof z.ZodError) {
                setErrors(err.format());
            } else if (err instanceof Error) {
                console.error(err);
                setErrors({
                    notFound:
                        "User with this email and password does not found",
                });
            }
        }
    }, [email, password]);

    useEffect(() => {
        if (!isLoading && loadedUser) {
            dispatch(setUser(loadedUser));
            navigate("/");
        }
    }, [loadedUser]);

    return (
        <div className="flex items-center flex-col justify-center min-h-screen bg-gray-100">
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
            </div>
            <div className="w-fit mx-auto mt-3">
                Don't have an accout?
                <Link to="/signup" className="text-blue-600 font-bold pl-1">
                    Sign up!
                </Link>
            </div>
        </div>
    );
}
