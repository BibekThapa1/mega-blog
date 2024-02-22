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

  async createAccount(email, password, name) {
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
      throw error;
    }
  }

  async login(email, password) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  

  async;
}

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("<PROJECT_ID>"); // Your project ID

const account = new Account(client);

const promise = account.create("[USER_ID]", "email@example.com", "");

promise.then(
  function (response) {
    console.log(response); // Success
  },
  function (error) {
    console.log(error); // Failure
  }
);
