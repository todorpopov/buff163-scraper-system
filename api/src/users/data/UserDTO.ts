import { RoleNotValid } from "../../errors/RoleNotValid"
import { Role } from "./Role"
import { IUser } from "./User"

export class UserDTO {
    private username: string
    private email: string
    private password: string
    private role: Role

    constructor(username: string, email: string, password: string, role: string) {
        this.username = username
        this.email = email
        this.password = password
        if(role === "admin") {
            this.role = Role.Admin
        } else if(role === "user") {
            this.role = Role.User
        } else {
            throw RoleNotValid("This role is not valid!")
        }
    }

    public getUsername(): string {
        return this.username
    }

    public getEmail(): string {
        return this.email
    }

    public getPassword(): string {
        return this.password
    }
    
    public getRole(): Role {
        return this.role
    }

    public setUsername(username: string): void {
        this.username = username
    }

    public setEmail(email: string): void {
        this.email = email
    }

    public setPassword(password: string): void {
        this.password = password
    }
    
    public setRole(role: Role): void {
        this.role = role
    }

    public getJson(): IUser {
        return {
            username: this.username,
            email: this.email,
            password: this.password,
            role: this.role
        }
    }
}