import EnumManager from "../Const/EnumManager";
import AudioManager from "./AudioManager";
import { DataManager } from "./DataManager";
import EventManager from "./EventManager";
import NetManager from "./NetManager";
import ResManager from "./ResManager";
import ViewManager from "./ViewManager";

/**
 * 总的管理者，管理其他的管理者
 */
export default class Manager {
    //事件管理者唯一实例
    private static _instance:Manager = null;

    /**
     * 构造函数
     */
    private constructor(){}

    /**将事件管理者设置为单例模式 
     * @returns {EventManager} 返回事件监听唯一实例
    */
     public static getInstance():Manager{
        if(!this._instance){
            this._instance = new Manager();
        }
        return this._instance;
    }

    /**事件管理者 */
    public static EventManager:EventManager = EventManager.instance;
    /**资源管理者 */
    public static ResManager:ResManager = ResManager.instance;
    /**视图（场景）管理者 */
    public static ViewManager:ViewManager = ViewManager.instance;
    /**将一些枚举统一放置到一个类中 */
    public static EnumManager:EnumManager = EnumManager.instance;
    /**数据管理者 */
    public static DataManager:DataManager = DataManager.instance;
    /**网络管理者 */
    public static NetManager:NetManager = NetManager.instance;
    /**音效管理者 */
    public static AudioManager:AudioManager = AudioManager.instance;
}