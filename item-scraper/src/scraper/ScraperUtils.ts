import * as fs from 'fs'

export class ScraperUtils {
    public static getItemURL(itemCode: string){
        return `https://buff.163.com/api/market/goods/sell_order?game=csgo&goods_id=${itemCode}&page_num=1`
    }

    public static parseItemName(itemName: string){
        if(itemName.includes('StatTrak')){
            return itemName.slice(10)
        }
        return itemName
    }

    public static getRequestOptions() {
        const headers = new Headers();
        headers.append("accept", "application/json, text/javascript, */*; q=0.01")
        headers.append("accept-language", "bg-BG,bg;q=0.9,en;q=0.8")
        headers.append("sec-ch-ua", "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"")
        headers.append("sec-ch-ua-mobile", "?0")
        headers.append("sec-ch-ua-platform", "\"Windows\"")
        headers.append("sec-fetch-dest", "empty")
        headers.append("sec-fetch-mode", "cors")
        headers.append("sec-fetch-site", "same-origin")
        headers.append("x-requested-with", "XMLHttpRequest")
        
        const requestOptions = {
            headers: headers,
            body: null,
            method: "GET",
        }

        return requestOptions;
    }
    
    private static editItemStickers(stickersArray: Array<any>){
        let stickersArrayCopy = [...stickersArray]
        stickersArrayCopy.map(sticker => {
            delete sticker.category
            delete sticker.sticker_id
            delete sticker?.offset_x
            delete sticker?.offset_y
        
            sticker.price = -1
        })
    
        return stickersArrayCopy
    }

    private static getItemOfferURL(userId: string, itemName: string){
        return `https://buff.163.com/shop/${userId}#tab=selling&game=csgo&page_num=1&search=${itemName.replaceAll(' ', '%20')}`
    }

    public static getItems(properties: any){
        return properties.with_stickers.map(item => {
            const stickers = this.editItemStickers(item.asset_info.info.stickers) 
        
            return { 
                id: item.asset_info.assetid,
                img_url: properties.item_img_url,
                name: properties.item_name,
                price: Number(item.price),
                reference_price: Number(properties.item_ref_price),
                number_of_stickers: stickers.length,
                stickers: stickers,
                item_offer_url: this.getItemOfferURL(item.user_id, properties.item_name),
                paintwear: item.asset_info.paintwear
            }
        })
    }

    public static sleepMs(ms: number): Promise<void>{
        return new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
    }

    public static parseItemCodesFile(): Array<string>{
        try{
            const data = fs.readFileSync('./src/files/item-codes.txt', 'utf8')
            return data.split('|')
        }catch(error){
            console.error(error)
        }
    }
}