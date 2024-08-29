import { Security } from "../security";

describe('Security', () => {
    it('should not match', async () => {
        const password = "plain-password"
        const hashedPassword = await Security.hashPassword(password)

        expect(password === hashedPassword).toBeFalsy();
    });

    it('should match', async () => {
        const password = "plain-password"
        const hashedPassword = await Security.hashPassword(password)
        
        expect(Security.matches(password, hashedPassword)).toBeTruthy();
    });
});
