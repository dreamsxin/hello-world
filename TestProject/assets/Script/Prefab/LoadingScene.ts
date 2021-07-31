/**
 * 主场景的脚本
 */

import { Logger } from "../Const/Logger";
import Manager from "../Manager/Manager";
import BaseView from "../Scene/BaseView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadingScene extends BaseView {

    Bar:cc.Sprite;

    init(){
        this.view_order = Manager.EnumManager.ViewType.CONTENT;
    }
    
    onLoad () {
        super.onLoad();
        this.Bar = this.GetChild("cocos/Progress/Bar").getComponent(cc.Sprite);
    }

    start () {
        super.start();
    }

    update (dt) {
        this.Bar.fillRange += dt;
        if(this.Bar.fillRange >= 1){
            Manager.ViewManager.hideView(Manager.EnumManager.ViewName.LoadingScene,true);
            Manager.ViewManager.showView(Manager.EnumManager.ViewName.MainScene);
        }
    }
}
