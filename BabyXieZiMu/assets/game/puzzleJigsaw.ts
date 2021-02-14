// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import userData from "../userData";

@ccclass
export default class puzzleJigsaw extends cc.Component {

    //贴图背景
    @property(cc.Node)
    patchBg: cc.Node = null;

    //碎图集合
    @property(cc.ScrollView)
    patchScrollView: cc.ScrollView = null;

    //变灰用的材质
    @property(cc.Material)
    gray: cc.Material = null;

    //还原用的材质
    @property(cc.Material)
    restore: cc.Material = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //当前游戏关卡
        var gameLevel = userData.currentGameLevel;
        gameLevel = 2;
        //加载资源
        var patch: string[] = ["map"+gameLevel+"_3_1","map"+gameLevel+"_3_2","map"+gameLevel+"_3_3","map"+gameLevel+"_3_4"];
        cc.log(patch);
        var self = this;
        cc.resources.load(patch, cc.SpriteFrame, function(error,assets){
            if(error)
            {
                cc.log("加载拼图碎片失败!");
                return;
            }
            for(var index = 0; index < assets.length; index++)
            {
                //仓库碎片
                var nodeScrollView = new cc.Node('Sprite');
                nodeScrollView.name = "patch"+(index+1)
                var sp = nodeScrollView.addComponent(cc.Sprite);
                sp.spriteFrame = assets[index];
                nodeScrollView.parent = self.patchScrollView.content;
                //背景碎片
                var nodeBg = cc.instantiate(nodeScrollView);
                nodeBg.getComponent(cc.Sprite).setMaterial(0,self.gray);
                nodeBg.parent = self.patchBg;
                switch(index)
                {
                    case 0:
                        nodeBg.setPosition(-nodeBg.getContentSize().width/2,nodeBg.getContentSize().height/2);
                        break;
                    case 1:
                        nodeBg.setPosition(nodeBg.getContentSize().width/2,nodeBg.getContentSize().height/2);
                        break;
                    case 2:
                        nodeBg.setPosition(-nodeBg.getContentSize().width/2,-nodeBg.getContentSize().height/2);
                        break;
                    case 3:
                        nodeBg.setPosition(nodeBg.getContentSize().width/2,-nodeBg.getContentSize().height/2);
                        break;
                }
                //给仓库碎片添加事件
                var touchNodeName: string = "";
                var touchNode: cc.Node = null;
                var startPosition: cc.Vec2 = null;
                nodeScrollView.on(cc.Node.EventType.TOUCH_START, (event) => 
                {
                    var touchPosition = event.touch.getLocation();
                    cc.log("触摸TOUCH_START：", touchPosition.x,touchPosition.y);
                    startPosition = touchPosition;
                    if(touchNode) touchNode.removeFromParent();
                    touchNode = null;
                    touchNodeName = "";
                }, this);
                nodeScrollView.on(cc.Node.EventType.TOUCH_MOVE, (event) => 
                {
                    var touchPosition = event.touch.getLocation();
                    //cc.log("触摸TOUCH_MOVE：", touchPosition.x,touchPosition.y);
                    if(touchNode)
                    {
                        touchNode.setPosition(touchNode.parent.convertToNodeSpaceAR(touchPosition));
                    }else
                    {
                        var position = startPosition.sub(touchPosition);
                        if(Math.abs(position.x) - Math.abs(position.y) > 10)
                        {
                            touchNode = cc.instantiate(event.target);
                            touchNode.parent = self.patchBg;
                            touchNode.name = "touchNode";
                            touchNodeName = event.target.name;
                            touchNode.setPosition(touchNode.parent.convertToNodeSpaceAR(touchPosition));
                        }
                    }                    
                }, this);
                nodeScrollView.on(cc.Node.EventType.TOUCH_END, (event) => 
                {
                    var touchPosition = event.touch.getLocation();
                    cc.log("触摸TOUCH_END：", touchPosition.x,touchPosition.y);
                    if(touchNode) touchNode.removeFromParent();
                    touchNode = null;
                    touchNodeName = "";
                }, this);
                nodeScrollView.on(cc.Node.EventType.TOUCH_CANCEL, (event) => 
                {
                    var touchPosition = event.touch.getLocation();
                    cc.log("触摸TOUCH_CANCEL：", touchPosition.x,touchPosition.y);
                    //拼图
                    var targetNode = self.patchBg.getChildByName(touchNodeName);
                    if(targetNode)
                    {
                        var rect = new cc.Rect(targetNode.x-targetNode.width/2,targetNode.y-targetNode.height/2,targetNode.width,targetNode.height);
                        if(rect.contains(targetNode.parent.convertToNodeSpaceAR(touchPosition)))
                        {
                            targetNode.getComponent(cc.Sprite).setMaterial(0,self.restore);
                            var originalNode = self.patchScrollView.content.getChildByName(touchNodeName)
                            if(originalNode) originalNode.removeFromParent();
                            //是否拼图完成
                            if(self.patchScrollView.content.childrenCount == 0)
                            {
                                self.gameOver(true);
                            }
                        }
                    }
                    if(touchNode) touchNode.removeFromParent();
                    touchNode = null;
                    touchNodeName = "";
                }, this);
            }
        });
    }

    start () {
        
    }

    // update (dt) {}

    gameOver(isVictory: boolean)
    {
        cc.log("Game Over：",isVictory)
        var node = cc.find("Canvas")
        cc.log(node);
        var componet = node.getComponent(cc.Component);
        cc.log(componet);
        var game = componet.getComponent("game");
        cc.log(game);
        game.enterOrLeaveGame();
    }
}
