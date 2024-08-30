import { IItem } from "../persistence/data/Item.js";
import { ItemDTO } from "../persistence/data/ItemDTO.js";
import { ItemService } from "../persistence/ItemService.js";
import { StickerService } from "../../sticker-scraper/persistence/StickerService.js";
import { Utils } from "../../Utils.js";

export class ItemScraper {
    private shouldScrape: boolean
    private scrapeDelay: number
    private itemService: ItemService
    private stickerService: StickerService

    constructor(itemService: ItemService, stickerService: StickerService){
        this.itemService = itemService
        this.stickerService = stickerService
        this.shouldScrape = false;
        this.scrapeDelay = 5000;
    }

    public async scrapePage(itemCode: string){
        const itemURL = Utils.getItemURL(itemCode)
        let pageData = await fetch(itemURL, Utils.getItemRequestOptions()).then(res => {
            if(res.status !== 200){
                console.log(`\nStatus code: ${res.status}!`)
            }
            return res.json()
        }).catch(error => {
            console.error(`\n${itemCode}: ${error}`)
            return;
        })

        const itemReferencePrice = pageData?.data?.goods_infos[`${itemCode}`]?.steam_price_cny
        if(!itemReferencePrice){
            console.log(`\n${itemCode}: Reference price was not defined!`)
            return
        }

        const itemName = pageData?.data?.goods_infos[`${itemCode}`]?.name
        if(!itemName){
            console.log(`\n${itemCode}: Item name was not defined!`)
            return
        }
        
        const itemImgURL = pageData?.data?.goods_infos[`${itemCode}`]?.icon_url
        const itemsData = pageData?.data?.items

        const itemsWithStickers = itemsData.filter(item => {
            return item?.asset_info?.info.stickers?.length !== 0
        })

        const editedItems = itemsWithStickers.map(item => {
            let stickers = [...item.asset_info.info.stickers]
                stickers.map(async (sticker) => {
                    delete sticker.category
                    delete sticker.sticker_id
                    delete sticker?.offset_x
                    delete sticker?.offset_y
                
                    sticker.price = await this.getStickerPrice(sticker.name)
                })
        
            return { 
                id: item.asset_info.assetid,
                img_url: itemImgURL,
                name: Utils.parseItemName(itemName),
                price: Number(item.price),
                reference_price: Number(itemReferencePrice),
                number_of_stickers: stickers.length,
                stickers: stickers,
                item_offer_url: Utils.getItemOfferURL(item.user_id, Utils.parseItemName(itemName)),
                paintwear: item.asset_info.paintwear
            }
        })

        editedItems.forEach(async (item: IItem) => {
            const itemDto = new ItemDTO(item)
            await this.itemService.saveUnique(itemDto)
        })
    }

    private async scrapeItemCodes(){
        const itemCodes = this.itemService.getItemCodes()
        for(const itemCode of itemCodes){
            if(!this.shouldScrape){
                break;
            }
            await this.scrapePage(itemCode)
            await Utils.sleepMs(this.scrapeDelay)
        }
    }

    public async startScraping() {
        this.shouldScrape = true;
        while(true) {
            if(!this.shouldScrape){
                break;
            }
            await this.scrapeItemCodes()
        }
    }

    public stopScraping() {
        this.shouldScrape = false;
    }

    public changeScrapeDelay(newDelay: string) {
        this.scrapeDelay = Number(newDelay)
    }

    public async entrypoint() {
        if(this.shouldScrape) {return}
        
        while(true) {
            const percentage = await this.stickerService.getPercentageScraped()
            console.log(`Stickers scraped percentage: ${percentage}`)

            if(Number(percentage) >= 95) {
                this.startScraping()
                break;
            } else {
                await Utils.sleepMs(60000)
            }
        }
    }

    private async getStickerPrice(name: string) {
        name = `Sticker | ${name}`
        try {
            const stickerDTO = await this.stickerService.findOneByName(name)
            return stickerDTO.getPrice()
        } catch {
            return -1
        }
    }
}