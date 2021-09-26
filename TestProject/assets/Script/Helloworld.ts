import Manager from "./Manager/Manager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {


    onLoad(){
        Manager.ViewManager.init();
        Manager.DataManager.init();
    }

    start () {
        Manager.ViewManager.showView(Manager.EnumManager.ViewName.LoadingScene);
    }

}
