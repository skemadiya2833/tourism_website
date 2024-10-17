import { Role } from "../enum/role.enum";

export interface User {
    id: string;
    username: string;
    role: Role,
    email:string,
    isDeleted: boolean;
    password:string;
}