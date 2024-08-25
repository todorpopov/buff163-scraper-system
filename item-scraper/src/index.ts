import mongoose from "mongoose"
import { ItemScraper } from "./scraper/ItemScraper.js"
import express from 'express'
import { PersistenceService } from "./persistence/PersistenceService.js"

const app = express()
const port = process.env.ITEM_SCRAPER_PORT
const scraper = new ItemScraper()

mongoose.connect('mongodb://mongo:27017/item-scraper', {
    serverSelectionTimeoutMS: 5000
}).then(
    () => {
        console.log("Successfully connected to MongoDB!")
        app.listen(port, () => {
            console.log(`Express.js item server listenning on port ${port}`)
            scraper.startScraping()
        })
    },
    err => {
        console.log(`DB connection error: ${err}`)
    }
)

// use auth middleware
app.use(function(req, res, next) {
    if (req.headers.auth !== process.env.AUTH) {
        return res.status(403).send("No credentials sent!");
    }
    next();
});

// start scraping process route
app.put("/items-api/start", (req, res) => {
    try {
        scraper.startScraping()
        res.status(200).send("Scraping process has started!")
    } catch(err) {
        res.status(500).send(err)
    }
})

// stop scraping process route
app.put("/items-api/stop", (req, res) => {
    try {
        scraper.stopScraping()
        res.status(200).send("Scraping process has stopped!")
    } catch(err) {
        res.status(500).send(err)
    }
})

// get all items route
app.get("/items-api/get/items", async (req, res) => {
    try {
        const items = await PersistenceService.getAll()
        res.status(200).send(items)
    } catch(err) {
        res.status(500).send(err)
    }
})

// get current item count
app.get("/items-api/get/items/count", async (req, res) => {
    try {
        const count = await PersistenceService.getCount()
        res.status(200).send(String(count))
    } catch(err) {
        res.status(500).send(err)
    }
})

// drop all db entries
app.delete("/items-api/drop-all", async (req, res) => {
    try {
        await PersistenceService.dropAll()
        res.status(200).send("All documents in the collection deleted!")
    } catch(err) {
        res.status(500).send(err)
    }
})