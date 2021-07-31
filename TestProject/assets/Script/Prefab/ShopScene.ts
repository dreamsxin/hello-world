import Logger from "../Manager/Logger";
import Manager from "../Manager/Manager";
import BaseView from "../Scene/BaseView";

/**
 * 主场景的脚本
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopScene extends BaseView {

    init(){
        this.view_order = Manager.EnumManager.ViewType.CONTENT;
    }

    onLoad () {
        super.onLoad();
    }

    start () {
        super.start();
        Logger.debug("ShopScene开始","ShopScene");
    }

    update (dt) {}
}
