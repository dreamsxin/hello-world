/**
 * 主场景的脚本
 */
import EnumManager from "../Const/EnumManager";
import { Logger } from "../Const/Logger";
import Manager from "../Manager/Manager";
import BaseView from "../Scene/BaseView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends BaseView {

    init(arg1){
        super.init();
        this.view_order = Manager.EnumManager.ViewType.CONTENT;
    }

    onLoad () {
    }

    start () {
        super.start();
        Logger.log(this.view_order,"MainScene");
        Manager.AudioManager.playBGM(EnumManager.instance.AudioPath.bgm);
    }

    onClickButton(){
        Manager.AudioManager.isCanClick();
        Manager.ViewManager.showView(Manager.EnumManager.ViewName.LayerSettingNotify);
    }

    setEventListener(){

    }

    removeEventListener(){

    }

    onDisable(){
        super.onDisable();
    }


    update (dt) {}
}
