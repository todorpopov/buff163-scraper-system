import { Schema, model } from 'mongoose';
import { ISticker } from './Sticker.js';

export interface IItem {
    id: string,
    img_url: string,
    name: string,
    price: number,
    reference_price: number,
    number_of_stickers: number,
    stickers: Array<ISticker>
    item_offer_url: string,
    paintwear: string
}

const itemSchema = new Schema({
    id: {type: String, unique: true},
    img_url: String,
    name: String,
    price: Number,
    reference_price: Number,
    number_of_stickers: Number,
    stickers: Array,
    item_offer_url: String,
    paintwear: String,
})

export const Item = model<IItem>("Item", itemSchema)