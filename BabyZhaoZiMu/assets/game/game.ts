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
    //游戏节点
    @property(cc.Node)
    gameNode: cc.Node = null;

    @property(cc.AudioSource)
    effectAudioSource: cc.AudioSource = null;

    //字母集
    @property(cc.ScrollView)
    letterScrollView: cc.ScrollView = null;

    //变灰用的材质
    @property(cc.Material)
    gray: cc.Material = null;

    //还原用的材质
    @property(cc.Material)
    restore: cc.Material = null;

    // //放大镜
    // @property(cc.Camera)
    // magnifier: cc.Camera = null;
    @property(cc.Node)
    mirror: cc.Node = null;
    @property(cc.Node)
    mirrorCameraNode: cc.Node = null;
    @property(cc.Node)
    tempCameraSpriteNode: cc.Node = null;

    //报警
    @property(cc.Node)
    warning: cc.Node = null;
    //计时器
    @property(cc.ProgressBar)
    countdown: cc.ProgressBar = null;
    //总时间秒s
    totalTime: number = 60;
    //星星数量
    starCount: number = 3;
    @property(cc.Sprite)
    star: cc.Sprite[] = [];

    //提示
    @property(cc.ScrollView)
    tipsScrollView: cc.ScrollView = null;

    //游戏结束节点
    @property(cc.Node)
    gameOverNode: cc.Node = null;
    //游戏结束的星星
    @property(cc.Node)
    gameOverStar: cc.Node[] = [];
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.gameOverNode.active = false;
        this.warning.active = false;

        this.initCamera();
        this.mirrorCameraNode.setPosition(this.mirror.getPosition());

        
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            let touchPos: cc.Vec2 = this.mirror.parent.convertToNodeSpaceAR(event.getLocation());
            this.mirror.setPosition(touchPos);
            this.mirrorCameraNode.setPosition(touchPos);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            let touchPos: cc.Vec2 = this.mirror.parent.convertToNodeSpaceAR(event.getLocation());
            this.mirror.setPosition(touchPos);
            this.mirrorCameraNode.setPosition(touchPos);
        }, this);

    }

    start () {
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
            map.x = 0;
            map.y = 0;
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

                //是否在放大镜范围内
                node.on(cc.Node.EventType.TOUCH_START,(event) => {
                    var clickNode: cc.Node = event.target;
                    var letterPosition = clickNode.parent.convertToWorldSpaceAR(clickNode.position);
                    var letterRect = cc.rect(letterPosition.x - clickNode.width/2, letterPosition.y - clickNode.height/2, clickNode.width,clickNode.height);
                    var magnifierPosition = self.tempCameraSpriteNode.parent.convertToWorldSpaceAR(self.tempCameraSpriteNode.position);          
                    var magnifierRect = cc.rect(magnifierPosition.x-self.tempCameraSpriteNode.width/2,magnifierPosition.y-self.tempCameraSpriteNode.height/2,self.tempCameraSpriteNode.width,self.tempCameraSpriteNode.height);
                    if(magnifierRect.intersects(letterRect))
                    {
                        self.effectAudioSource.play();
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
            //调整字母集间距
            self.letterScrollView.content.getComponent(cc.Layout).spacingX = (self.letterScrollView.content.width - map.childrenCount*map.children[0].width)/(map.childrenCount-1);
            
            //倒计时
            self.countdown.node.runAction(cc.repeatForever(cc.sequence(
                cc.delayTime(0.1),
                cc.callFunc(function(){
                    self.countdown.progress = (self.countdown.progress*self.totalTime - 0.1)/self.totalTime;
                    if(self.countdown.progress < 0)
                    {
                        self.countdown.progress = 0;
                    }
                    if(self.countdown.progress < 0.6)
                    {
                        self.starCount = 2;
                        self.star[0].getComponent(cc.Sprite).setMaterial(0,self.gray);
                    }
                    if(self.countdown.progress < 0.3)
                    {
                        self.starCount = 1;
                        self.star[1].getComponent(cc.Sprite).setMaterial(0,self.gray);
                        if(self.warning.active == false)
                        {
                            self.warning.active = true;
                        }
                    }
                },self)
                ))
        });
    }

    // update (dt) {}

    initCamera() {
        let visibleRect = cc.view.getVisibleSize();
  
        let texture = new cc.RenderTexture();
        texture.initWithSize(visibleRect.width, visibleRect.height);
        let spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        this.mirrorCameraNode.getComponent(cc.Camera).targetTexture = texture;
  
        this.tempCameraSpriteNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        this.tempCameraSpriteNode.scaleY = -1;
      }

    onButtonEventReturn(event, customEventData)
    {
        cc.director.loadScene("gameLevel");
    }

    onButtonEventVictory(event, customEventData)
    {
        userData.unlockGameLevel();
        cc.director.loadScene("gameLevel");
        cc.log("游戏结束.");
    }

    onButtonTips(event, customEventData)
    {
        for(var i = 0; i < this.tipsScrollView.content.childrenCount; i++)
        {
            var node = this.tipsScrollView.content.children[i].getComponentInChildren(cc.Button);
            if(node.node.active)
            {
                node.node.active = false;
                this.tipsScrollView.getComponentInChildren(cc.Label).string = (this.tipsScrollView.content.childrenCount - i - 1).toString();
                var map = this.gameNode.getChildByName("map");
                if(map.childrenCount > 0)
                {
                    var clickNode: cc.Node = map.children[0];   
                    this.effectAudioSource.play();                 
                    clickNode.removeFromParent();
                    var targetNode = this.letterScrollView.content.getChildByName(clickNode.name);
                    targetNode.getComponent(cc.Label).setMaterial(0,this.restore);
                    //是否查找完毕
                    if(map.childrenCount == 0)
                    {
                        this.gameOver(true);
                    }
                }
                break;
            }
        }
        
    }

    gameOver(isVictory: boolean)
    {
        this.countdown.node.stopAllActions();
        this.gameOverNode.active = true;
        this.gameOverNode.getComponent(cc.Button).interactable = false;
        var node = this.gameOverNode.getChildByName("Find_settlement_2");
        for(var i = 0; i < 3; i++)
        {
            if(i < 3-this.starCount)
            {
                this.gameOverStar[i].getComponent(cc.Sprite).setMaterial(0,this.gray);
            }
        }
        var animation = node.getComponent(cc.Animation)
        animation.playAdditive("gameOver");
        animation.playAdditive("gameOver2");
        animation.on("finished",function(){
            this.gameOverNode.getComponent(cc.Button).interactable = true;
        },this);
        this.gameOverNode.getComponent(cc.AudioSource).play();
    }

}
