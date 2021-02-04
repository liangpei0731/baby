// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class map extends cc.Component {
    
    //箭头
    @property(cc.Button)
    arrow: cc.Button = null;

    //多段路径点
    paths: Array<Array<any>> =  [];
    tempPath:cc.Vec2[] = [];

    //当前状态0初始化、1自动绘制、2玩家描摹
    currentState: number = 0;
    //当前动画索引
    pathsIndex: number = 0;
    //当前动画坐标索引
    pathsPositionIndex: number = 0;
    
    touchBegin: boolean = false;
    
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
                animation.node.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function(){
                    animation.play(clips[this.pathsIndex].name);
                },this)));
            }else{
                cc.log(this.paths);
                this.currentState = 0;
                this.pathsIndex = 0;
                this.pathsPositionIndex = 0;

                //自动绘制完以后开始初始化玩家绘画层
                this.initUserDraw();
            }
        }, this);
        if(this.pathsIndex < clips.length)
        {
            //this.currentState = 1;
            animation.play(clips[this.pathsIndex].name);
        }
    }

    update (dt) 
    {
        if(this.currentState == 1)
        {
            //获取自动绘制路径以及保存路径上的所有坐标点
            var position: cc.Vec2 = this.arrow.node.getPosition();
            if(this.pathsPositionIndex == 0)
            {
                this.miaoMoGraphics.moveTo(position.x,position.y);
            }
            if(this.pathsPositionIndex == 0 || this.tempPath[this.pathsPositionIndex-1] != position)
            {
                //过滤重复坐标点
                this.tempPath[this.pathsPositionIndex++] = position;
                this.miaoMoGraphics.lineTo(position.x,position.y);
                this.miaoMoGraphics.stroke();
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

        this.userMiaoMoGraphics.moveTo(position.x,position.y);
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
            if (!this.touchBegin) return true;
            if(this.paths.length < 0) return true; 
            if(this.paths[this.pathsIndex].length < 0) return true;
            if(this.paths[this.pathsIndex].length <= this.pathsPositionIndex + 1) return true;
            
            var touchPos = this.arrow.node.parent.convertToNodeSpaceAR(event.touch.getLocation());
            var position = this.paths[this.pathsIndex][this.pathsPositionIndex+1];
            
            //超出临摹范围
            var distance = position.sub(touchPos).mag();
            if(distance > 30) return true;
            
            this.pathsPositionIndex++;
            var originalPos = this.arrow.node.getPosition();
            this.arrow.node.position = position;

            //旋转角度
            var p1 = position;
            var p2 = originalPos;
            var  angle: number  = Math.atan2((p2.y-p1.y), (p1.x-p2.x));
            var  theta: number  = angle*( 180 /Math.PI);
            this.arrow.node.rotation = theta;

            //同步绘画层
            this.userMiaoMoGraphics.lineTo(position.x,position.y);
            this.userMiaoMoGraphics.stroke();

            cc.log("当前路径点：",this.pathsPositionIndex+1,"/",this.paths[this.pathsIndex].length)
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
                        this.currentState = 2;
                        this.pathsIndex = 0;
                        this.pathsPositionIndex = 0;
                        this.userMiaoMoGraphics.clear();
                        this.initArrow();
                    },this)
                ))
            } 
        }, this);

        this.arrow.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.touchBegin = false
        }, this);
    }
}
