import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Method to create a post
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, // Changed from appwriteDtabaseId
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (err) {
            console.error("Create post error:", err);
            throw err;
        }
    }

    // Method to update post
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, // Changed from appwriteDtabaseId
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (err) {
            console.error("Update post error:", err);
            throw err;
        }
    }

    // Method to delete post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId, // Changed from appwriteDtabaseId
                conf.appwriteCollectionId,
                slug,
            );
            return true;
        } catch (err) {
            console.error("Delete post error:", err);
            return false;
        }
    }

    // Method to get post
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId, // Changed from appwriteDtabaseId
                conf.appwriteCollectionId,
                slug,
            );
        } catch (err) {
            console.error("Get post error:", err);
            throw err;
        }
    }

    // Method to get all posts
    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId, // Changed from appwriteDtabaseId
                conf.appwriteCollectionId,
                queries,
            );
        } catch (err) {
            console.error("Get posts error:", err);
            throw err;
        }
    }

    // File upload service
    // Method to upload file
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            );
        } catch (err) {
            console.error("Upload file error:", err);
            return false;
        }
    }

    // Method to delete file
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            );
            return true;
        } catch (err) {
            console.error("Delete file error:", err);
            return false;
        }
    }

    // Method to get file preview
    async getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            );
        } catch (err) {
            console.error("Get file preview error:", err);
            throw err;
        }
    }
}

const service = new Service();
export default service;