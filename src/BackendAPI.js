export default class BackendAPI {
    static #BASE_URL = "http://localhost:3000";
    static #USERS_URL = `${this.#BASE_URL}/users/`;

    static getUsersURL() {
        return this.#USERS_URL;
    }

    static getUserDataURL(id = "") {
        const url = new URL(`${this.#BASE_URL}/users/${id}`);
        return url;
    }

    static getUser(id = "", email = "", password = "") {
        if (id === "" && email === "" && password === "") return null;

        const url = new URL(this.getUserDataURL(id));
        url.searchParams.append("email", email.toLocaleLowerCase());
        url.searchParams.append("password", password);
        console.log(url);
        return this.#fetch(url)
            .then((user) => {
                console.log(user);
                if (!user || (user instanceof Array && !user.length)) {
                    return null;
                }

                if (user instanceof Array && user.length) {
                    return user[0];
                }
                return user;
            })
            .catch((error) => {
                throw error;
            });
    }

    static async createUser(user) {
        try {
            const existingUser = await BackendAPI.getUser("", user.email, "");
            if (existingUser) {
                throw new Error(
                    JSON.stringify({
                        userExists: "User with this email already exists",
                    })
                );
            }

            user = { ...user, email: user.email.toLowerCase() };
            const response = await fetch(this.#USERS_URL, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(
                    JSON.stringify({ serverError: "Server error" })
                );
            }
        } catch (err) {
            throw err;
        }
    }

    static async changeUserData(userData) {
        try {
            userData = { ...userData, email: userData.email.toLowerCase() };

            const response = await fetch(this.getUserDataURL(userData.id), {
                method: "PUT",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(
                    JSON.stringify({ serverError: "Server error" })
                );
            }
        } catch (error) {
            throw error;
        }
    }

    static #fetch = async (url) => {
        const r = await fetch(url);
        if (!r.ok) {
            throw new Error("Error retrieving user data");
        }
        return await r.json();
    };
}
