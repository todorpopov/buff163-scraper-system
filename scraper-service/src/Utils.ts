export class Utils {
    public static sleepMs(ms: number): Promise<void>{
        return new Promise((resolve) => {
            setTimeout(resolve, ms)
        })
    }

    public static getItemRequestOptions() {
        const headers = new Headers();
        headers.append("accept", "application/json, text/javascript, */*; q=0.01")
        headers.append("accept-language", "bg-BG,bg;q=0.9,en;q=0.8")
        headers.append("sec-ch-ua", "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"")
        headers.append("sec-ch-ua-mobile", "?0")
        headers.append("sec-ch-ua-platform", "\"Windows\"")
        headers.append("sec-fetch-dest", "empty")
        headers.append("sec-fetch-mode", "cors")
        headers.append("sec-fetch-site", "same-origin")
        headers.append("x-requested-with", "XMLHttpRequest")
        
        const requestOptions = {
            headers: headers,
            body: null,
            method: "GET",
        }

        return requestOptions;
    }

    public static getItemURL(itemCode: string){
        return `https://buff.163.com/api/market/goods/sell_order?game=csgo&goods_id=${itemCode}&page_num=1`
    }

    public static getItemOfferURL(userId: string, itemName: string){
        return `https://buff.163.com/shop/${userId}#tab=selling&game=csgo&page_num=1&search=${itemName.replaceAll(' ', '%20')}`
    }

    public static parseItemName(itemName: string){
        if(itemName.includes('StatTrak')){
            return itemName.slice(10)
        }
        return itemName
    }
}