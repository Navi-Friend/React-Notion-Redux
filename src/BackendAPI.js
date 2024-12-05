export default class BackendAPI {
    static #BASE_URL = "http://localhost:3000";
    static #USERS_URL = `${this.#BASE_URL}/users/`;

    static getUsersURL() {
        return this.#USERS_URL;
    }

    static getUserDataURL(uuid = "") {
        const url = new URL(`${this.#BASE_URL}/users`);
        url.searchParams.append("uuid", uuid);
        return url;
    }

    static getUser(uuid = "", email = "", password = "") {
        const url = new URL(this.getUserDataURL(uuid));
        url.searchParams.append("email", email);
        url.searchParams.append("password", password);

        return this.#fetch(url)
            .then((users) => {
                if (!users || !users.length) {
                    console.log(url, users);
                    throw new Error("Was gotten not one user");
                }
                return users[0];
            })
            .catch((error) => {
                throw error;
            });
    }

    static #fetch = (url) => {
        return fetch(url).then((r) => {
            if (!r.ok) {
                throw new Error("Error retrieving user data");
            }
            return r.json();
        });
    };
}
