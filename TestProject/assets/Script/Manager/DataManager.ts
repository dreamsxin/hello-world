/**
 * 数据管理者
 */

import { PrefabConfig } from "../Config/PrefabConfig";
import { Logger } from "../Const/Logger";
import Manager from "./Manager";

export class DataManager {

    //存储玩家数据到本地
    private _userData = {

    }

    //是否有新的数据
    private _isNewData:boolean = false;

    /**数据管理者的唯一实例 */
    private static _instance:DataManager = null;
    //数据管理者设置为单例模式
    public static get instance():DataManager{
        if(!this._instance){
            this._instance = new DataManager();
        }
        return this._instance;
    }

    //背景音乐是否开启
    public bIsOpenMusic:boolean = true;
    //音效是否开启
    public bIsOpenSound:boolean = true;

    //初始化
    public init(){
        this.readUserData();
        this.initConfig();
    }

    /**
     * 读取玩家数据
     */
    private readUserData(){
        let stringData = cc.sys.localStorage.getItem("userData");
        if(stringData){
            let jsonData = JSON.parse(stringData);
            for (const key in jsonData) {
                if (Object.prototype.hasOwnProperty.call(jsonData, key)) {
                    this._userData[key] = jsonData[key];
                }
            }
        }
        //每隔一段时间，如果有新的数据进来，保存一下
        setInterval(()=>{
            if(this._isNewData){
                this.saveDta();
            }
        },10000);
    }

    /**
     * 读取配置文件
     */
    private initConfig(){
        this.loadConfig(Manager.EnumManager.JsonDataName.PrefabData);
    }

    /**
     * 读取配置文件的数据
     */
    private loadConfig(configName:string){
        cc.loader.loadRes(Manager.EnumManager.ResourceDir.Json + configName,cc.JsonAsset,(err,object)=>{
            if(err){
                Logger.err(`读取${configName}失败`);
            }
            else{
                switch (configName) {
                    case Manager.EnumManager.JsonDataName.PrefabData:
                        PrefabConfig.initData(object.json)
                        break;
                
                    default:
                        break;
                }
            }
        });
    }

    /**
     * 返回玩家数据
     * @returns _userData 返回玩家数据
     */
    public getUserData():any{
        return this._userData;
    }

    /**
     * 保存数据
     * @param name 数据名字
     * @param value 要保存的数据
     */
    public setData(name:string,value:any){
        if(typeof this._userData[name] === typeof value && this._userData[name] !== value){
            this._userData[name] = value;
            this._isNewData = true;
            this.saveDta();
        }
    }

    /**
     * 保存数据
     */
    private saveDta(){
        this._isNewData = false;
        let stringData = JSON.stringify(this._userData);
        cc.sys.localStorage.setItem("userData",stringData);
    }
}