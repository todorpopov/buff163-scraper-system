import { Schema, model } from 'mongoose'
import { Role } from './Role'

export interface IUser {
    username: string
    email: string
    password: string
    role: Role
}

export const userSchema = new Schema<IUser>({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    password: String,
    role: String
})

export const User = model<IUser>("User", userSchema)