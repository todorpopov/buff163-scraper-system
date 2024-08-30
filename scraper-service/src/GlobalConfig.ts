import mongoose from "mongoose"
import express from 'express'

import { StickerService } from "./sticker-scraper/persistence/StickerService.js"
import { StickerScraper } from "./sticker-scraper/scraper/StickerScraper.js"

import { ItemService } from "./item-scraper/persistence/ItemService.js"
import { ItemScraper } from "./item-scraper/scraper/ItemScraper.js"

export class GlobalConfig {
    private static instance: GlobalConfig
    private app: express.Application
    private stickerService: StickerService
    private stickerScraper: StickerScraper
    private itemService: ItemService
    private itemScraper: ItemScraper

    private constructor() {
        this.app = express()

        this.stickerService = StickerService.getInstance()
        this.stickerScraper = new StickerScraper(this.stickerService)

        this.itemService = ItemService.getInstance()
        this.itemScraper = new ItemScraper(this.itemService, this.stickerService)

        mongoose.connect(`mongodb://mongo:${process.env.MONGO_DB_PORT}/sticker-scraper`, {
            serverSelectionTimeoutMS: 5000
        }).then(
            () => {
                console.log(`Successfully connected to MongoDB on port ${process.env.MONGO_DB_PORT}!`)
                this.app.listen(process.env.STICKER_SCRAPER_PORT, async () => {
                    console.log(`Express.js sticker server listenning on port ${process.env.STICKER_SCRAPER_PORT}\n`)
                    this.stickerScraper.startScraping()
                    await this.itemScraper.entrypoint()
                })
            },
            err => {
                throw err
            }
        )
    }

    static getInstance(): GlobalConfig {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new GlobalConfig();
        return this.instance;
    }

    public getApp(): express.Application {
        return this.app
    }

    public getStickerService(): StickerService {
        return this.stickerService
    }

    public getStickerScraper(): StickerScraper {
        return this.stickerScraper
    }

    public getItemService(): ItemService {
        return this.itemService
    }

    public getItemScraper(): ItemScraper {
        return this.itemScraper
    }
}