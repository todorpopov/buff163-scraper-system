import mongoose from "mongoose"
import express from 'express'
import { ItemService } from "./persistence/ItemService.js"
import { ItemScraper } from "./scraper/ItemScraper.js"

export class GlobalConfig {
    private static instance: GlobalConfig
    private app: express.Application
    private itemService: ItemService
    private itemScraper: ItemScraper

    private constructor () {
        this.app = express()
        this.itemService = ItemService.getInstance()
        this.itemScraper = new ItemScraper(this.itemService)

        mongoose.connect(`mongodb://mongo:${process.env.MONGO_DB_PORT}/item-scraper`, {
            serverSelectionTimeoutMS: 5000
        }).then(
            () => {
                console.log(`\nSuccessfully connected to MongoDB on port ${process.env.MONGO_DB_PORT}!`)
                this.app.listen(process.env.ITEM_SCRAPER_PORT, async () => {
                    console.log(`Express.js item server listenning on port ${process.env.ITEM_SCRAPER_PORT}\n`)
                    await this.itemScraper.entrypoint()
                })
            },
            err => {
                console.log(`DB connection error: ${err}`)
            }
        )
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new GlobalConfig();
        return this.instance;
    }

    public getApp() {
        return this.app
    }

    public getItemService(): ItemService {
        return this.itemService
    }

    public getItemScraper(): ItemScraper {
        return this.itemScraper
    }
}