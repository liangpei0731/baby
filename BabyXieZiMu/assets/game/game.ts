// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import userData from "../userData";


enum currentStageType{
    currentStageNull,                   //初始化
    currentStageWriteCapitalLetters,    //写大写字母
    currentStageWriteSmallLetters,      //写小写字母
    currentStagePuzzleJigsaw,           //拼图

    currentStageMax,                    //游戏结束
}

@ccclass
export default class miaoMo extends cc.Component {
    //游戏节点
    @property(cc.Node)
    gameNode: cc.Node = null;

    //描摹的图层
    @property(cc.Graphics)
    miaoMoGraphics: cc.Graphics = null;

    //用户描摹的图层
    @property(cc.Graphics)
    userMiaoMoGraphics: cc.Graphics = null;

    @property(cc.Node)
    gameOverNode: cc.Node = null;

    //当前阶段
    currentStage: currentStageType = currentStageType.currentStageNull;
    //currentStage: currentStageType = currentStageType.currentStageWriteSmallLetters;
    currentNode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () 
    {
        //初始化
        this.gameOverNode.active = false;
        //进入游戏
        this.enterOrLeaveGame();
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

    enterOrLeaveGame()
    {
        //删除上一个阶段的节点
        if(this.currentNode) this.currentNode.removeFromParent();
        //当前游戏关卡
        var gameLevel = userData.currentGameLevel;
        gameLevel = 2;
        //当前游戏阶段
        ++this.currentStage;
        var currentStage = this.currentStage;

        switch(currentStage)
        {
            case currentStageType.currentStageNull:
                {
                    cc.log("当前正处于游戏初始化状态...")
                }
                break;
            case currentStageType.currentStageWriteCapitalLetters:
                {
                    this.miaoMoGraphics.clear();
                    this.userMiaoMoGraphics.clear();
                    var self = this;
                    cc.resources.load("map"+gameLevel+"_1",cc.Prefab,function(error:Error,assets:cc.Prefab)
                    {
                        if(error)
                        {
                            cc.log("加载地图失败!");
                            return;
                        }
                        var node:cc.Node = cc.instantiate(assets);
                        self.gameNode.addChild(node);
                        self.currentNode = node;

                        var map = node.getComponentInChildren("writeLetters");
                        map.setMiaoMoGraphics(self.miaoMoGraphics);
                        map.setUserMiaoMoGraphics(self.userMiaoMoGraphics);
                    });
                    cc.log("进入写大写字母阶段...");
                }
                break;
            case currentStageType.currentStageWriteSmallLetters:
                {
                    this.miaoMoGraphics.clear();
                    this.userMiaoMoGraphics.clear();
                    var self = this;
                    cc.resources.load("map"+gameLevel+"_2",cc.Prefab,function(error:Error,assets:cc.Prefab)
                    {
                        if(error)
                        {
                            cc.log("加载地图失败!");
                            return;
                        }
                        var node:cc.Node = cc.instantiate(assets);
                        self.gameNode.addChild(node);
                        self.currentNode = node;
                        
                        var map = node.getComponentInChildren("writeLetters");
                        map.setMiaoMoGraphics(self.miaoMoGraphics);
                        map.setUserMiaoMoGraphics(self.userMiaoMoGraphics);
                    });
                    cc.log("进入写小写字母阶段...");
                }
                break;
            case currentStageType.currentStagePuzzleJigsaw:
                {
                    this.miaoMoGraphics.clear();
                    this.userMiaoMoGraphics.clear();
                    var self = this;
                    cc.resources.load("puzzleJigsaw",cc.Prefab,function(error:Error,assets:cc.Prefab)
                    {
                        if(error)
                        {
                            cc.log("加载地图失败!");
                            return;
                        }
                        var node:cc.Node = cc.instantiate(assets);
                        self.gameNode.addChild(node);
                        self.currentNode = node;
                    });
                    cc.log("进入拼图阶段...");
                }
                break;
            case currentStageType.currentStageMax:
                {
                    this.gameOverNode.active = true;
                    cc.log("游戏结束.");
                }
                break;
        }
    }
}
