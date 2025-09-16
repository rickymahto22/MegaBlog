import conf from "../conf/conf";
import {Client,Account,ID} from 'appwrite';

export class AuthService{
     client = new Client();
     account; 
     constructor(){// so that account is auto created at time of class call
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteprojectid);
        this.account = new Account(this.client);
     }
// we only need to change functionality of create account and constructor to use another database service if we want anytime 
     async createAccount({email,password,name}){//destructure the object in argument 
            try {
                const userAccount = await this.account
                .create(ID.unique(),email,password,name); 

                if (userAccount) {
                    //call another method maybe to redirect to login
                    return this.login({email,password});// login after creating account 
                } else {
                    return userAccount;
                    
                }
            } catch (error) {
                throw error;
            }
     }

     async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
    try {
        return await this.account.get();
    } catch (error) {
        if (error.code === 401) {
            
            return null;
        }
        console.error("Unexpected error in getCurrentUser", error);
        throw error;
    }
}

     async logout(){
        try {
            await this.account.deleteSession('current');
            
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
     }

}



const authservice = new AuthService();// create an instance and then export so that there is no need of again and again creating one for accesing the methods of class

export default authservice;