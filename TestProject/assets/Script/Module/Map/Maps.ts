/**
 * @description 地图脚本
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class Maps extends cc.Component {

    public init() {
        let tiledMap = this.node.getComponent(cc.TiledMap);
        //获取地图背景中tile元素的大小
        let tiledTileSize = tiledMap.getTileSize();
        //获取wall这一层
        let layer = tiledMap.getLayer("wall");
        //获取该层大小，单位是块
        let layerSize: cc.Size = layer.getLayerSize();
        for (let i = 0; i < layerSize.width; i++) {
            for (let j = 0; j < layerSize.height; j++) {
                //获取i，j坐标下的tiledTile
                let tiledTile = layer.getTiledTileAt(i, j, true);
                if (tiledTile.gid !== 0) {
                    tiledTile.node.group = "wall";
                    let rigidBody = tiledTile.node.addComponent(cc.RigidBody);
                    rigidBody.type = cc.RigidBodyType.Static;
                    let collider = tiledTile.node.addComponent(cc.PhysicsBoxCollider);
                    collider.offset = cc.v2(tiledTileSize.width / 2, tiledTileSize.height / 2);
                    collider.size = tiledTileSize;
                    collider.apply();
                }
            }
        }
    }
}
