import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); // Your project ID;
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    //method to create a post
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDtabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (err) {
            throw err;

        }
    }

    //method to update post
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDtabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (err) {
            throw err;
        }
    }

    //method to delete post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDtabaseId,
                conf.appwriteCollectionId,
                slug,
            );
            return true;
        } catch (err) {
            return false;
        }
    }

    //method to get post
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDtabaseId,
                conf.appwriteCollectionId,
                slug,
            )

        } catch (err) {
            throw err;

        }
    }

    //method to get all posts
    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDtabaseId,
                conf.appwriteCollectionId,
                queries,
            )

        } catch (err) {
            throw err;

        }
    }

    //file upload service
    //method to upload file
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (err) {
            return false;
            
        }
    }
    //method to delete file
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;
        } catch (err) {
            return false;
            
        }
    }
    //method to get file preview
    async getFilePreview(fileId) {
        try {
            return await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            )
        } catch (err) {
            throw err;
        }
    }
}
const service = new Service();
export default service;