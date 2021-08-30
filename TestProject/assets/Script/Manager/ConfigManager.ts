import { ConstConfig } from "../Config/ConstConfig";
import { Logger } from "../Const/Logger";
import Manager from "./Manager";

export default class ConfigManager {
    //事件管理者唯一实例
    private static _instance:ConfigManager = null;

    /**
     * 构造函数
     */
    private constructor(){}

    /**将配置管理者设置为单例模式 
     * @returns {ConfigManager} 返回配置管理唯一实例
    */
     public static get instance():ConfigManager{
        if(!this._instance){
            this._instance = new ConfigManager();
        }
        return this._instance;
    }

    //是否加载完成
    private _isLoadFinish:boolean = false;
    private loadConfigNameList:Map<string,boolean> = new Map();

    //配置类型文件
    public Config = {
        ConstConfig:ConstConfig,
    }

    /**
     * 读取配置文件的数据
     */
    public loadConfig(configName:string){
        cc.loader.loadRes(Manager.EnumManager.ResourceDir.Json + configName,cc.JsonAsset,(err,object)=>{
            if(err){
                Logger.err(`读取${configName}失败`);
                return;
            }
            else{
                switch (configName) {
                    case Manager.EnumManager.JsonDataName.ConstConfig:
                        this.Config.ConstConfig.initData(object.json);
                        break;
                }
                this.loadConfigNameList.set(configName,true);
                this._isLoadFinish = this.checkFinish();
                if(this._isLoadFinish){
                    Logger.log("JSON加载完成---------"+`${this._isLoadFinish}`);
                }
            }
        });
    }

    /**
     * 
     * @returns 检查是否读取完成
     */
    checkFinish():boolean{
        this.loadConfigNameList.forEach((value,key)=>{
            if(value == false){
                return false;
            }
        });
        return true;
    }
}