// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class writeLetters extends cc.Component {
    
    //箭头
    @property(cc.Button)
    arrow: cc.Button = null;

    //灵敏度
    @property
    sensitivity: number = 20;

    //多段路径点
    paths: Array<Array<any>> =  [];
    tempPath:cc.Vec2[] = [];

    //当前状态0初始化、1自动绘制、2玩家描摹
    currentState: number = 0;
    //当前动画索引
    pathsIndex: number = 0;
    //当前动画坐标索引
    pathsPositionIndex: number = 0;
    //是否正在手绘
    touchBegin: boolean = false;
    //最大手绘次数
    @property
    maxDrawCount: number = 0;
    //手绘次数
    drawCount: number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    miaoMoGraphics: cc.Graphics = null;
    userMiaoMoGraphics: cc.Graphics = null;

    setMiaoMoGraphics(miaoMoGraphics: cc.Graphics)
    {
        this.miaoMoGraphics = miaoMoGraphics;
    }

    setUserMiaoMoGraphics(userMiaoMoGraphics: cc.Graphics)
    {
        this.userMiaoMoGraphics = userMiaoMoGraphics;
    }

    start () 
    {
        //循环播放所有的路径动画
        var animation = this.arrow.getComponent(cc.Animation);
        var clips = animation.getClips();
        animation.on('play', function(type,state)
        {
            cc.log(type,state);
            this.currentState = 1;
            this.pathsPositionIndex = 0;
            this.tempPath = [];
        }, this);
        animation.on('finished', function(type,state)
        {
            this.paths.push(this.tempPath);
            this.currentState = 0;
            this.pathsPositionIndex = 0;
            this.tempPath = [];
            cc.log(type,state);
            if(this.pathsIndex + 1 < clips.length)
            {
                this.pathsIndex++;
                animation.node.runAction(cc.sequence(cc.delayTime(0.5),cc.callFunc(function(){
                    animation.play(clips[this.pathsIndex].name);
                },this)));
            }else{
                cc.log(this.paths);
                this.currentState = 0;
                this.pathsIndex = 0;
                this.pathsPositionIndex = 0;

                //自动绘制完以后开始初始化玩家绘画层
                if(this.maxDrawCount > 0)
                {
                    this.initUserDraw();
                } 
            }
        }, this);
        if(this.pathsIndex < clips.length)
        {
            animation.play(clips[this.pathsIndex].name);
        }
    }

    update (dt) 
    {
        if(this.currentState == 1)
        {
            //获取自动绘制路径以及保存路径上的所有坐标点
            var position: cc.Vec2 = this.arrow.node.getPosition()
            if(this.pathsPositionIndex == 0 || position.sub(this.tempPath[this.pathsPositionIndex-1]).mag() > 0)
            {
                //过滤重复坐标点和距离太短的坐标点
                var prePosition = position;
                if(this.pathsPositionIndex != 0)
                {
                    prePosition = this.tempPath[this.pathsPositionIndex-1]
                }
                this.tempPath[this.pathsPositionIndex++] = position;
                this.miaoMoGraphics.moveTo(prePosition.x,prePosition.y);
                this.miaoMoGraphics.lineTo(position.x,position.y);
                this.miaoMoGraphics.stroke();
                this.miaoMoGraphics.fill();

                //更新箭头的方向
                var  angle: number  = Math.atan2((prePosition.y-position.y), (position.x-prePosition.x))
                var  theta: number  = angle*( 180 /Math.PI);
                this.arrow.node.rotation = theta;
            }
        }
    }

    //初始化箭头的坐标和方向
    initArrow()
    {
        if(this.paths.length < 0) return; 
        if(this.paths[this.pathsIndex].length < 0) return;

        this.pathsPositionIndex = 0;
        var position = this.paths[this.pathsIndex][0];
        var nextPosition = position;
        if(this.paths[this.pathsIndex].length > 1)
        {
            nextPosition = this.paths[this.pathsIndex][1];
        } 
        
        var  angle: number  = Math.atan2((position.y-nextPosition.y), (nextPosition.x-position.x))
        var  theta: number  = angle*( 180 /Math.PI);
        
        this.arrow.node.position = position;
        this.arrow.node.rotation = theta;
    }

    initUserDraw()
    {
        //开始临摹
        this.currentState = 2;

        this.initArrow();
        
        //添加玩家绘制事件
        this.arrow.node.on(cc.Node.EventType.TOUCH_START, (event) => 
        {
            if(this.currentState != 2) return false;
            this.touchBegin = true
        }, this);

        this.arrow.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => 
        {
            if (!this.touchBegin) return false;
            if(this.paths.length < 0) return false; 
            if(this.paths[this.pathsIndex].length < 0) return false;
            if(this.paths[this.pathsIndex].length <= this.pathsPositionIndex + 1) return false;
            
            var touchPos = this.arrow.node.parent.convertToNodeSpaceAR(event.touch.getLocation());
            while(true)
            {
                if(this.paths[this.pathsIndex].length <= this.pathsPositionIndex + 1) break;
                
                var position = this.paths[this.pathsIndex][this.pathsPositionIndex+1];
            
                //超出临摹范围
                var distance = position.sub(touchPos).mag();
                if(distance > this.sensitivity) break;
                
                var originalPos = this.arrow.node.getPosition();
                this.arrow.node.position = position;
    
                //旋转角度
                var p1 = position;
                var p2 = originalPos;
                var  angle: number  = Math.atan2((p2.y-p1.y), (p1.x-p2.x));
                var  theta: number  = angle*( 180 /Math.PI);
                this.arrow.node.rotation = theta;
    
                //同步绘画层
                var prePosition = this.paths[this.pathsIndex][this.pathsPositionIndex];
                this.userMiaoMoGraphics.moveTo(prePosition.x,prePosition.y);
                this.userMiaoMoGraphics.lineTo(position.x,position.y);
                this.userMiaoMoGraphics.stroke();
                this.userMiaoMoGraphics.fill();
    
                this.pathsPositionIndex++;
                cc.log("当前路径点：",this.pathsPositionIndex+1,"/",this.paths[this.pathsIndex].length)
            }
            
            if(this.paths[this.pathsIndex].length > this.pathsPositionIndex + 1)
            {
               //继续下一个路径点
            }else if(this.paths.length > this.pathsIndex + 1 && this.paths[this.pathsIndex].length == this.pathsPositionIndex + 1)
            {
                //最后一个坐标点跳入下一笔画
                this.currentState = 2;
                this.pathsIndex++;
                this.pathsPositionIndex = 0;
                this.initArrow();
            }else{
                //全部绘制完毕
                this.node.runAction(cc.sequence(
                    cc.delayTime(0.5)
                    ,cc.callFunc(function(){
                        this.drawCount++;
                        if(this.drawCount < this.maxDrawCount)
                        {
                            //重绘一遍
                            this.currentState = 2;
                            this.pathsIndex = 0;
                            this.pathsPositionIndex = 0;
                            this.userMiaoMoGraphics.clear();
                            this.initArrow();
                        }else{
                            this.gameOver(true);
                        }
                    },this)
                ))
            } 
        }, this);

        this.arrow.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.touchBegin = false
        }, this);
    }

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
