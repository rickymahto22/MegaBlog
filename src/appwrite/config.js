import conf from "../conf/conf";
import {Client,ID,Databases,Storage,Query} from 'appwrite';


export class Service{
    client =new Client();
    databases;
    bucket; 
    //these above are the services we need to use from appwrite
    constructor(){
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteprojectid);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwritedatabaseid
                ,conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }


            )      
        } catch (error) {
            console.log(error);
        }
    }  

    async updatePost(slug,{title,content,featuredImage,status}){

        try {
            return await this.databases.updateDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async deletePost(slug){

        try {
           return await this.databases.deleteDocument(
            conf.appwritedatabaseid,
            conf.appwritecollectionid,
            slug
           )
           return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                slug)
        } catch (error) {
            console.log(error);
        }
    }

    async getPosts(queries = [
        Query.equal('status','active')
        //queries can only be put once we have made indexes in our databases here we have made status as our index (ifwe have used enum in our datatype then it would have been more easy)
    ]){

        try {
            return await this.databases.listDocuments(
                conf.appwritedatabaseid,
                conf.appwritecollectionid,
                queries
            )
        
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async uploadFile(file){ //here we donot pass filename instead we pass whole file blob
     try {
        return await this.bucket.createFile(
            conf.appwritebucketid,
            ID.unique(),
            file)

     } catch (error) {
        console.log(error);
        return false;   
     }
    
    }

    async deleteFile(fileid){
        try {
            return await this.bucket.deleteFile(
                conf.appwritebucketid,
                fileid
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
   
    }

    getFilePreview(fileid){//returns url of image 
        return this.bucket.getFileDownload(
            conf.appwritebucketid,
            fileid
        )
    }

}

const service = new Service();
export default service;3