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

    //是否正在获取路径点
    isAutoGetPaths: boolean = false;
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

    start () {

        //循环播放所有的路径动画
        var animation = this.arrow.getComponent(cc.Animation);
        var clips = animation.getClips();
        animation.on('play', function(type,state)
        {
            cc.log(type,state);
            this.isAutoGetPaths = true;
            this.pathsPositionIndex = 0;
            this.tempPath = [];
        }, this);
        animation.on('finished', function(type,state)
        {
            this.paths.push(this.tempPath);
            this.isAutoGetPaths = false;
            this.pathsPositionIndex = 0;
            this.tempPath = [];
            cc.log(type,state);
            if(this.pathsIndex + 1 < clips.length)
            {
                this.pathsIndex++;
                var pathsIndex = this.pathsIndex;
                var clip = clips[pathsIndex];
                //animation.play(clips[this.pathsIndex].name);
                animation.node.runAction(cc.sequence(cc.delayTime(0.2),cc.callFunc(function(){
                    animation.play(clip.name);
                })));
            }else{
                cc.log(this.paths);
                this.isAutoGetPaths = false;
                this.pathsIndex = 0;
                this.pathsPositionIndex = 0;

                //自动绘制完以后开始初始化玩家绘画层
                this.initUserDraw();
            }
        }, this);
        if(this.pathsIndex < clips.length)
        {
            animation.play(clips[this.pathsIndex].name);
        }

    }

    update (dt) 
    {
        if(this.isAutoGetPaths)
        {
            //获取自动绘画路径上的所有坐标点
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

    initUserDraw()
    {
        this.arrow.node.position = this.paths[this.pathsIndex][this.pathsPositionIndex];

        //添加玩家绘制事件
        this.arrow.node.on(cc.Node.EventType.TOUCH_START, (event) => 
        {
            if(this.isAutoGetPaths)
            {
                return false;
            }
            var position: cc.Vec2 = this.arrow.node.getPosition();
            this.userMiaoMoGraphics.moveTo(position.x,position.y);
            this.touchBegin = true
        }, this);

        this.arrow.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => 
        {
            if (!this.touchBegin) {
                return true;
            }
            var touchPos = this.arrow.node.parent.convertToNodeSpaceAR(event.touch.getLocation());

            //移动位置
            // if(!this.arrow.node.parent.getBoundingBox().contains(touchPos))
            // {
            //     //this.touchBegin = false;
            //     return true;
            // }
            var originalPos = this.arrow.node.getPosition();
            this.arrow.node.position = touchPos;

            //旋转角度
            var p1 = touchPos;
            var p2 = originalPos;
            var  angle: number  = Math.atan2((p2.y-p1.y), (p1.x-p2.x))  //弧度  0.6435011087932844
            var  theta: number  = angle*( 180 /Math.PI);  //角度  36.86989764584402
            //var  angle: number  = Math.atan2( (p1.y-p2.y) , (p2.x-p1.x))  //弧度 -0.6435011087932844, 即 2*Math.PI - 0.6435011087932844
            //var  theta: number  = angle*( 180 /Math.PI);   //角度 -36.86989764584402，即360 - 36.86989764584402 = 323.13010235415598
            //var  angle: number  = Math.atan2((p2.x - p1.x), (p2.y - p1.y))  //弧度  0.9272952180016122
            //var  theta: number  = angle*( 180 /Math.PI);  //角度  53.13010235415598
            this.arrow.node.rotation = theta;

            //同步绘画层
            this.userMiaoMoGraphics.lineTo(touchPos.x,touchPos.y);
            this.userMiaoMoGraphics.stroke();
            //this.userMiaoMoGraphics.getComponent("userMiaoMoGraphics").lineTo(this.node.parent.convertToWorldSpaceAR(touchPos));
        }, this);

        this.arrow.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.touchBegin = false
        }, this);
    }
}
