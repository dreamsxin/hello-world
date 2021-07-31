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

    btn_normal:cc.Node;

    init(arg1){
        super.init();
        this.view_order = Manager.EnumManager.ViewType.CONTENT;
    }

    onLoad () {
        this.btn_normal = this.node.getChildByName("btn_normal");
        this.btn_normal.on(cc.Node.EventType.TOUCH_START,this.onClickButton,this);
    }

    start () {
        super.start();
        Logger.log(this.view_order,"MainScene");
        // Manager.NetManager.send("Hello World!");
        Manager.AudioManager.playBGM(EnumManager.instance.AudioPath.bgm);
    }

    onClickButton(){
        Manager.AudioManager.isCanClick();
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
