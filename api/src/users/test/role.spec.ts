import { Role } from '../data/Role';

describe('Role', () => {
    const adminRole = Role.Admin;
    it('should be string', () => {
        expect(adminRole).toBe("admin");
    });

    const userRole = Role.User;
    it('should be string', () => {
        expect(userRole).toBe("user");
    });
});
