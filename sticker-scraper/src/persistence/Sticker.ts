import { Schema, model } from 'mongoose';

export interface ISticker {
    code: string
    name: string
    price: string
}

const stickerSchema = new Schema<ISticker>({
    code: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: String, required: true}
})

export const Sticker = model<ISticker>("Sticker", stickerSchema)