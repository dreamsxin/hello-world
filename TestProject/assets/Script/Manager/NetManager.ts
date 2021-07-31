import NetWork from "../Module/NetWork";

export default class NetManager {

    /**
     * 网络管理者唯一实例
     */
    private static _instance:NetManager = null;
    public static get instance():NetManager{
        if(!this._instance){
            this._instance = new NetManager();
        }
        return this._instance;
    }

    private _network:NetWork = null;

    constructor(){
        this._network = new NetWork();
    }

    //连接服务器
    public connectServer(){
        this._network.connect("ws://echo.websocket.org");
    }

    //发送数据给服务器
    public send(data:any){
        this._network.send(data);
    }

}
