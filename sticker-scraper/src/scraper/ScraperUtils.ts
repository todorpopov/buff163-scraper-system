import * as fs from 'fs'

export class ScraperUtils {
    public static parseStickerCodesFile(): Array<string>{
        const fileContent = []
        try {
            const data = fs.readFileSync('./src/files/sticker-codes.txt', 'utf8')
            const splitLines = data.split('\n')
            for(let i = 0; i < splitLines.length; i++) {
                const splitLine = splitLines[i].split(';')
                fileContent.push(splitLine[0])
            }
        } catch (err) {
            console.error(err);
        }
        return fileContent
    }

    public static sleepMs(ms: number): Promise<void>{
        return new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
    }
}