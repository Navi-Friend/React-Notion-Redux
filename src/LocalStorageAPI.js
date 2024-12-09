export default class LocalStorageAPI {
    static getUser() {
        try {
            const userString = localStorage.getItem("user");
            const user = JSON.parse(userString);
            return user;
        } catch (error) {
            this.setUser("");
        }
    }

    static setUser(user) {
        console.log(user)
        const userString = JSON.stringify(user);
        localStorage.setItem("user", userString);
    }

    static unsetUser() {
        localStorage.setItem("user", "");
    }
}
