import { IUser } from "./User"
import { UserDTO } from "./UserDTO"

export class DataConversion {
    public static toDto(user: IUser) {
        return new UserDTO(user.username, user.email, user.password, user.role)
    }
}