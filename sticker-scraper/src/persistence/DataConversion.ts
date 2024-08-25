import { Sticker, ISticker } from "./data/Sticker.js"
import { StickerDTO } from "./data/StickerDTO.js"

export class DataConversion {
    public static toModel(stickerDto: StickerDTO) {
        return new Sticker({
            code: stickerDto.getCode(),
            name: stickerDto.getName(),
            price: stickerDto.getPrice()
        })
    }

    public static toDto(sticker: ISticker) {
        return new StickerDTO(sticker.code, sticker.name, sticker.price)
    }
}