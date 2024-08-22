import { ItemScraper } from "./scraper/ItemScraper.js"
import express from 'express'

const app = express()
const port = 3000
const scraper = new ItemScraper()

app.get("/", (req, res) => {
    res.send("Server running")
})

app.post("/items-api/scraper/start", (req, res) => {
    scraper.startScraping()
    res.send("Scraper started")
})

app.post("/items-api/scraper/stop", (req, res) => {
    scraper.stopScraping()
    res.send("Scraper stopped")
})

app.post("/items-api/scraper/delay", (req, res) => {
    const delay = String(req.query.delay)
    console.log(delay)
    scraper.changeScrapeDelay(delay)
    res.send("Scraping delay changed")
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
    scraper.startScraping()
})