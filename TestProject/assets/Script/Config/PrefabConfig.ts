import { ConfigBase } from "./ConfigBase";

/**
 * 预制体数据配置
 */
export class PrefabConfig extends ConfigBase {

    //预制体路径
    path:string;
    //是否实例化
    instantiation:number;
    //实例化数量
    count:number;
    //描述
    des:string;

    public static initData(jsonData: Object){
        super.initData(jsonData);
        for (const key in jsonData) {
            if (Object.prototype.hasOwnProperty.call(jsonData, key)) {
                const element = jsonData[key];
                console.log(element)
            }
        }
    }
}