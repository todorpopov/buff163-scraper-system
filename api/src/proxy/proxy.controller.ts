import { Controller, Delete, Get, Put, Res, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('proxy')
export class ProxyController {
    private stickerScraperURL = `http://localhost:${process.env.STICKER_SCRAPER_PORT}`
    private itemScraperURL = `http://localhost:${process.env.ITEM_SCRAPER_PORT}`


    // Sticker Scraper Service
    @Put('/stickers/start')
    @UseGuards(AuthGuard, AdminGuard)
    startStickerScraping(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers/start')
    }

    @Put('/stickers/stop')
    @UseGuards(AuthGuard, AdminGuard)
    stopStickerScraping(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers/stop')
    }

    @Get('/stickers/get/all')
    @UseGuards(AuthGuard)
    getStickers(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers/get/all')
    }

    @Get('/stickers/get/delay')
    @UseGuards(AuthGuard, AdminGuard)
    getCurrentDelay(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers/get/delay')
    }

    @Get('/stickers/get/status')
    @UseGuards(AuthGuard)
    getCurrentScrapingStatus(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers/get/status')
    }

    @Get('/stickers/get/count')
    @UseGuards(AuthGuard)
    getStickersCount(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers/get/count')
    }

    @Get('/stickers/get/codes/count')
    @UseGuards(AuthGuard)
    getStickersCodesCount(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers/get/codes/count')
    }

    @Get('/stickers/get/percentage')
    @UseGuards(AuthGuard, AdminGuard)
    getPercentageScraped(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers/get/percentage')
    }

    @Delete('/stickers/delete/all')
    @UseGuards(AuthGuard, AdminGuard)
    deleteAllStickers(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers/delete/all')
    }

    @Put('/stickers/change/delay')
    @UseGuards(AuthGuard, AdminGuard)
    changeDelay(@Res() res) {
        return res.redirect(this.stickerScraperURL + '/stickers/change/delay')
    }


    // Item Scraper Service
    @Put('/items/start')
    @UseGuards(AuthGuard, AdminGuard)
    startItemScraping(@Res() res) {
        return res.redirect(this.itemScraperURL + '/items/start')
    }

    @Put('/items/stop')
    @UseGuards(AuthGuard, AdminGuard)
    stopItemScraping(@Res() res) {
        return res.redirect(this.itemScraperURL + '/items/stop')
    }

    @Get('/items/get/all')
    @UseGuards(AuthGuard)
    getItems(@Res() res) {
        return res.redirect(this.itemScraperURL + '/items/get/all')
    }

    @Get('/items/get/count')
    @UseGuards(AuthGuard)
    getItemsCount(@Res() res) {
        return res.redirect(this.itemScraperURL + '/items/get/count')
    }

    @Get('/items/get/codes/count')
    @UseGuards(AuthGuard)
    getItemCodesCount(@Res() res) {
        return res.redirect(this.itemScraperURL + '/items/get/codes/count')
    }

    @Delete('/items/delete/all')
    @UseGuards(AuthGuard, AdminGuard)
    deleteAllItems(@Res() res) {
        return res.redirect(this.itemScraperURL + '/items/delete/all')
    }
}