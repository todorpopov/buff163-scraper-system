import mongoose from "mongoose";
import { Item } from "./data/Item.js";
import { ItemDTO } from "./data/ItemDTO.js";
import { DataConversion } from "./DataConversion.js";

export class PersistenceService {
    public static async saveUnique(itemDto: ItemDTO) {
        const exists = await Item.exists({id: itemDto.getId()})

        if(exists !== null) {
            return
        }

        const itemModel = DataConversion.toModel(itemDto)
        await itemModel.save()
    }

    public static async getAll(): Promise<Array<ItemDTO>> {
        const items = await Item.find({})
        const itemDtos = items.map(item => {
            return DataConversion.toDto(item)
        })

        return itemDtos
    }

    public static async dropAll(): Promise<void> {
        await Item.deleteMany({})
    }

    public static async getCount(): Promise<number> {
        const items = await this.getAll()
        return items.length
    }
}