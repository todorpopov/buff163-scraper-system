import { GlobalConfig } from "./GlobalConfig.js"

const globalConfig = GlobalConfig.getInstance()
const app = globalConfig.getApp()

const stickerService = globalConfig.getStickerService()
const scraper = globalConfig.getStickerScraper()

// use auth middleware
app.use(function(req, res, next) {
    if (req.headers.auth !== process.env.AUTH) {
        return res.status(403).send("No credentials sent!");
    }
    next();
});

// start scraping process route
app.put("/stickers-api/start", (req, res) => {
    try {
        scraper.startScraping()
        res.status(200).send("Scraping process has started!")
    } catch(err) {
        res.status(500).send(err)
    }
})

// stop scraping process route
app.put("/stickers-api/stop", (req, res) => {
    try {
        scraper.stopScraping()
        res.status(200).send("Scraping process has ended!")
    } catch(err) {
        res.status(500).send(err)
    }
})

// get all stickers route
app.get("/stickers-api/get/stickers", async (req, res) => {
    try {
        const stickers = await stickerService.getAll()
        res.status(200).send(stickers)
    } catch(err) {
        res.status(500).send(err)
    }
})

// get sticker by sticker code
app.get("/stickers-api/get/sticker/code/:code", async (req, res) => {
    try {
        const code = String(req.params.code)
        const sticker = await stickerService.findOneByCode(code)
        res.status(200).send(sticker)
    } catch(err) {
        res.status(500).send(err)
    }
})

// get sticker by sticker name
app.get("/stickers-api/get/sticker/name/:name", async (req, res) => {
    try {
        const name = String(req.params.name)
        const sticker = await stickerService.findOneByName(name)
        res.status(200).send(sticker)
    } catch(err) {
        res.status(500).send(err)
    }
})

// get current scraper delay state
app.get("/stickers-api/get/current/delay", (req, res) => {
    try {
        const delay = scraper.getCurrentDelay()
        res.status(200).send(String(delay))
    } catch(err) {
        res.status(500).send(err)
    }
})

// get current scraping status state
app.get("/stickers-api/get/current/scraping-status", (req, res) => {
    try {
        const currentStatus = scraper.getCurrentScrapeStatus()
        res.status(200).send(currentStatus)
    } catch(err) {
        res.status(500).send(err)
    }
})

// get current sticker count
app.get("/stickers-api/get/stickers/count", async (req, res) => {
    try {
        const stickerCodesCount = scraper.getStickerCodesCount()
        const count = await stickerService.getCount()
        const response = `Saved: ${count} | Total: ${stickerCodesCount}`
        res.status(200).send(response)
    } catch(err) {
        res.status(500).send(err)
    }
})

// get percentage of scraped stickers
app.get("/stickers-api/get/percentage/scraped", async (req, res) => {
    try {
        const response = await scraper.getPercentageScraped()
        res.status(200).send(response)
    } catch(err) {
        res.status(500).send(err)
    }
})

// delete all documents
app.delete("/stickers-api/delete", async (req, res) => {
    try {
        await stickerService.dropAll()
        res.status(200).send("All documents in the collection deleted!")
    } catch(err) {
        res.status(500).send(err)
    }
})

// change the scraper delay
app.put("/stickers-api/delay", (req, res) => {
    try {
        const delay = String(req.query.delay)
        scraper.changeScrapeDelay(delay)
        res.status(200).send(`Scraping delay has been changed to ${delay}!`)
    } catch(err) {
        res.status(500).send(err)
    }
})