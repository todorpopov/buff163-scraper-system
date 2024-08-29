import mongoose from "mongoose"
import express from 'express'

export class GlobalConfig {
    private static instance: GlobalConfig
    private app

    private constructor() {
        this.app = express()
        mongoose.connect(`mongodb://mongo:${process.env.MONGO_DB_PORT}/sticker-scraper`, {
            serverSelectionTimeoutMS: 5000
        }).then(
            () => {
                console.log(`Successfully connected to MongoDB on port ${process.env.MONGO_DB_PORT}!`)
                this.app.listen(process.env.STICKER_SCRAPER_PORT, () => {
                    console.log(`Express.js sticker server listenning on port ${process.env.STICKER_SCRAPER_PORT}\n`)
                })
            },
            err => {
                throw err
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
}