import * as bcrypt from 'bcryptjs';

export class Security {
    public static hashPassword(password: string): string {
        const salt = process.env.API_HASH_SALT
        return bcrypt.hashSync(password, salt)
    }

    public static matches(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash)
    }
}