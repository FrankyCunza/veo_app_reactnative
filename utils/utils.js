export function dateYYYYMMDD(btc, btcRate) {
    let date = new Date()
    const newDate = date.getFullYear() + '-' + ((date.getMonth()+1) < 10 ? `${'0'+(date.getMonth()+1)}` : date.getMonth()) + '-' + ((date.getDate()+1) < 10 ? `${'0'+(date.getDate())}` : date.getDate())
    return newDate;
}

export function HHMMSS() {
    let date = new Date()
    let hour = ("0" + date.getHours()).slice(-2) + ':' +  ("0" + date.getMinutes()).slice(-2) + ':' + ("0" + date.getSeconds()).slice(-2)
    return hour;
}