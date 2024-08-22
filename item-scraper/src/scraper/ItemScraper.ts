import { ScraperUtils } from "../scraper/ScraperUtils.js"

export class ItemScraper {
    private shouldScrape: boolean
    private itemCodes: Array<string>
    private scrapeDelay: number

    constructor(){
        this.shouldScrape = true;
        this.itemCodes = ScraperUtils.parseItemCodesFile()
        this.scrapeDelay = 1000;
    }

    public async scrapePage(itemCode: string){
        const itemURL = ScraperUtils.getItemURL(itemCode)
        let pageData = await fetch(itemURL, ScraperUtils.getRequestOptions()).then(res => {
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

        const commonProperties = {
            with_stickers: itemsWithStickers,
            item_img_url: itemImgURL,
            item_name: ScraperUtils.parseItemName(itemName),
            item_ref_price: itemReferencePrice, 
        }

        const editedItems = ScraperUtils.getItems(commonProperties)

        editedItems.forEach(async (item) => {
            console.log(`\nItem code ${itemCode} has been scraped successfully!`)
            // await this.saveToDB(item)
            // this.saveToSubject(item)
        })
    }

    private async scrapeItemCodes(){
        for(const itemCode of this.itemCodes){
            if(!this.shouldScrape){
                break;
            }
            await this.scrapePage(itemCode)
            await ScraperUtils.sleepMs(this.scrapeDelay)
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
}