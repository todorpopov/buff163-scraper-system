import { UserUtils } from '../users.utils'

describe('UserDTO', () => {
    const invalidEmail = "invalidEmail.com"
    const validEmail = "valid_email@email.com"

    it('should be invalid', () => {
        expect(UserUtils.isEmailValid(invalidEmail)).toBe(false);
    });

    it('should be valid', () => {
        expect(UserUtils.isEmailValid(validEmail)).toBe(true);
    });
});