import { Controller, Delete, Get, Put, Res, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('proxy')
export class ProxyController {
    private stickerScraperURL = `http://localhost:${process.env.STICKER_SCRAPER_PORT}`
    private itemScraperURL = `http://localhost:${process.env.ITEM_SCRAPER_PORT}`


    // Sticker Scraper Service
    @Put('/stickers-api/start')
    @UseGuards(AuthGuard, AdminGuard)
    startStickerScraping(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers-api/start')
    }

    @Put('/stickers-api/stop')
    @UseGuards(AuthGuard, AdminGuard)
    stopStickerScraping(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers-api/stop')
    }

    @Get('/stickers-api/get/stickers')
    @UseGuards(AuthGuard)
    getStickers(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers-api/get/stickers')
    }

    @Get('/stickers-api/get/current/delay')
    @UseGuards(AuthGuard, AdminGuard)
    getCurrentDelay(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers-api/get/current/delay')
    }

    @Get('/stickers-api/get/current/scraping-status')
    @UseGuards(AuthGuard)
    getCurrentScrapingStatus(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers-api/get/current/scraping-status')
    }

    @Get('/stickers-api/get/stickers/count')
    @UseGuards(AuthGuard)
    getStickersCount(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers-api/get/stickers/count')
    }

    @Get('/stickers-api/get/percentage/scraped')
    @UseGuards(AuthGuard, AdminGuard)
    getPercentageScraped(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers-api/get/percentage/scraped')
    }

    @Delete('/stickers-api/delete')
    @UseGuards(AuthGuard, AdminGuard)
    deleteAllStickers(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers-api/delete')
    }

    @Put('/stickers-api/delay')
    @UseGuards(AuthGuard, AdminGuard)
    changeDelay(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers-api/delay')
    }


    // Item Scraper Service
    @Put('/items-api/start')
    @UseGuards(AuthGuard, AdminGuard)
    startItemScraping(@Res() res) {
        return res.redirect(this.itemScraperURL + '/items-api/start')
    }

    @Put('/items-api/stop')
    @UseGuards(AuthGuard, AdminGuard)
    stopItemScraping(@Res() res) {
        return res.redirect(this.itemScraperURL + '/items-api/stop')
    }

    @Get('/items-api/get/items')
    @UseGuards(AuthGuard)
    getItems(@Res() res) {
        return res.redirect(this.itemScraperURL + '/items-api/get/items')
    }

    @Get('/items-api/get/items/count')
    @UseGuards(AuthGuard)
    getItemsCount(@Res() res) {
        return res.redirect(this.itemScraperURL + '/items-api/get/items/count')
    }

    @Delete('/items-api/delete')
    @UseGuards(AuthGuard, AdminGuard)
    deleteAllItems(@Res() res) {
        return res.redirect(this.itemScraperURL + '/items-api/delete')
    }
}