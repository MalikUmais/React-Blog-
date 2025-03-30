import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); // Your project ID;
        this.account = new Account(this.client);

    }

    //signup method
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //callig other method
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (err) {
            throw err;
        }
    }
    //signin method
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (err) {
            throw err;
        }
    }

    async logout() {
        try{
            return await this.account.deleteSessions();

        }catch(err){
            throw err;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
            
        } catch (err) {
            throw err;
        }
        return null;
    }
}
const authService = new AuthService();

export default authService;
