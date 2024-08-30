import express from 'express'
import { ItemScraper } from './scraper/ItemScraper.js'
import { ItemService } from './persistence/ItemService.js'

export class ItemRouterConfig {
    private static instance: ItemRouterConfig
    private router: express.Router
    private itemScraperInstance: ItemScraper
    private itemServiceInstance: ItemService

    private constructor(itemScraperInstance: ItemScraper, itemServiceInstance: ItemService) {
        this.itemScraperInstance = itemScraperInstance
        this.itemServiceInstance = itemServiceInstance
        this.router = express.Router()

        this.router.put("/start", (req, res) => {
            try {
                this.itemScraperInstance.startScraping()
                res.status(200).send()
            } catch(err) {
                res.status(500).send(err)
            }
        })

        this.router.put("/stop", (req, res) => {
            try {
                this.itemScraperInstance.stopScraping()
                res.status(200).send()
            } catch(err) {
                res.status(500).send(err)
            }
        })

        this.router.get("/get/all", async (req, res) => {
            try {
                const items = await this.itemServiceInstance.getAll()
                res.status(200).send(items)
            } catch(err) {
                res.status(500).send(err)
            }
        })

        this.router.get("/get/count", async (req, res) => {
            try {
                const count = await this.itemServiceInstance.getCount()
                res.status(200).send(String(count))
            } catch(err) {
                res.status(500).send(err)
            }
        })

        this.router.get("/get/codes/count", (req, res) => {
            try {
                const count = this.itemServiceInstance.getItemCodesCount()
                res.status(200).send(String(count))
            } catch(err) {
                res.status(500).send(err)
            }
        })

        this.router.delete("/delete/all", async (req, res) => {
            try {
                await this.itemServiceInstance.dropAll()
                res.status(200).send()
            } catch(err) {
                res.status(500).send(err)
            }
        })
    }

    static getInstance(itemScraperInstance: ItemScraper, itemServiceInstance: ItemService): ItemRouterConfig {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new ItemRouterConfig(itemScraperInstance, itemServiceInstance);
        return this.instance;
    }

    public getRouter(): express.Router {
        return this.router
    }
}