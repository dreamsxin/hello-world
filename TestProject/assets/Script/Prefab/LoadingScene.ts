/**
 * 主场景的脚本
 */

import { ConstConfig } from "../Config/ConstConfig";
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
        if(Manager.DataManager.checkFinish()){
            let userData = Manager.DataManager.getUserData();
            if(JSON.stringify(userData[Manager.EnumManager.UserDataElement.Wealth]) === "{}"){
                let value = {
                    gold:ConstConfig.getDataById(Manager.EnumManager.ConstConfigID.gold).value,
                    diamond:ConstConfig.getDataById(Manager.EnumManager.ConstConfigID.diamond).value
                }
                Manager.DataManager.setData(Manager.EnumManager.UserDataElement.Wealth,value);
            }
        }
        if(this.Bar.fillRange >= 1 && Manager.DataManager.checkFinish()){
            Manager.ViewManager.hideView(Manager.EnumManager.ViewName.LoadingScene,true);
            Manager.ViewManager.showView(Manager.EnumManager.ViewName.MainScene);
        }
    }
}
