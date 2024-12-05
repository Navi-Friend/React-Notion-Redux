import { createContext, useCallback, useMemo, useState } from "react";

export const UserContext = createContext({
    user: {},
    setUser: () => {},
});

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user"));
        } catch (e) {
            return {};
        }
    });

    const handleSetUser = useCallback((user) => {
        const userString = JSON.stringify(user);
        localStorage.setItem("user", userString);
        setUser(user);
    }, []);

    const value = useMemo(
        () => ({
            user,
            setUser: handleSetUser,
        }),
        [user, handleSetUser]
    );
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}
