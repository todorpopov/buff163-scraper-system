import { IItem } from "./Item.js"
import { ISticker } from "./Sticker.js"

export class ItemDTO {
    private id: string
    private img_url: string
    private name: string
    private price: number
    private reference_price: number
    private number_of_stickers: number
    private stickers: Array<ISticker>
    private item_offer_url: string
    private paintwear: string
    
    constructor(itemJson: IItem) {
        this.id = itemJson.id
        this.img_url = itemJson.img_url
        this.name = itemJson.name
        this.price = itemJson.price
        this.reference_price = itemJson.reference_price
        this.number_of_stickers = itemJson.number_of_stickers
        this.stickers = itemJson.stickers
        this.item_offer_url = itemJson.item_offer_url
        this.paintwear = itemJson.paintwear
    }

    // public getStr() {
    //     return `code: ${this.code} name: ${this.name} price: ${this.price}`
    // }

    public getId() {
        return this.id
    }

    public getJSON() {
        return { 
            id: this.id,
            img_url: this.img_url,
            name: this.name,
            price: this.price,
            reference_price: this.reference_price,
            number_of_sticker: this.number_of_stickers,
            stickers: this.stickers,
            item_offer_url: this.item_offer_url,
            paintwear: this.paintwear, 
        }
    }
}