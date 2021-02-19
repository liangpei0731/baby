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

    //游戏结束节点
    @property(cc.Node)
    gameOverNode: cc.Node = null;

    //游戏节点
    @property(cc.Node)
    gameNode: cc.Node = null;

    //字母集
    @property(cc.ScrollView)
    letterScrollView: cc.ScrollView = null;

    //变灰用的材质
    @property(cc.Material)
    gray: cc.Material = null;

    //还原用的材质
    @property(cc.Material)
    restore: cc.Material = null;

    //放大镜
    @property(cc.Camera)
    magnifier: cc.Camera = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        //初始化
        this.gameOverNode.active = false;
        var gameLevel = userData.currentGameLevel;

        //加载地图
        var self = this;
        cc.resources.load("map"+gameLevel,cc.Prefab,function(error:Error,assets:cc.Prefab)
        {
            if(error)
            {
                cc.log("加载地图失败!");
                return;
            }
            var map:cc.Node = cc.instantiate(assets);
            self.gameNode.addChild(map);
            var lastClickNode = null;
            for(var i = 0; i < map.childrenCount; i++)
            {
                map.children[i].name = map.children[i].getComponent(cc.Label).string;
                var node = map.children[i];
                var newNode = cc.instantiate(node);
                self.letterScrollView.content.addChild(newNode);
                newNode.x = 0;
                newNode.y = 0;
                newNode.getComponent(cc.Label).setMaterial(0,self.gray);

                //找到了
                node.on(cc.Node.EventType.TOUCH_START,(event) => {
                    var clickNode: cc.Node = event.target;
                    cc.log(clickNode);
                    
                    //是否在放大镜范围内
                    var magnifierRect = cc.rect(self.magnifier.node.x, self.magnifier.node.y,self.magnifier.rect.width*map.width,self.magnifier.rect.height*map.height);
                    var letterPosition = clickNode.position;
                    var letterRect = cc.rect(letterPosition.x - clickNode.width/2, letterPosition.y - clickNode.height/2, clickNode.width,clickNode.height);
                    cc.log(magnifierRect,letterRect);
                    if(magnifierRect.intersects(letterRect))
                    {
                        clickNode.removeFromParent();
                        var targetNode = self.letterScrollView.content.getChildByName(clickNode.name);
                        targetNode.getComponent(cc.Label).setMaterial(0,self.restore);
                        //是否查找完毕
                        if(map.childrenCount == 0)
                        {
                            self.gameOver(true);
                        }
                    }
                }, self);                
            }
            self.letterScrollView.content.getComponent(cc.Layout).spacingX = (self.letterScrollView.content.width - map.childrenCount*map.children[0].width)/(map.childrenCount-1);

            //放大镜效果
            map.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
                var touchPosition = event.touch.getLocation();
                if(cc.rect(map.x-map.width/2,map.y-map.height/2,map.width,map.height).contains(map.parent.convertToNodeSpaceAR(touchPosition)))
                {
                    //放大镜位置
                    self.magnifier.node.position = self.magnifier.node.parent.convertToNodeSpaceAR(touchPosition);
                    //放大镜效果位置
                    self.magnifier.rect = cc.rect((touchPosition.x-self.magnifier.rect.width*map.width/2)/map.width,(touchPosition.y-self.magnifier.rect.height*map.height/2)/map.height,self.magnifier.rect.width,self.magnifier.rect.height);
                }                
            }, self);
            map.on(cc.Node.EventType.TOUCH_CANCEL, (event) => {
                var touchPosition = event.touch.getLocation();
                if(cc.rect(map.x-map.width/2,map.y-map.height/2,map.width,map.height).contains(map.parent.convertToNodeSpaceAR(touchPosition)))
                {
                    //放大镜位置
                    self.magnifier.node.position = self.magnifier.node.parent.convertToNodeSpaceAR(touchPosition);
                    //放大镜效果位置
                    self.magnifier.rect = cc.rect((touchPosition.x-self.magnifier.rect.width*map.width/2)/map.width,(touchPosition.y-self.magnifier.rect.height*map.height/2)/map.height,self.magnifier.rect.width,self.magnifier.rect.height);
                }                
            }, self);
            map.on(cc.Node.EventType.TOUCH_END, (event) => {
                var touchPosition = event.touch.getLocation();
                if(cc.rect(map.x-map.width/2,map.y-map.height/2,map.width,map.height).contains(map.parent.convertToNodeSpaceAR(touchPosition)))
                {
                    //放大镜位置
                    self.magnifier.node.position = self.magnifier.node.parent.convertToNodeSpaceAR(touchPosition);
                    //放大镜效果位置
                    self.magnifier.rect = cc.rect((touchPosition.x-self.magnifier.rect.width*map.width/2)/map.width,(touchPosition.y-self.magnifier.rect.height*map.height/2)/map.height,self.magnifier.rect.width,self.magnifier.rect.height);
                }                
            }, self);
        });
    }

    // update (dt) {}

    onButtonEventReturn(event, customEventData)
    {
        cc.director.loadScene("gameLevel");
    }

    onButtonEventVictory(event, customEventData)
    {
        userData.unlockGameLevel();
        cc.director.loadScene("gameLevel");
    }

    onButtonTips(event, customEventData)
    {

    }

    gameOver(isVictory: boolean)
    {
        this.gameOverNode.active = true;
        cc.log("游戏结束.");
    }

}
