import { User as AppUser} from "@/lib/model/entity/user";
import { BaseService, createUserActor, userCanisterId } from "./base.service";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import { ActorSubclass, AnonymousIdentity, Identity, SignIdentity } from "@dfinity/agent";
import { userDto } from "@/lib/model/dto/edit-user.dto";
import { useNavigate } from "react-router";
import { _SERVICE as _USERSERVICE } from "@/declarations/user/user.did";
import { User as BackendUser } from "@/declarations/user/user.did"; 
export class UserService extends BaseService {
    
    
    private II_URL = import.meta.env.VITE_II_NETWORK == "ic" ? `https://identity.ic0.app/` : `http://${ process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943/`;
    protected user! : ActorSubclass<_USERSERVICE>;
    constructor() {
        super();
        this.user = createUserActor(userCanisterId, {agent : this.agent});
        this.initialized = this.initialization();
    }
async login(): Promise<AppUser | null> {
    try {
        return new Promise(async (resolve, reject) => {
            await this.authClient.login({
                identityProvider: this.II_URL,
                onSuccess: async () => {
                    try {
                        const principal = this.authClient.getIdentity().getPrincipal();
                        let userArray = await this.user.getUserByPrincipal(principal);

                        let user: AppUser | null = userArray.length > 0 && userArray[0] !== undefined ? userArray[0] : null;

                        if (!user) {
                            user = await this.createUser({
                                internetIdentity: principal, 
                                username: "",
                                dob: "",
                                nationality: "",
                                gender: "Other",
                                email: "",
                                faceEncoding: [], 
                            });

                            console.log("✅ User created in backend:", user);
                             await new Promise(resolve => setTimeout(resolve, 500));
                             userArray = await this.user.getUserByPrincipal(principal);
                             user = userArray.length > 0 && userArray[0] !== undefined ? userArray[0] : null;
                        } 
                        if(user){
                            resolve({
                                ...user,
                                faceEncoding: user.faceEncoding && user.faceEncoding.length > 0
                                    ? [new Float64Array(user.faceEncoding[0] as number[])] 
                                    : [],
                            });
                        }else{
                            reject(new Error("❌ User could not be found after retry."));
                        }

                        
                    } catch (error) {
                        console.error("❌ Error fetching/creating user:", error);
                        reject(error);
                    }
                },
                onError: (err) => {
                    console.error("❌ Internet Identity Login failed:", err);
                    reject(err);
                },
            });
        });
    } catch (err) {
        console.error("❌ Auth error:", err);
        throw err;
    }
}



    async logout() {
        try {
            await this.authClient.logout();
        } catch (err) {
            console.error('Logout Error:', err);
        }
    }

   async me(retries = 5, delay = 500): Promise<AppUser> {
    const principal = await this.authClient.getIdentity().getPrincipal();
    if (principal instanceof AnonymousIdentity) {
        throw new Error("User is not authenticated");
    }
    for (let attempt = 0; attempt < retries; attempt++) {
        const users = await this.user.getUserByPrincipal(principal);

        if (users.length > 0 && users[0] != null) {
            console.log(`✅ Found user after ${attempt + 1} attempt(s)`);
            return users[0];
        }

        console.warn(`⚠️ User not found, retrying in ${delay}ms... (${attempt + 1}/${retries})`);
        await new Promise((resolve) => setTimeout(resolve, delay));

        
        delay *= 2;
    }

    throw new Error("❌ User not found after multiple attempts.");
}



    async isAuthenticated() : Promise<boolean> {
        return await this.authClient.isAuthenticated();
    }

  async editUser(user: AppUser): Promise<AppUser> {
    try {
        const response = await this.user.editUserProfile({
            internetIdentity: user.internetIdentity,
            username: user.username,
            dob: user.dob,
            nationality: user.nationality,
            gender: user.gender,
            email: user.email,
             faceEncoding: user.faceEncoding && user.faceEncoding.length > 0 
                ? [Array.from(user.faceEncoding[0] as Float64Array)]  
                : [],  
        } as BackendUser); 

       if ("ok" in response) {
            return {
                ...response.ok,
                faceEncoding: response.ok.faceEncoding.length > 0 && response.ok.faceEncoding[0]
                    ? [new Uint8Array(response.ok.faceEncoding[0])]  
                    : [],
            } as AppUser;
        } else {
            throw new Error(`Error editing user profile: ${response.err}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

     async createUser(user: AppUser): Promise<AppUser> {
    try {
        const response = await this.user.createUser({
            internetIdentity: user.internetIdentity,
            username: user.username,
            dob: user.dob,
            nationality: user.nationality,
            gender: user.gender,
            email: user.email,
            faceEncoding: user.faceEncoding && user.faceEncoding.length > 0
                ? [Array.from(user.faceEncoding[0] as Float64Array)] 
                : [], 
        } as BackendUser); 

        if ("ok" in response) {
            return {
                ...response.ok,
                faceEncoding: response.ok.faceEncoding.length > 0 && response.ok.faceEncoding[0]
                    ? [new Uint8Array(response.ok.faceEncoding[0])]  
                    : [],
            } as AppUser;
        } else {
            throw new Error(`Error creating user: ${response.err}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}




    
}