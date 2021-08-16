/**
 * @classdesc 金币和钻石的视图更新
 */

import Manager from "../../Manager/Manager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LayoutCoinAndDiamond extends cc.Component {

    CoinLabel:cc.Node;
    DiamonLabel:cc.Node;

    onLoad () {
        this.CoinLabel = this.node.getChildByName("LayoutCoin").getChildByName("CoinLabel");
        this.DiamonLabel = this.node.getChildByName("LayoutDiamond").getChildByName("DiamonLabel");
        Manager.EventManager.on(Manager.EnumManager.EventName.UpdateCoinAndDiamondView,this.updateWealth,this);
    }

    start () {
        this.updateWealth();
    }

    updateWealth(){
        let gold = Manager.GameCtrl.getGold();
        gold = Math.norMalizedValue(gold);
        let diamond = Manager.GameCtrl.getDiamond();
        diamond = Math.norMalizedValue(diamond);
        this.CoinLabel.getComponent(cc.Label).string = String(gold);
        this.DiamonLabel.getComponent(cc.Label).string = String(diamond);
    }

    // update (dt) {}
}
