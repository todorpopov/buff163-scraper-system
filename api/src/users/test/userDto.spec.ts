import { Role } from "../data/Role";
import { UserDTO } from "../data/UserDTO";

describe('UserDTO', () => {
    const role = Role.Admin
    const user = new UserDTO("username", "email", "password", role)

    it('should be username', () => {
        expect(user.getUsername()).toBe("username");
    });

    it('should be email', () => {
        expect(user.getEmail()).toBe("email");
    });

    it('should be passworn', () => {
        expect(user.getPassword()).toBe("password");
    });
    
    it('should be admin', () => {
        expect(user.getRole()).toBe("admin");
    });
});
  