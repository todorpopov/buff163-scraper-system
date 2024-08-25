import { PersistenceService } from "../persistence/PersistenceService.js";
import { StickerDTO } from "../persistence/data/StickerDTO.js";
import { ScraperUtils } from "./ScraperUtils.js"

export class StickerScraper {
    private shouldScrape: boolean
    private stickerCodes: Array<string>
    private scrapeDelay: number

    constructor(){
        this.shouldScrape = true;
        this.stickerCodes = ScraperUtils.parseStickerCodesFile()
        this.scrapeDelay = 4000;
    }

    private async scrapePage(stickerCode: string){
        const start = performance.now()
        const url = `https://buff.163.com/api/market/goods/sell_order?game=csgo&goods_id=${stickerCode}`
        const options = {
            method: 'GET',
            headers: {Accept: '*/*'}
        }
    
        let pageData = await fetch(url, options).then(res => {
            if(res.status !== 200){
                console.log(`\nStatus code: ${res.status}!`)
            }
            return res.json()
        }).catch(error => {
            console.error(`\n${stickerCode}: ${error}`)
            return;
        })

        let stickerName = ""
        let stickerPrice = ""
        try{    
            const stickerGoodsInfo = pageData.data.goods_infos[`${stickerCode}`]
            stickerName = stickerGoodsInfo.name
            stickerPrice = stickerGoodsInfo.steam_price_cny
        }catch(error){
            console.log(stickerCode + ': ' + error)
            return
        }

        const stickerDto = new StickerDTO(stickerCode, stickerName, stickerPrice)
        await PersistenceService.saveOrUpdate(stickerDto)
        const end = performance.now()
        console.log(`Scraped: ${stickerCode} | took: ${end - start}`)
    }

    private async scrapeStickerCodes(){
        for(const stickerCode of this.stickerCodes){
            if(!this.shouldScrape){
                break;
            }
            await this.scrapePage(stickerCode)
            await ScraperUtils.sleepMs(this.scrapeDelay)
        }
    }

    public async startScraping() {
        this.shouldScrape = true;
        while(true) {
            if(!this.shouldScrape){
                break;
            }
            await this.scrapeStickerCodes()
        }
    }

    public stopScraping() {
        this.shouldScrape = false;
    }

    public changeScrapeDelay(newDelay: string) {
        this.scrapeDelay = Number(newDelay)
    }

    public getCurrentDelay() {
        return this.scrapeDelay
    }

    public getCurrentScrapeStatus() {
        return this.shouldScrape
    }
}