import express from 'express'
import { StickerScraper } from './scraper/StickerScraper.js'
import { StickerService } from './persistence/StickerService.js'

export class StickerRouterConfig {
    private static instance: StickerRouterConfig
    private router: express.Router
    private stickerScraperInstance: StickerScraper
    private stickerServiceInstance: StickerService

    private constructor(stickerScraperInstance: StickerScraper, stickerServiceInstance: StickerService) {
        this.stickerScraperInstance = stickerScraperInstance
        this.stickerServiceInstance = stickerServiceInstance
        this.router = express.Router()

        this.router.put("/start", (req, res) => {
            try {
                this.stickerScraperInstance.startScraping()
                res.status(200).send()
            } catch(err) {
                res.status(500).send(err)
            }
        })

        this.router.put("/stop", (req, res) => {
            try {
                this.stickerScraperInstance.stopScraping()
                res.status(200).send()
            } catch(err) {
                res.status(500).send(err)
            }
        })

        this.router.get("/get/all", async (req, res) => {
            try {
                const stickers = await this.stickerServiceInstance.getAll()
                res.status(200).send(stickers)
            } catch(err) {
                res.status(500).send(err)
            }
        })

        this.router.get("/get/code/:code", async (req, res) => {
            try {
                const code = String(req.params.code)
                const sticker = await this.stickerServiceInstance.findOneByCode(code)
                res.status(200).send(sticker)
            } catch(err) {
                res.status(500).send(err)
            }
        })

        this.router.get("/get/name/:name", async (req, res) => {
            try {
                const name = String(req.params.name)
                const sticker = await this.stickerServiceInstance.findOneByName(name)
                res.status(200).send(sticker)
            } catch(err) {
                res.status(500).send(err)
            }
        })

        this.router.get("/get/delay", (req, res) => {
            try {
                const delay = this.stickerScraperInstance.getCurrentDelay()
                res.status(200).send(String(delay))
            } catch(err) {
                res.status(500).send(err)
            }
        })

        this.router.get("/get/status", (req, res) => {
            try {
                const currentStatus = this.stickerScraperInstance.getCurrentScrapeStatus()
                res.status(200).send(currentStatus)
            } catch(err) {
                res.status(500).send(err)
            }
        })

        this.router.get("/get/count", async (req, res) => {
            try {
                const count = await this.stickerServiceInstance.getCount()
                res.status(200).send(String(count))
            } catch(err) {
                res.status(500).send(err)
            }
        })

        this.router.get("/get/codes/count", (req, res) => {
            try {
                const count = this.stickerServiceInstance.getStickerCodesCount()
                res.status(200).send(String(count))
            } catch(err) {
                res.status(500).send(err)
            }
        })

        this.router.get("/get/percentage", async (req, res) => {
            try {
                const response = await this.stickerServiceInstance.getPercentageScraped()
                res.status(200).send(response)
            } catch(err) {
                res.status(500).send(err)
            }
        })

        this.router.delete("/delete/all", async (req, res) => {
            try {
                await this.stickerServiceInstance.dropAll()
                res.status(200).send()
            } catch(err) {
                res.status(500).send(err)
            }
        })

        this.router.put("/change/delay", (req, res) => {
            try {
                const delay = String(req.query.delay)
                this.stickerScraperInstance.changeScrapeDelay(delay)
                res.status(200).send()
            } catch(err) {
                res.status(500).send(err)
            }
        })

    }

    static getInstance(stickerScraperInstance: StickerScraper, stickerServiceInstance: StickerService): StickerRouterConfig {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new StickerRouterConfig(stickerScraperInstance, stickerServiceInstance);
        return this.instance;
    }

    public getRouter(): express.Router {
        return this.router
    }
}