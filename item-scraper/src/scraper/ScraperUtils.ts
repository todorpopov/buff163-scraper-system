import * as fs from 'fs'
import { CachedSticker } from '../types/CachedSticker.js';
import { ItemScraper } from './ItemScraper.js';

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

    public static getItemRequestOptions() {
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
    
    private static editItemStickers(stickersCache: Array<CachedSticker>, stickersArray: Array<any>){
        let stickersArrayCopy = [...stickersArray]
        stickersArrayCopy.map(sticker => {
            delete sticker.category
            delete sticker.sticker_id
            delete sticker?.offset_x
            delete sticker?.offset_y
        
            sticker.price = ScraperUtils.getStickerPrice(stickersCache, sticker.name)
        })
    
        return stickersArrayCopy
    }

    private static getItemOfferURL(userId: string, itemName: string){
        return `https://buff.163.com/shop/${userId}#tab=selling&game=csgo&page_num=1&search=${itemName.replaceAll(' ', '%20')}`
    }

    public static getItems(properties){
        return properties.with_stickers.map(item => {
            const stickers = this.editItemStickers(properties.stickers_cache, item.asset_info.info.stickers) 
        
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

    private static getStickerPrice(stickersCache: Array<CachedSticker>, name: string) {
        name = `Sticker | ${name}`
        let itemPrice = -1
        stickersCache.forEach(item => {
            if(item.name === name){
                itemPrice = Number(item.price)
            }
        })
        return itemPrice
    }

    private static getStickerServiceHeaders() {
        return {
            headers: {
                "auth": process.env.AUTH
            },
            method: "GET",
        }
    }

    public static async fetchStickersCache(): Promise<Array<CachedSticker>> {
        const stickers = await fetch(`http://sticker-scraper:${process.env.STICKER_SCRAPER_PORT}/stickers-api/get/stickers`, ScraperUtils.getStickerServiceHeaders())
        .then(res => {
            return res.json()
        })
        .catch(error => {
            console.error(error)
            return
        })

        return stickers
    }

    private static async fetchScrapedStickerPercentage(): Promise<number> {
        const percentage = await fetch(`http://sticker-scraper:${process.env.STICKER_SCRAPER_PORT}/stickers-api/get/percentage/scraped`, ScraperUtils.getStickerServiceHeaders())
        .then(res => {
            return res.text()
        })
        .catch(error => {
            console.error(error)
            return -1
        })
        return Number(percentage)
    }

    public static async entrypoint(scraper: ItemScraper) {
        while(true) {
            const percentage = await ScraperUtils.fetchScrapedStickerPercentage()

            if(percentage >= 95) {
                scraper.startScraping()
                break;
            } else {
                await ScraperUtils.sleepMs(60000)
            }
        }
    }
}