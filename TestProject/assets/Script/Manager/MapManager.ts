/**
 * 地图管理者
 */

import Maps from "../Module/Map/Maps";
import Manager from "./Manager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MapManager {

    //地图管理者唯一实例
    private static _instance: MapManager = null;

    private constructor(){}

    /**
     * 将地图管理者制作为单例模式
     */
    public static get instance(): MapManager {
        if (!this._instance) {
            this._instance = new MapManager();
        }
        return this._instance;
    }

    /**
     * 地图初始化
     */
    public init(parent:cc.Node){
        Manager.ResManager.loadPrefab(Manager.EnumManager.ResourceDir.Maps + "map1",(err,prefab:cc.Prefab)=>{
            if(err){
                console.error(">>>加载地图出错！----MapManager.ts")
                return;
            }
            let map = cc.instantiate(prefab);
            map.parent = parent;
            map.setPosition(-800,-800);
            map.getComponent(Maps).init();
        });
    }
    
}
