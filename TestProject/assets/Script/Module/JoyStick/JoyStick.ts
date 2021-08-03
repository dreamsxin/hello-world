/**
 * @classdesc 摇杆脚本
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class JoyStick extends cc.Component {

    @property({type:cc.Integer,tooltip:"摇杆活动半径"})
    private maxR:number = 0;

    @property({type:cc.Node,tooltip:"摇杆背景节点"})
    private bg:cc.Node = null;

    @property({type:cc.Node,tooltip:"摇杆中心节点"})
    private circle:cc.Node = null;

    @property({type:cc.Component.EventHandler,tooltip:"移动摇杆回调"})
    private joyStickCallback:cc.Component.EventHandler = null;

    start () {
        //节点监听
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this);
    }

    /**
     * 半径限制，当前位置*（maxR/当前位置），超过最大半径限制就会是maxR
     * @param pos 位置
     */
    clampPos(pos:any){
        let len = pos.mag();
        if (len > this.maxR) {
            let k = this.maxR / len;
            pos.x *= k;
            pos.y *= k;
        }
    }

    /** 根据位置转化角度 */
    covertToAngle (pos) {
        let r = Math.atan2(pos.y, pos.x);
        let d = cc.misc.radiansToDegrees(r);
        return d;
    }

    //事件触摸
    onTouchMove(event){
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.clampPos(pos);
        this.circle.setPosition(pos);
        let angle = this.covertToAngle(pos);
        this.joyStickCallback.emit([pos,angle]);
    }

    //触摸结束
    onTouchEnd(event){
        this.circle.setPosition(0,0);
        this.joyStickCallback.emit([cc.v2(0,0)]);
    }

    update (dt) {}
}
