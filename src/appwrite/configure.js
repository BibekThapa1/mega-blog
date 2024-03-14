// This file include services relaating to uploading and creating the file and databases.

import conf from "../conf/config";
import { Databases, Client, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Databases(this.client);
  }

  async createPost({ title, content, slug, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          featuredImage,
          status,
          userId,
          content,
        }
      );
    } catch (error) {
      console.log("Appwrite Error: CreateFile Method", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          featuredImage,
          status,
          content,
        }
      );
    } catch (error) {}
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Error: DeletePost Method", error);
    }
  }

  async getPost() {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Error: getPost Method", error);
    }
  }

  //   File related services
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Error: createFile Method", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Error: deleteFile Method", error);
      return false;
    }
  }

  async getFilePreview(fileId) {
      return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;