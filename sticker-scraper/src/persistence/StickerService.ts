import { DataConversion } from "./DataConversion.js";
import { Sticker } from "./data/Sticker.js";
import { StickerDTO } from "./data/StickerDTO.js";

export class StickerService{
    private static instance: StickerService

    private constructor() {}

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new StickerService();
        return this.instance;
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
}