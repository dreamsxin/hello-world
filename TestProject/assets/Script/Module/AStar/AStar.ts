/**
 * @classdesc A星寻路
 */

import Grid from "./Grid";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AStar extends cc.Component {

    _gridW: number = 50;//格子宽度
    _gridH: number = 50;//格子高度
    mapH: number = 11;//纵向格子数量
    mapW: number = 20;//横向格子数量
    is8Dir: boolean = true;//是否是八方向

    openList = [];//开列表
    closeList = [];//关列表
    gridsList = new Array(this.mapW + 1);
    path = [];

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.initMap();
    }

    initMap() {
        //初始化地图二维数组
        for (let col = 0; col < this.gridsList.length; col++) {
            this.gridsList[col] = new Array(this.mapH + 1);
        }
        //清理绘制
        this.node.getComponent(cc.Graphics).clear();
        //绘制普通地图块
        for (let col = 0; col <= this.mapW; col++) {
            for (let row = 0; row <= this.mapH; row++) {
                this.draw(col, row);
                this.addGrid(col, row, 0);
            }
        }
        // 设置起点和终点
        let startX = 3;
        let startY = 8;
        let endX = 7;
        let endY = 8;
        this.gridsList[startX][startY].type = 1;
        this.draw(startX, startY, cc.Color.YELLOW);

        this.gridsList[endX][endY].type = 2;
        this.draw(endX, endY, cc.Color.BLUE);
    }

    draw(col, row, color?: any) {
        color = color != undefined ? color : cc.Color.GRAY;
        this.node.getComponent(cc.Graphics).fillColor = color;
        let posX = -this.node.width / 2 + 2 + col * (this._gridW + 2);
        let posY = -this.node.height / 2 + 2 + row * (this._gridH + 2);
        this.node.getComponent(cc.Graphics).fillRect(posX, posY, this._gridW, this._gridH);
    }

    addGrid(x, y, type) {
        let grid = new Grid();
        grid.x = x;
        grid.y = y;
        grid.type = type;
        this.gridsList[x][y] = grid;
    }

    onTouchMove(event) {
        let pos = event.getLocation();
        let x = Math.floor(pos.x / (this._gridW + 2));
        let y = Math.floor(pos.y / (this._gridH + 2));
        if (this.gridsList[x][y].type == 0) {
            this.gridsList[x][y].type = -1;
            this.draw(x, y, cc.Color.RED);
        }
    }

    onTouchEnd() {
        // 开始寻路
        this.findPath(cc.v2(3, 8), cc.v2(7, 8));
    }

    findPath(startPos, endPos) {
        //获取起始点和结束点
        let startGrid = this.gridsList[startPos.x][startPos.y];
        let endGrid = this.gridsList[endPos.x][endPos.y];
        //把起始点放进开列表中
        this.openList.push(startGrid);
        let curGrid = this.openList[0];
        //查找，当开列表的长度大于0 ，并且当前格子类型不为结束点
        while (this.openList.length > 0 && curGrid.type != 2) {
            curGrid = this.openList[0];
            if (curGrid.type == 2) {
                console.log("寻路成功！");
                this.generatePath(curGrid);
                return;
            }
            //继续寻路
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if(i != 0 || j != 0){
                        let col = curGrid.x + i;
                        let row = curGrid.y + j;
                        //行列不越界，所在格子的类型不是障碍物，并且不在关列表中
                        if(col>=0 && row>=0 && col<= this.mapW && row <= this.mapH && this.gridsList[col][row].type != -1 
                            && this.closeList.indexOf(this.gridsList[col][row]) < 0){
                                if (this.is8Dir){
                                    // 8方向 斜向走动时要考虑相邻的是不是障碍物
                                    if (this.gridsList[col-i][row].type == -1 || this.gridsList[col][row-j].type == -1){
                                        continue;
                                    }
                                } else {
                                    // 四方形行走
                                    if (Math.abs(i) == Math.abs(j)){
                                        continue;
                                    }
                                }
                                // 计算g值
                                let G = curGrid.G + Number(Math.sqrt(Math.pow(i*10,2) + Math.pow(j*10,2)));
                                if (this.gridsList[col][row].G == 0 || this.gridsList[col][row].G > G){
                                    this.gridsList[col][row].G = G;
                                    // 更新父节点
                                    this.gridsList[col][row].parent = curGrid;
                                }
                                // 计算h值 manhattan估算法
                                this.gridsList[col][row].H = Math.abs(endPos.x - col) + Math.abs(endPos.y - row);
                                // 更新f值
                                this.gridsList[col][row].F = this.gridsList[col][row].G + this.gridsList[col][row].H;
                                // 如果不在开放列表里则添加到开放列表里
                                if (this.openList.indexOf(this.gridsList[col][row]) < 0){
                                    this.openList.push(this.gridsList[col][row]);
                                }
                        }
                    }
                } 
            }
            // 遍历完四周节点后把当前节点加入关闭列表
            this.closeList.push(curGrid);
            // 从开放列表把当前节点移除
            this.openList.splice(this.openList.indexOf(curGrid), 1);
            if (this.openList.length <= 0){
                cc.log("find path failed.");
            }

            // 重新按照f值排序（升序排列)
            this.openList.sort(this._sortFunc);
        }
    }

    _sortFunc(x, y){
        return x.f - y.f;
    }

    //路径寻找结束，绘制路径
    generatePath(grid) {
        //查找该格子的父节点是否存在，存在的话继续往上找，并存放到数组中
        this.path.push(grid);
        while (grid.parent) {
            grid = grid.parent;
            this.path.push(grid);
        }
        //绘制除了初始点和结束点之外的路径格子
        for (let index = 0; index < this.path.length; index++) {
            const element = this.path[index];
            if (index != 0 && index != this.path.length - 1) {
                this.draw(element.x,element.y,cc.Color.GREEN);
            }
        }
    }

}
