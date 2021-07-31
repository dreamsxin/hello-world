import { Logger } from "../Const/Logger";

/**
 * 所有场景的基类，要继承于此
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class BaseView extends cc.Component {

    @property({type:cc.Node,tooltip:"节点的遮罩"})
    Mask: cc.Node = null;

    @property({tooltip:"添加节点时是否有动画"})
    isHasAnim: boolean = false;

    //当前节点的zIndex（即渲染的先后顺序）
    protected view_order:number = 0;

    /**
     * 初始化，有是否有动画的判断
     * @param args 传递的参数
     */
    init(...args:any){
        if(this.isHasAnim){
            this.showAnim();
        }
    };

    onLoad () {}

    start () {
        this.setEventListener();
    }

    update(dt){}

    //显示界面
    showPanel()
    {
        this.node.active = true;
    }

    //隐藏界面
    hidePanel(){
        this.node.active = false;
    }

    //打开界面显示的动画
    showAnim()
    {
        cc.tween(this.node)
        .to(0.2,{scale:1.1,easing:"cubicInOut"})
        .to(0.1,{scale:0.9,easing:"cubicIn"})
        .to(0.1,{scale:1,easing:"cubicIn"})
        .start();
    }

    /** 获取多层次子节点 */
    public GetChild<T>(childName: string, parent: cc.Node = null): cc.Node {
        if (parent == null)
            parent = this.node;
        if (!parent) {
            Logger.err("node为空" + this.node);
            Logger.err("node为空名称为" + childName);
            return;
        }

        let names = childName.split("/");
        let child;
        let tempPatent: cc.Node = parent;
        for (let i = 0; i < names.length; i++) {
            if (!tempPatent || !tempPatent.getChildByName(`${names[i]}`) && i == names.length - 1) {
                Logger.err("查找组件失败", names);
                return null;
            }
            if (tempPatent.getChildByName(`${names[i]}`))
                tempPatent = tempPatent.getChildByName(`${names[i]}`);
            if (i == names.length - 1)
                child = tempPatent;
        }
        return child;
    }

    setEventListener(){

    }

    removeEventListener(){

    }

    onDisable(){
        this.removeEventListener();
    }
}
