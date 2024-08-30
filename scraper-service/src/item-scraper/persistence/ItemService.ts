import { Item } from "./data/Item.js";
import { ItemDTO } from "./data/ItemDTO.js";
import { DataConversion } from "./DataConversion.js";
import * as fs from 'fs';

export class ItemService {
    private static instance: ItemService
    private itemCodes: Array<string>

    private constructor() {
        this.itemCodes = this.parseItemCodesFile()
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new ItemService();
        return this.instance;
    }

    private parseItemCodesFile(): Array<string>{
        try{
            const data = fs.readFileSync('./src/item-scraper/files/item-codes.txt', 'utf8')
            return data.split('|')
        }catch(error){
            console.error(error)
        }
    }

    public async saveUnique(itemDto: ItemDTO) {
        const exists = await Item.exists({id: itemDto.getId()})

        if(exists !== null) {
            return
        }

        const itemModel = DataConversion.toModel(itemDto)
        await itemModel.save()
    }

    public async getAll(): Promise<Array<ItemDTO>> {
        const items = await Item.find({})
        const itemDtos = items.map(item => {
            return DataConversion.toDto(item)
        })

        return itemDtos
    }

    public async dropAll(): Promise<void> {
        await Item.deleteMany({})
    }

    public async getCount(): Promise<number> {
        const items = await this.getAll()
        return items.length
    }

    public getItemCodes(): Array<string> {
        return this.itemCodes
    }

    public getItemCodesCount(): number {
        return this.itemCodes.length
    }
}