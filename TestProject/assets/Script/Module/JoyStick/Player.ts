/**
 * @classdesc 摇杆控制的玩家脚本
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    vector:any;

    onLoad () {
        this.vector = cc.v2(0, 0);
    }

    /** 被触发回调 */
    playerMoving (vector, angle) {
        this.vector.x = vector.x;
        this.vector.y = vector.y;
        if (angle) {
            this.node.angle = angle;
        }
    }

    update (dt) {
        const speed = 0.02;
        this.node.x += this.vector.x * speed;
        this.node.y += this.vector.y * speed;
    }
}
