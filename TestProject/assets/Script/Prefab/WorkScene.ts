/**
 * 主场景的脚本
 */

import Logger from "../Manager/Logger";
import Manager from "../Manager/Manager";
import BaseView from "../Scene/BaseView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WorkScene extends BaseView {

    init(){
        this.view_order = Manager.EnumManager.ViewType.CONTENT;
    }

    onLoad () {
        super.onLoad();
    }

    start () {
        super.start();
        Logger.debug("WorkScene开始","WorkScene");
    }

    update (dt) {}
}
