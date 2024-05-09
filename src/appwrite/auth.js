import { Client, Account, ID } from "appwrite";
import conf from "../conf/config";

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
      const userId = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userId) {
        //  Call another method
        return this.login({ email, password });
      } else {
        return userId;
      }
    } catch (error) {
      console.log("Apprite CreateAccount:", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw new Error();
    }
  }

  async getUserAccount() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service : Error", error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service : Error", error);
    }
  }
}
const authService = new AuthService();
export default authService;

// const client = new Client()
//   .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
//   .setProject("<PROJECT_ID>"); // Your project ID

// const account = new Account(client);

// const promise = account.create("[USER_ID]", "email@example.com", "");

// promise.then(
//   function (response) {
//     console.log(response); // Success
//   },
//   function (error) {
//     console.log(error); // Failure
//   }
// );
