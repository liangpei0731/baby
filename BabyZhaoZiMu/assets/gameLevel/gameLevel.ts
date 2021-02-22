// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import userData from "../userData";

@ccclass
export default class gameLevel extends cc.Component {
    
    @property(cc.AudioSource)
    tipsAudioSource: cc.AudioSource[] = [];

    @property(cc.AudioSource)
    buttonAudioSource: cc.AudioSource = null;

    @property(cc.ScrollView)
    levelScrollView: cc.ScrollView = null;

    @property(cc.Sprite)
    levelBgSprite: cc.Sprite = null;
    
    @property(cc.Prefab)
    myselfSprite: cc.Prefab = null
    
    @property
    maxGameLevel: number = 0;
    currentLevelButton: cc.Node = null;
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //加载用户数据
        userData.loadUserData(this.maxGameLevel);

        // //随机提示语
        // var self = this;
        // this.node.runAction(cc.repeatForever(cc.sequence(
        //     cc.delayTime(60)
        //     ,cc.callFunc(function(){
        //         cc.audioEngine.playEffect(this.tipsAudioSource[Math.round(Math.random()*self.tipsAudioSource.length)].clip,false);
        //     },this)
        // )))
        
        // if(cc.audioEngine.isMusicPlaying() == false)
        // {
        //     cc.log("播放背景音乐!");
        //     cc.resources.load("bg", cc.AudioClip, null, function (err:Error, clip:cc.AudioClip) {
        //         var audioID = cc.audioEngine.playMusic(clip, true);
        //         cc.audioEngine.setMusicVolume(0.6);
        //     });
        // }
    }

    start () 
    {
        //初始化关卡解锁状态和当前关卡
        for(var i = 1; i <= userData.maxGameLevel; i++)
        {
            var node = this.levelBgSprite.node.getChildByName("level"+i);
            if(node)
            {
                node.getComponent(cc.Button).interactable = true;
                //当前关卡
                if(i == userData.currentGameLevel)
                {
                    var myself = cc.instantiate(this.myselfSprite);
                    node.addChild(myself);
                    this.currentLevelButton = node;
                    myself.name = "myself";
                    var anim = myself.getComponent(cc.Animation);
                    anim.play();

                    var pos: cc.Vec2 = node.getPosition();
                    pos = node.parent.convertToWorldSpaceAR(pos);
                    pos = this.levelScrollView.node.convertToNodeSpaceAR(pos);
                    this.levelScrollView.scrollToOffset(pos);
                }
            }
            if(i >= userData.unlockedGameLevel) break;
        } 
        
        //是否有解锁动画和自动进入
        if(userData.isUnlockAction)
        {
            this.switchGameLevel(userData.unlockedGameLevel,true);
        }
    }

    // update (dt) {}
    
    switchGameLevel(level: number, isPlayAnim: boolean = false)
    {
        if(level <= 0) return;
        if(level > userData.maxGameLevel) return;
        
        var playAnimTime: number = 0.35;

        //移除上一关的动画
        if(this.currentLevelButton)
        {
            var myself = this.currentLevelButton.getChildByName("myself");
            if(myself)
            {
                myself.runAction(cc.sequence(cc.scaleTo(playAnimTime,0).easing(cc.easeOut(playAnimTime)),cc.removeSelf()));
            }
        }

        //播放下一关的动画
        var node = this.levelBgSprite.node.getChildByName("level"+level);
        var myself = node.getChildByName("myself");
        if(myself)
        {
            myself.removeFromParent();
        }
        myself = cc.instantiate(this.myselfSprite);
        node.addChild(myself);
        this.currentLevelButton = node;
        myself.name = "myself";
        myself.scale = 0;
        myself.runAction(cc.sequence(
            cc.delayTime(playAnimTime)
            ,cc.scaleTo(playAnimTime,0.6).easing(cc.easeIn(playAnimTime))
            ,cc.callFunc(function(target){
                var anim = target.getComponent(cc.Animation);
                anim.play();
            })
            ,cc.delayTime(playAnimTime)
            ,cc.callFunc(function(){
                cc.director.loadScene("game");
            })
            ));
        
        //保存数据
        userData.currentGameLevel = level;
        userData.isUnlockAction = false;
    }

    onButtonEventSwitchGameLevel(event,customEventData)
    {
        this.buttonAudioSource.play();
        this.switchGameLevel(Number(customEventData));
    }

    clearUserData()
    {
        userData.resetUserData();
        cc.game.restart();
    }
}
