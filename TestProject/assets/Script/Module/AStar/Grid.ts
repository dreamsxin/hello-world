/**
 * @classdesc 格子脚本
 */
export default class Grid {

    parent = null;
    x = 0;
    y = 0;
    F = 0;
    G = 0;
    H = 0;
    type = 0;//-1表示障碍物，0表示正常点，1表示起始点，2表示结束点
}
