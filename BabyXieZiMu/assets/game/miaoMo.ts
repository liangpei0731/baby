// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class miaoMo extends cc.Component {

    //map
    @property(cc.Prefab)
    mapPrefab: cc.Prefab = null;

    //描摹的图层
    @property(cc.Graphics)
    miaoMoGraphics: cc.Graphics = null;

    //用户描摹的图层
    @property(cc.Graphics)
    userMiaoMoGraphics: cc.Graphics = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        var node = cc.instantiate(this.mapPrefab);
        this.node.addChild(node);

        var map = node.getComponentInChildren("map");
        map.setMiaoMoGraphics(this.miaoMoGraphics);
        map.setUserMiaoMoGraphics(this.userMiaoMoGraphics);
    }

    // update (dt) {}
}
