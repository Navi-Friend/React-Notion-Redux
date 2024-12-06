export default class LocalStorageAPI {
    static getUser() {
        const userString = localStorage.getItem("user")
        const user = JSON.parse(userString)
        return user
    }

    static setUser(user) {
        const userString = JSON.stringify(user);
        localStorage.setItem("user", userString);
    }

    static unsetUser() {
        localStorage.setItem("user", "");
    }
}