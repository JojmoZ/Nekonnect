import { User } from "@/utils/model/entity/user";
import { BaseService } from "./base.service";
import { Principal } from "@dfinity/principal";

export class UserService extends BaseService {
    async getCallerPrincipal (id : number) : Promise<Principal> { 
        return await this.user.getCallerPrincipal();
    }

}