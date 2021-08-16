import { Logger } from "../Const/Logger";
import { ConfigBase } from "./ConfigBase";

/**
 * 预制体数据配置
 */
export class ConstConfig extends ConfigBase {
    
    //常量名称
    id:string;
    //常量值
    value:number;
    //描述
    desc:string;

    public static initData(jsonData: Object){
        super.initData(jsonData);
    }

    public static getDataById(id:any){
        let data = null;
        data = this.configMap.get(`${id}`);
        if(data){
            return data;
        }
        else{
            Logger.err();
            return null;
        }
    }
}