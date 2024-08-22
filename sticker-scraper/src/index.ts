import { StickerScraper } from "./scraper/StickerScraper.js"
import express, { Request } from 'express'
import mongoose from "mongoose"
import { PersistenceService } from "./persistence/PersistenceService.js"

const app = express()
const port = 3000
const scraper = new StickerScraper()

mongoose.connect('mongodb://mongo:27017/sticker-scraper', {
    serverSelectionTimeoutMS: 5000
}).then(
    () => {
        console.log("Successfully connected to MongoDB!")
        app.listen(port, () => {
            console.log(`Express.js server running on port ${port}`)
            // scraper.startScraping()
        })
    },
    err => {
        console.log(`DB connection error: ${err}`)
    }
)

app.use(function(req, res, next) {
    if (req.headers.auth !== process.env.AUTH) {
        return res.status(403).send("No credentials sent!");
    }
    next();
});

app.put("/stickers-api/start", (req, res) => {
    try {
        scraper.startScraping()
        res.status(200).send("Scraping process has started!")
    } catch {
        res.status(500).send("Server error has occured!")
    }
})

app.put("/stickers-api/stop", (req, res) => {
    try {
        scraper.stopScraping()
        res.status(200).send("Scraping process has ended!")
    } catch {
        res.status(500).send("Server error has occured!")
    }
})

app.get("/stickers-api/get/stickers", async (req, res) => {
    try {
        const stickers = await PersistenceService.getAll()
        res.status(200).send(stickers)
    } catch {
        res.status(500).send("Server error has occured!")
    }
})

app.get("/stickers-api/get/sticker/code/:code", async (req, res) => {
    try {
        const code = String(req.params.code)
        const sticker = await PersistenceService.findOneByCode(code)
        res.status(200).send(sticker)
    } catch {
        res.status(500).send("Server error has occured!")
    }
})

app.get("/stickers-api/get/sticker/name/:name", async (req, res) => {
    try {
        const name = String(req.params.name)
        const sticker = await PersistenceService.findOneByName(name)
        res.status(200).send(sticker)
    } catch {
        res.status(500).send("Server error has occured!")
    }
})

app.get("/stickers-api/get/current/delay", async (req, res) => {
    try {
        const delay = scraper.getCurrentDelay()
        res.status(200).send(delay)
    } catch {
        res.status(500).send("Server error has occured!")
    }
})

app.get("/stickers-api/get/current/scraping-status", async (req, res) => {
    try {
        const currentStatus = scraper.getCurrentScrapeStatus()
        res.status(200).send(currentStatus)
    } catch {
        res.status(500).send("Server error has occured!")
    }
})

app.get("/stickers-api/get/sticker/name/:name", async (req, res) => {
    try {
        const name = String(req.params.name)
        const sticker = await PersistenceService.findOneByName(name)
        res.status(200).send(sticker)
    } catch {
        res.status(500).send("Server error has occured!")
    }
})

app.delete("/stickers-api/drop-all", async (req, res) => {
    try {
        await PersistenceService.dropAll()
        res.status(200).send("Stickers collection has been dropped!")
    } catch {
        res.status(500).send("Server error has occured!")
    }
})

app.put("/stickers-api/delay", (req, res) => {
    try {
        const delay = String(req.query.delay)
        scraper.changeScrapeDelay(delay)
        res.status(200).send("Scraping delay has been changed!")
    } catch {
        res.status(500).send("Server error has occured!")
    }
})