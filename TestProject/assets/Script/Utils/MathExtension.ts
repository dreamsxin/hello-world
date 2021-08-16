interface Math {
    /**  include min, exclude max 返回 min<= number < max  */
    randomRangeInt(min: number, max: number): number;

    randomRangeFloat(min: number, max: number): number;

    fmod(x: number, y: number): number;

    ChineseNumber: (num: number) => string;

    /** 归一化数值
     * @param num 数值
     *  @param digits 保留小数点
    */
    norMalizedValue(num, digits?);
}
Math.randomRangeInt = function (min: number, max: number): number {
    let rand = Math.random();
    if (rand === 1) {
        rand -= Number.EPSILON;
    }
    return min + Math.floor(rand * (max - min));
}
Math.randomRangeFloat = function (min: number, max: number): number {
    return min + (Math.random() * (max - min));
}

Math.fmod = function (x: number, y: number): number {
    let temp = Math.floor(x / y);
    return x - temp * y;
}

/** 返回大写数字 */
Math.ChineseNumber = function (num: number) {
    /** 大写的数字 */
    let chineseNumber = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]
    return chineseNumber[num];
}

// 归一化数值
Math.norMalizedValue = function (num, digits = 2) {
    num = Number(num);
    const si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "m" },
        { value: 1E9, symbol: "b" },
        { value: 1E11, symbol: "t" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}
