/**
 * 主场景的脚本
 */
import EnumManager from "../Const/EnumManager";
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
        Manager.AudioManager.playBGM(EnumManager.instance.AudioPath.bgm);
    }

    onClickButton(event,custonEventData){
        Manager.AudioManager.isCanClick();
        switch (custonEventData) {
            case "AddGold":
                Manager.GameCtrl.addGold(1050);
                break;
            case "ReduceGold":
                Manager.GameCtrl.reduceGold(150);
                break;
            default:
                break;
        }
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
