import { Logger } from "../Const/Logger";
import Manager from "./Manager";

/**
 * @classdesc 游戏逻辑控制
 */
export default class GameCtrl {
    /**数据管理者的唯一实例 */
    private static _instance:GameCtrl = null;
    //数据管理者设置为单例模式
    public static get instance():GameCtrl{
        if(!this._instance){
            this._instance = new GameCtrl();
        }
        return this._instance;
    }
    

    //获取当前游戏中的金币数量
    public getGold(){
        let userData = Manager.DataManager.getUserData();
        let gold = userData[Manager.EnumManager.UserDataElement.Wealth].gold;
        return gold;
    }

    //获取当前游戏中的钻石数量
    public getDiamond(){
        let userData = Manager.DataManager.getUserData();
        let diamond = userData[Manager.EnumManager.UserDataElement.Wealth].diamond;
        return diamond;
    }

    /**
     * 增加金币
     * @param goldNum 增加的金币数量
     */
    public addGold(goldNum:number){
        if(goldNum < 0){
            Logger.err("金币添加数量小于0"+goldNum);
            return;
        }
        let userData = Manager.DataManager.getUserData();
        let gold = userData[Manager.EnumManager.UserDataElement.Wealth].gold;
        gold+=goldNum;
        let value = {
            gold:gold,
            diamond:userData[Manager.EnumManager.UserDataElement.Wealth].diamond
        }
        Manager.DataManager.setData(Manager.EnumManager.UserDataElement.Wealth,value);
        Manager.EventManager.emit(Manager.EnumManager.EventName.UpdateCoinAndDiamondView);
    }

    /**
     * 增加钻石
     * @param diamondNum 增加的金钻石数量
     */
     public addDiamond(diamondNum:number){
        if(diamondNum < 0){
            Logger.err("金币添加数量小于0"+diamondNum);
            return;
        }
        let userData = Manager.DataManager.getUserData();
        let diamond = userData[Manager.EnumManager.UserDataElement.Wealth].diamond;
        diamond+=diamondNum;
        let value = {
            gold:userData[Manager.EnumManager.UserDataElement.Wealth].gold,
            diamond:diamond
        }
        Manager.DataManager.setData(Manager.EnumManager.UserDataElement.Wealth,value);
        Manager.EventManager.emit(Manager.EnumManager.EventName.UpdateCoinAndDiamondView);
    }

    /**
     * 减少金币
     * @param goldNum 减少的钻石数量
     */
    public reduceGold(goldNum:number){
        if( this.getGold() < goldNum){
            Logger.log("消耗的金币数量超过持有数量"+goldNum);
            return;
        }
        let userData = Manager.DataManager.getUserData();
        let gold = userData[Manager.EnumManager.UserDataElement.Wealth].gold;
        gold-=goldNum;
        let value = {
            gold:gold,
            diamond:userData[Manager.EnumManager.UserDataElement.Wealth].diamond
        }
        Manager.DataManager.setData(Manager.EnumManager.UserDataElement.Wealth,value);
        Manager.EventManager.emit(Manager.EnumManager.EventName.UpdateCoinAndDiamondView);
    }

    /**
     * 减少钻石
     * @param diamondNum 减少的数量
     */
     public reduceDiamond(diamondNum:number){
        if( this.getGold() < diamondNum){
            Logger.log("消耗的金币数量超过持有数量"+diamondNum);
            return;
        }
        let userData = Manager.DataManager.getUserData();
        let diamond = userData[Manager.EnumManager.UserDataElement.Wealth].diamond;
        diamond-=diamondNum;
        let value = {
            gold:userData[Manager.EnumManager.UserDataElement.Wealth].gold,
            diamond:diamond
        }
        Manager.DataManager.setData(Manager.EnumManager.UserDataElement.Wealth,value);
        Manager.EventManager.emit(Manager.EnumManager.EventName.UpdateCoinAndDiamondView);
    }
}
