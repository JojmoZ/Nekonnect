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
    
    
    private II_URL = import.meta.env.VITE_II_NETWORK != "ic" ? `https://identity.ic0.app/` : `http://${ process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943/`;
    protected user! : ActorSubclass<_USERSERVICE>;

    constructor() {
        super();
        this.user = createUserActor(userCanisterId, {agent : BaseService.agent});
        this.initialized = this.initialization();
    }
async login(): Promise<AppUser | null> {
    try {
        return new Promise(async (resolve, reject) => {
            await BaseService.authClient.login({
                identityProvider: this.II_URL,
                onSuccess: async () => {
                    try {
                        const principal = BaseService.authClient.getIdentity().getPrincipal();
                        let userArray = await this.user.getUserByPrincipal(principal);

                        let user: AppUser | null = userArray.length > 0 && userArray[0] !== undefined ? userArray[0] : null;

                        if (!user) {
                            user = await this.createUser({
                                internetIdentity: principal, // ✅ Ensure `internetIdentity` is included
                                username: "",
                                dob: "",
                                nationality: "",
                                gender: "Other",
                                email: "",
                                faceEncoding: [], // ✅ Default empty `faceEncoding` (Never undefined)
                            });

                            console.log("✅ User created in backend:", user);
                        } else {
                            console.log("✅ User already exists in backend:", user);
                        }

                        // ✅ Convert `faceEncoding` to the correct format before returning
                        resolve({
                            ...user,
                            faceEncoding: user.faceEncoding && user.faceEncoding.length > 0
                                ? [new Uint8Array(user.faceEncoding[0] as number[])] // ✅ Convert `number[]` to `Uint8Array`
                                : [],
                        });
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
            await BaseService.authClient.logout();
        } catch (err) {
            console.error('Logout Error:', err);
        }
    }

    async me() : Promise<AppUser| null > {
        const principal = BaseService.authClient.getIdentity().getPrincipal();
        if (principal instanceof AnonymousIdentity) {
            // throw new Error('User is not authenticated');
            return null;
        }
        const users = await this.user.getUserByPrincipal(principal);
        if (users.length > 0 && users[0] != null) {
             // ✅ Convert `number[]` to `Uint8Array` if necessary
        return {
            ...users[0],
            faceEncoding: users[0].faceEncoding && users[0].faceEncoding.length > 0 && users[0].faceEncoding[0]
                ? [new Uint8Array(users[0].faceEncoding[0])] // ✅ Convert number[] to Uint8Array
                : [], // ✅ Ensure `faceEncoding` is always defined
        } as AppUser;
        } else {
            // throw new Error('User not found');
            return null;
        }
    }

    async isAuthenticated() : Promise<boolean> {
        return await BaseService.authClient.isAuthenticated();
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
            faceEncoding: user.faceEncoding ? [user.faceEncoding] : [], // ✅ Fix: Convert to correct format
        } as BackendUser); // ✅ Explicitly cast to backend type

        if ("ok" in response) {
            return response.ok as AppUser; // ✅ Convert back to frontend type
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
                internetIdentity: await this.getCallerPrincipal(),
                username: user.username,
                dob: user.dob,
                nationality: user.nationality,
                gender: user.gender,
                faceEncoding: user.faceEncoding && user.faceEncoding.length > 0 && user.faceEncoding[0]
                ? [Array.from(user.faceEncoding[0])] 
                : [], 
        } as BackendUser); 

            if ('ok' in response) {
                return response.ok;
            } else {
                throw new Error(`Error creating user: ${response.err}`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
     async getAllUser() : Promise<AppUser[]> {
        try {
            const response = await this.user.getAllUsers();
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
