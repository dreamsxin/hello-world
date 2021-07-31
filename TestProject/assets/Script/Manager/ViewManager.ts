import { Logger } from "../Const/Logger";
import BaseView from "../Scene/BaseView";
import Manager from "./Manager";

/**
 * 场景管理者
 */
export default class ViewManager {
    //场景管理者唯一实例
    private static _instance: ViewManager = null;

    private constructor(){}

    /**
     * 将场景管理者制作为单例模式
     */
    public static get instance(): ViewManager {
        if (!this._instance) {
            this._instance = new ViewManager();
        }
        return this._instance;
    }

    //场景中UI的根节点
    UIRoot: cc.Node;
    //当前场景
    private _curView: BaseView = null;

    private _curViewList:Map<string,cc.Node[]> = new Map<string,cc.Node[]>();

    /**
     * 初始化
     */
    init() {
        this.UIRoot = cc.find("Canvas").getChildByName("UIRoot");
    }

    /**
     * 展示视图
     * @param path 要展示视图的路径
     * @param params 展示视图时传的参数
     */
    public showView(path: string,...params) {
        let name = Manager.ResManager.getResourcesName(path);
        let viewNode: cc.Node = this.UIRoot.getChildByName(name);
        if (!viewNode) {
            Manager.ResManager.loadPrefab(path,(err,resource)=>{
                if(Manager.ResManager.hasNode(name)){
                    viewNode = Manager.ResManager.getNode(name);
                }
                else{
                    viewNode = cc.instantiate(resource);
                }
                viewNode.setPosition(cc.Vec2.ZERO);
                viewNode.parent = this.UIRoot;
                let panel = viewNode.getComponent(BaseView);
                if(panel){
                    this._curView = panel;
                    this._curView.init(...params);
                    this._curView.showPanel();
                    this._curViewList.set(viewNode.name,[viewNode]);
                }
            });
        }
        else{
            let panel = viewNode.getComponent(BaseView);
            if(panel){
                this._curView = panel;
                this._curView.init(...params);
                this._curView.showPanel();
                this._curViewList.set(viewNode.name,[viewNode]);
            }
        }
    }

    /**
     * 隐藏视图
     * @param {string} path 要隐藏的视图路径
     * @param {boolean} isDestroy 是否销毁，有些只展示一次，展示结束之后销毁节省资源
     */
    public hideView(path:string,isDestroy:boolean = false){
        let name = Manager.ResManager.getResourcesName(path);
        let viewNode:cc.Node = this._curViewList.get(name)[0];
        if(viewNode){
            this._curViewList.delete(name);
            let panel = viewNode.getComponent(BaseView);
            if(panel){
                panel.hidePanel();
            }
            if(isDestroy){
                viewNode.destroy();
            }
        }
    }
}