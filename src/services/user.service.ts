import { User } from "@/lib/model/entity/user";
import { BaseService } from "./base.service";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import { AnonymousIdentity, Identity, SignIdentity } from "@dfinity/agent";
import { userDto } from "@/lib/model/dto/edit-user.dto";
import { useNavigate } from "react-router";

export class UserService extends BaseService {

    private II_URL = process.env.DFX_NETWORK != "ic" ? `https://identity.ic0.app/` : `http://${ process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943/`;

    async login () {
        try {
            await this.authClient.login({
                identityProvider: this.II_URL,
                onSuccess: async () => {
                    await this.createUser({username: ""});
                },
                onError: (err) => {
                    console.error('Internet Identity Login failed:', err);
                },
            });
        } catch (err) {
            console.error('Auth error:', err);
        }
    };

    async logout() {
        try {
            await this.authClient.logout();
        } catch (err) {
            console.error('Logout Error:', err);
        }
    }

    async me() : Promise<User> {
        const principal = this.authClient.getIdentity().getPrincipal();
        if (principal instanceof AnonymousIdentity) {
            throw new Error('User is not authenticated');
        }
        const users = await this.user.getUserByPrincipal(principal);
        if (users.length > 0 && users[0] != null) {
            return users[0];
        } else {
            throw new Error('User not found');
        }
    }

    async editUser(user: userDto): Promise<User> {
        try {
            
            const response = await this.user.editUserProfile({
                internetIdentity: await this.getCallerPrincipal(),
                username: user.username,
            });
            if ('ok' in response) {
            const { internetIdentity, username } = response.ok;
            return { internetIdentity, username };
            } else {
            throw new Error(`Error editing user profile: ${response.err}`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createUser(user: userDto): Promise<User> {
        try {
            
            const response = await this.user.createUser({
                internetIdentity: await this.getCallerPrincipal(),
                username: user.username,
            });
            if ('ok' in response) {
                const { internetIdentity, username } = response.ok;
                return { internetIdentity, username };
            } else {
                throw new Error(`Error creating user: ${response.err}`);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
}