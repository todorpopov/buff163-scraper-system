import { Item, IItem } from "./data/Item.js";
import { ItemDTO } from "./data/ItemDTO.js";

export class DataConversion {
    public static toModel(itemDto: ItemDTO) {
        return new Item(itemDto.getJSON())
    }

    public static toDto(item: IItem) {
        return new ItemDTO(item)
    }
}