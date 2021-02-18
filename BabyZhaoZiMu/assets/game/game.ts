// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import userData from "../userData";

@ccclass
export default class game extends cc.Component {

    @property(cc.Node)
    gameOverNode: cc.Node = null;

    @property(cc.Node)
    gameNode: cc.Node = null;

    @property(cc.ScrollView)
    letterScrollView: cc.ScrollView = null;
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        //初始化
        this.gameOverNode.active = false;

        //加载地图
        
    }

    // update (dt) {}


}
