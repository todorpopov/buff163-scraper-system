import { GlobalConfig } from "./GlobalConfig.js"
import { ItemRouterConfig } from "./item-scraper/ItemRouterConfig.js"
import { StickerRouterConfig } from "./sticker-scraper/StickerRouterConfig.js"

const globalConfig = GlobalConfig.getInstance()
const app = globalConfig.getApp()

const stickerService = globalConfig.getStickerService()
const stickerScraper = globalConfig.getStickerScraper()

const itemService = globalConfig.getItemService()
const itemScraper = globalConfig.getItemScraper()

const stickerRouterConfig = StickerRouterConfig.getInstance(stickerScraper, stickerService)
const itemRouterConfig = ItemRouterConfig.getInstance(itemScraper, itemService)

app.use(function(req, res, next) {
    if (req.headers.auth !== process.env.AUTH) {
        return res.status(403).send({msg: "No credentials sent!"});
    }
    next();
});

app.use('/stickers', stickerRouterConfig.getRouter())
app.use('/items', itemRouterConfig.getRouter())
