import { DataConversion } from "./DataConversion.js";
import { Sticker, ISticker } from "./Sticker.js";
import { StickerDTO } from "./StickerDTO.js";

export class PersistenceService{
    public static async saveOrUpdate(stickerDto: StickerDTO): Promise<void> {
        const exists = await Sticker.exists({code: stickerDto.getCode()})

        if(exists === null) {
            const stickerModel = DataConversion.toModel(stickerDto)
            await stickerModel.save()
        } else {
            await Sticker.updateOne({_id: exists._id}, stickerDto.getJSON())
        }
    }

    public static async findOneByCode(code: string): Promise<StickerDTO> {
        const sticker = await Sticker.findOne({code: code})
        const stickerDto = DataConversion.toDto(sticker)
        return stickerDto
    }

    public static async findOneByName(name: string): Promise<StickerDTO> {
        const sticker = await Sticker.findOne({name: name})
        const stickerDto = DataConversion.toDto(sticker)
        return stickerDto
    }

    public static async getAll(): Promise<Array<StickerDTO>> {
        const stickers = await Sticker.find({})
        const stickerDtos = stickers.map(sticker => {
            return DataConversion.toDto(sticker)
        })

        return stickerDtos
    }

    public static async dropAll(): Promise<void> {
        await Sticker.deleteMany({})
    }
}