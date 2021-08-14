
interface Date {
    /*
    月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    */
    Format: (fmt: any) => any;

    /** 返回12小时制 下午 6:12 */
    GetTimeByPeriod(second: number): any;
    /** 获取当前秒级时间戳 */
    GetTime(): any;
    /** 秒转时分秒 数字时间显示*/
    SecondsFormatHours(second: number): any;
    /** 秒转日时分秒 数字时间显示*/
    SecondsFormatDayHourMinuteNumber(second: number): any;
    /** 秒转日时分秒 中文时间显示*/
    SecondsFormatDayHourMinuteText(second: number): any;
    /** 时间戳转化成时间格式 */
    TimeFormat(timestamp: number): any;
    /**一定的秒数转化成分秒格式（数字格式） */
    SecondsFormatMinutes(second: number): any;
    /**秒转几天前几小时前几分前(自己按照需要添加的) */
    SecondsFormatDayHourMinuteBrfore(second: number): any;
}

/**
* 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
* @param fmt 时间格式
* @param second 秒
*/
Date.prototype.Format = function (fmt, second = 1) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds() + second, //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 *返回12小时制 下午 6:12 
 *@param 秒
*/
Date.prototype.GetTimeByPeriod = function (second: number = 1) {
    return new Date().Format("HH:mm");
}

/**
 * 时间戳转化成时间格式
 * @param 时间戳
 */
Date.prototype.TimeFormat = function (timestamp) {
    return new Date(timestamp).Format("HH:mm");
}

//时间戳转化成秒
Date.prototype.GetTime = function () {
    let time = Date.now() / 1000;
    let second = Math.floor(time);
    return second;
}

/**
 * 一定的秒数转化成时分秒格式
 * @param 秒
 */
Date.prototype.SecondsFormatHours = function (s) {
    s = Math.abs(Math.floor(s));
    let day = 0;
    let hour: any = Math.floor((s - day * 24 * 3600) / 3600);
    let minute: any = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
    let second: any = s - day * 24 * 3600 - hour * 3600 - minute * 60;

    hour = hour > 9 ? hour : "0" + hour;
    minute = minute > 9 ? minute : "0" + minute;
    second = second > 9 ? second : "0" + second;
    if (s > 0)
        return hour + ":" + minute + ":" + second + "";
    else
        return `00:00:00`;
}

/**
 * 一定的秒数转化成分秒格式（数字）
 * @param 秒
 */
Date.prototype.SecondsFormatMinutes = function (s) {
    s = Math.abs(Math.floor(s));
    let hour = 0;
    let minute: any = Math.floor((s - hour * 3600) / 60);
    let second: any = s - hour * 3600 - minute * 60;
    minute = minute > 9 ? minute : "0" + minute;
    second = second > 9 ? second : "0" + second;
    if (s > 0) {
        return minute + ":" + second;
    }
    else {
        return `00:00`;
    }
}

/**
 * 一定的秒数转化成月天时分秒格式（数字）
 * @param 秒
 */
Date.prototype.SecondsFormatDayHourMinuteNumber = function (s) {
    s = Math.abs(Math.floor(s));
    let month = Math.floor(s / (24 * 3600 * 30)); // Math.floor()向下取整

    let reduce = month * (24 * 3600 * 30);
    let day = Math.floor((s - reduce) / (24 * 3600)); // Math.floor()向下取整
    reduce += day * (24 * 3600);
    let hour: any = Math.floor((s - reduce) / 3600);
    reduce += hour * 3600;
    let minute: any = Math.floor((s - reduce) / 60);
    reduce += minute * 60;
    let second: any = s - reduce;

    hour = hour > 9 ? hour : "0" + hour;
    minute = minute > 9 ? minute : "0" + minute;
    second = second > 9 ? second : "0" + second;
    let desc = "";
    desc += month > 0 ? `${month}:` : ``;
    desc += day > 0 ? `${day}:` : ``;
    desc += `${hour}:`;
    desc += `${minute}:`;
    desc += `${second}:`;

    if (s > 0)
        return desc;
    else
        return `00:00:00`;
}

/**
 * 一定的秒数转化成月天时分秒格式（文字）
 * @param 秒
 */
Date.prototype.SecondsFormatDayHourMinuteText = function (s) {
    s = Math.abs(Math.floor(s));
    let month = Math.floor(s / (24 * 3600 * 30)); // Math.floor()向下取整

    let reduce = month * (24 * 3600 * 30);
    let day = Math.floor((s - reduce) / (24 * 3600)); // Math.floor()向下取整
    reduce += day * (24 * 3600);
    let hour: any = Math.floor((s - reduce) / 3600);
    reduce += hour * 3600;
    let minute: any = Math.floor((s - reduce) / 60);
    reduce += minute * 60;
    let second: any = s - reduce;

    hour = hour > 9 ? hour : "" + hour;
    minute = minute > 9 ? minute : "" + minute;
    second = second > 9 ? second : "" + second;
    let desc = "";
    desc += month > 0 ? `${month}月` : ``;
    desc += day > 0 ? `${day}天` : ``;
    desc += `${hour}时`;
    desc += `${minute}分`;
    desc += `${second}秒`;

    if (s > 0)
        return desc;
    else
        return ``;
}

/**
 * 一定的秒数秒转几天前几小时前几分前（文字）
 * @param 秒
 */
Date.prototype.SecondsFormatDayHourMinuteBrfore = function (s) {
    s = Math.abs(Math.floor(s));
    let day = Math.floor(s / (24 * 60 * 60));
    let reduce = day * 24 * 60 * 60;
    let hour = Math.floor((s - reduce) / (60 * 60));
    reduce += hour * 60 * 60;
    let minute = Math.floor((s - reduce) / 60);
    if (day > 0) {
        return day + "天前";
    }
    else if (hour > 0) {
        return hour + "小时前";
    }
    else if (minute > 0) {
        return minute + "分钟前";
    }
    else {
        return "刚刚";
    }
}

