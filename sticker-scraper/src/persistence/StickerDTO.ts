export class StickerDTO {
    private code: string
    private name: string
    private price: string
    
    constructor(code: string, name: string, price: string) {
        this.code = code
        this.name = name
        this.price = price
    }

    public getCode() {
        return this.code
    }

    public getName() {
        return this.name
    }

    public getPrice() {
        return this.price
    }

    public getStr() {
        return `code: ${this.code} name: ${this.name} price: ${this.price}`
    }

    public getJSON() {
        return { code: this.code, name: this.name, price: this.price }
    }
}