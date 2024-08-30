import { DataConversion } from "./DataConversion.js";
import { Sticker } from "./data/Sticker.js";
import { StickerDTO } from "./data/StickerDTO.js";
import * as fs from 'fs'

export class StickerService{
    private static instance: StickerService
    private stickerCodes: Array<string>
    private constructor() {
        this.stickerCodes = this.parseStickerCodesFile()
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new StickerService();
        return this.instance;
    }

    private parseStickerCodesFile(): Array<string>{
        let stickerCodes = []
        try {
            const data = fs.readFileSync('./src/sticker-scraper/files/sticker-codes.txt', 'utf8')
            const splitLines = data.split('\n')
            for(let i = 0; i < splitLines.length; i++) {
                const splitLine = splitLines[i].split(';')
                stickerCodes.push(splitLine[0])
            }
        } catch (err) {
            console.log(err);
        }

        return stickerCodes
    }

    public async saveOrUpdate(stickerDto: StickerDTO): Promise<void> {
        const exists = await Sticker.exists({code: stickerDto.getCode()})

        if(exists === null) {
            const stickerModel = DataConversion.toModel(stickerDto)
            await stickerModel.save()
        } else {
            await Sticker.updateOne({_id: exists._id}, stickerDto.getJSON())
        }
    }

    public async findOneByCode(code: string): Promise<StickerDTO> {
        const sticker = await Sticker.findOne({code: code})
        const stickerDto = DataConversion.toDto(sticker)
        return stickerDto
    }

    public async findOneByName(name: string): Promise<StickerDTO> {
        const sticker = await Sticker.findOne({name: name})
        const stickerDto = DataConversion.toDto(sticker)
        return stickerDto
    }

    public async getAll(): Promise<Array<StickerDTO>> {
        const stickers = await Sticker.find({})
        const stickerDtos = stickers.map(sticker => {
            return DataConversion.toDto(sticker)
        })

        return stickerDtos
    }

    public async dropAll(): Promise<void> {
        await Sticker.deleteMany({})
    }

    public async getCount(): Promise<number> {
        const stickers = await this.getAll()
        return stickers.length
    }

    public getStickerCodes(): Array<string> {
        return this.stickerCodes
    }

    public getStickerCodesCount(): number {
        return this.stickerCodes.length
    }

    public async getPercentageScraped(): Promise<string> {
        const totalItems = this.getStickerCodesCount()
        const currentlyScraped = await this.getCount()
        const percentage = (currentlyScraped / totalItems) * 100
        return percentage.toFixed(2)
    }
}