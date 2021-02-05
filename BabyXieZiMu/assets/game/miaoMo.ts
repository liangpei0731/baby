// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import userData from "../userData";

@ccclass
export default class miaoMo extends cc.Component {
    //描摹的图层
    @property(cc.Graphics)
    miaoMoGraphics: cc.Graphics = null;

    //用户描摹的图层
    @property(cc.Graphics)
    userMiaoMoGraphics: cc.Graphics = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () 
    {
        //加载地图
        cc.log("加载地图：map"+userData.currentGameLevel);
        var self = this;
        cc.resources.load("map2",cc.Prefab,function(error:Error,assets:cc.Prefab)
        {
            if(!assets)
            {
                cc.log("加载地图失败!");
                return;
            }
            var node:cc.Node = cc.instantiate(assets);
            self.node.addChild(node);

            var map = node.getComponentInChildren("map");
            map.setMiaoMoGraphics(self.miaoMoGraphics);
            map.setUserMiaoMoGraphics(self.userMiaoMoGraphics);
        });
    }

    // update (dt) {}
}
