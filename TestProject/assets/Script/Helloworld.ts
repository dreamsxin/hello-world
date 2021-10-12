import Manager from "./Manager/Manager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {


    onLoad(){
        Manager.ViewManager.init();
        Manager.DataManager.init();
        let manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.debugDrawFlags = 1;
        manager.gravity = cc.v2(0,0);
        Manager.MapManager.init(this.node.getChildByName("MapManager"));
    }

    start () {
        Manager.ViewManager.showView(Manager.EnumManager.ViewName.LoadingScene);
    }

}
