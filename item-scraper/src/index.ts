import { GlobalConfig } from "./GlobalConfig.js"

const globalConfig = GlobalConfig.getInstance()
const app = globalConfig.getApp()

const itemService = globalConfig.getItemService()
const itemScraper = globalConfig.getItemScraper()

// use auth middleware
app.use(function(req, res, next) {
    if (req.headers.auth !== process.env.AUTH) {
        return res.status(403).send({msg: "No credentials sent!"});
    }
    next();
});

// start scraping process route
app.put("/items-api/start", (req, res) => {
    try {
        itemScraper.startScraping()
        res.status(200).send()
    } catch(err) {
        res.status(500).send(err)
    }
})

// stop scraping process
app.put("/items-api/stop", (req, res) => {
    try {
        itemScraper.stopScraping()
        res.status(200).send()
    } catch(err) {
        res.status(500).send(err)
    }
})

// get all items
app.get("/items-api/get/items", async (req, res) => {
    try {
        const items = await itemService.getAll()
        res.status(200).send(items)
    } catch(err) {
        res.status(500).send(err)
    }
})

// get current item count
app.get("/items-api/get/items/count", async (req, res) => {
    try {
        const count = await itemService.getCount()
        res.status(200).send(String(count))
    } catch(err) {
        res.status(500).send(err)
    }
})

// delete all documents
app.delete("/items-api/delete", async (req, res) => {
    try {
        await itemService.dropAll()
        res.status(200).send()
    } catch(err) {
        res.status(500).send(err)
    }
})