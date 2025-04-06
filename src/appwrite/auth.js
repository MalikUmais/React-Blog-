import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // Login after account creation
                return this.login({ email, password });
            } else {
                return null;
            }
        } catch (err) {
            console.error("Account creation error:", err);
            throw err;
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailSession(email, password);
            if (session) {
                // Return user data after successful login
                return this.getCurrentUser();
            }
            return null;
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSession('current');
        } catch (err) {
            console.error("Logout error:", err);
            throw err;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (err) {
            console.error("Get current user error:", err);
            return null;
        }
    }

    async isLoggedIn() {
        try {
            const user = await this.getCurrentUser();
            return Boolean(user);
        } catch {
            return false;
        }
    }
}

const authService = new AuthService();
export default authService;