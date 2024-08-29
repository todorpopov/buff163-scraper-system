import mongoose from "mongoose"
import express from 'express'
import { StickerService } from "./persistence/StickerService.js"
import { StickerScraper } from "./scraper/StickerScraper.js"

export class GlobalConfig {
    private static instance: GlobalConfig
    private app: express.Application
    private stickerService: StickerService
    private stickerScraper: StickerScraper

    private constructor() {
        this.app = express()
        this.stickerService = StickerService.getInstance()
        this.stickerScraper = new StickerScraper(this.stickerService)

        mongoose.connect(`mongodb://mongo:${process.env.MONGO_DB_PORT}/sticker-scraper`, {
            serverSelectionTimeoutMS: 5000
        }).then(
            () => {
                console.log(`Successfully connected to MongoDB on port ${process.env.MONGO_DB_PORT}!`)
                this.app.listen(process.env.STICKER_SCRAPER_PORT, () => {
                    console.log(`Express.js sticker server listenning on port ${process.env.STICKER_SCRAPER_PORT}\n`)
                    this.stickerScraper.startScraping()
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
}