// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Graphics)
    userDarw: cc.Graphics = null;

    arr: any = [];
    touchBegin: boolean = false;
    gameOver: boolean = false;
    arrIndex: number = 0;
    
    // LIFE-CYCLE CALLBACKS:

    //onLoad () {}

    start () {

        //临摹路径
        this.arr[2] = [{"x":26,"y":287},{"x":26,"y":287},{"x":29.82,"y":319.15},{"x":33.18,"y":332.37},{"x":34.7,"y":337.19},{"x":37.35,"y":344.55},{"x":38.34,"y":347.02},{"x":44.76,"y":360.52},{"x":48.43,"y":366.77},{"x":52.16,"y":372.35},{"x":57.72,"y":379.49},{"x":60.9,"y":383.08},{"x":62.23,"y":384.48},{"x":66.65,"y":388.78},{"x":68.13,"y":390.1},{"x":70.37,"y":392},{"x":72.83,"y":393.96},{"x":76.27,"y":396.49},{"x":79.19,"y":398.46},{"x":82.19,"y":400.33},{"x":85.58,"y":402.25},{"x":89.87,"y":404.45},{"x":93.25,"y":406},{"x":96.9,"y":407.5},{"x":100.9,"y":408.97},{"x":105.04,"y":410.3},{"x":109.52,"y":411.53},{"x":113.86,"y":412.55},{"x":118.55,"y":413.45},{"x":123.86,"y":414.25},{"x":128.12,"y":414.73},{"x":132.74,"y":415.09},{"x":143.79,"y":415.17},{"x":150.38,"y":414.66},{"x":152.7,"y":414.38},{"x":155.15,"y":414.02},{"x":163.86,"y":412.19},{"x":174.63,"y":408.59},{"x":177.88,"y":407.17},{"x":181.39,"y":405.44},{"x":186.88,"y":402.28},{"x":195.23,"y":396.22},{"x":199.49,"y":392.42},{"x":205.49,"y":386},{"x":208.55,"y":382.13},{"x":215.56,"y":370.97},{"x":217.27,"y":367.54},{"x":218.88,"y":363.94},{"x":220.18,"y":360.7},{"x":221.35,"y":357.44},{"x":222.47,"y":353.88},{"x":223.53,"y":350.02},{"x":224.37,"y":346.43},{"x":225.1,"y":342.69},{"x":225.68,"y":338.98},{"x":226.16,"y":335.01},{"x":226.47,"y":331.21},{"x":226.66,"y":327.32},{"x":226.71,"y":323.16},{"x":226.63,"y":319.43},{"x":226.41,"y":315.43},{"x":226.01,"y":311.12},{"x":225.51,"y":307.2},{"x":224.87,"y":303.24},{"x":224.05,"y":299.06},{"x":223.11,"y":294.97},{"x":221.94,"y":290.63},{"x":220.71,"y":286.62},{"x":219.36,"y":282.66},{"x":217.86,"y":278.71},{"x":216.09,"y":274.46},{"x":214.24,"y":270.43},{"x":212.31,"y":266.56},{"x":210.12,"y":262.5},{"x":207.88,"y":258.67},{"x":205.33,"y":254.61},{"x":202.79,"y":250.85},{"x":200.09,"y":247.11},{"x":197.02,"y":243.03},{"x":194.26,"y":239.38},{"x":191.24,"y":235.39},{"x":188,"y":231.14},{"x":184.88,"y":227.06},{"x":181.67,"y":222.87},{"x":178.43,"y":218.65},{"x":174.4,"y":213.43},{"x":171.71,"y":209.94},{"x":168.33,"y":205.58},{"x":164.78,"y":201.01},{"x":161.22,"y":196.44},{"x":157.59,"y":191.79},{"x":154.15,"y":187.38},{"x":150.75,"y":183.04},{"x":142.35,"y":172.36},{"x":138.7,"y":167.72},{"x":135.12,"y":163.17},{"x":131.55,"y":158.66},{"x":127.95,"y":154.11},{"x":124.36,"y":149.58},{"x":120.8,"y":145.1},{"x":117.29,"y":140.67},{"x":113.71,"y":136.17},{"x":110.23,"y":131.79},{"x":106.71,"y":127.38},{"x":103.3,"y":123.1},{"x":99.92,"y":118.87},{"x":96.57,"y":114.68},{"x":93.36,"y":110.67},{"x":90.05,"y":106.54},{"x":86.88,"y":102.57},{"x":83.67,"y":98.58},{"x":80.57,"y":94.71},{"x":77.65,"y":91.08},{"x":74.71,"y":87.42},{"x":71.75,"y":83.75},{"x":69.13,"y":80.49},{"x":66.47,"y":77.19},{"x":63.93,"y":74.03},{"x":61.44,"y":70.95},{"x":58.83,"y":67.72},{"x":56.71,"y":65.09},{"x":54.52,"y":62.38},{"x":52.57,"y":59.98},{"x":50.6,"y":57.53},{"x":48.77,"y":55.28},{"x":47.12,"y":53.24},{"x":45.56,"y":51.32},{"x":44.07,"y":49.48},{"x":42.82,"y":47.93},{"x":41.7,"y":46.55},{"x":40.7,"y":45.32},{"x":39.83,"y":44.26},{"x":39.15,"y":43.41},{"x":38.59,"y":42.72},{"x":38.24,"y":42.29},{"x":38.04,"y":42.05},{"x":38,"y":42},{"x":37.99,"y":41.98},{"x":37.97,"y":41.93},{"x":37.93,"y":41.86},{"x":37.88,"y":41.76},{"x":37.83,"y":41.64},{"x":37.77,"y":41.5},{"x":37.7,"y":41.34},{"x":37.62,"y":41.16},{"x":37.54,"y":40.96},{"x":37.45,"y":40.74},{"x":37.36,"y":40.51},{"x":37.26,"y":40.24},{"x":37.16,"y":39.97},{"x":37.07,"y":39.69},{"x":36.97,"y":39.4},{"x":36.87,"y":39.08},{"x":36.77,"y":38.77},{"x":36.67,"y":38.43},{"x":36.58,"y":38.08},{"x":36.49,"y":37.74},{"x":36.4,"y":37.37},{"x":36.32,"y":36.99},{"x":36.25,"y":36.62},{"x":36.19,"y":36.24},{"x":36.13,"y":35.85},{"x":36.08,"y":35.46},{"x":36.04,"y":35.06},{"x":36.02,"y":34.66},{"x":36,"y":34.24},{"x":36,"y":33.87},{"x":36.01,"y":33.47},{"x":36.04,"y":33.06},{"x":36.08,"y":32.67},{"x":36.14,"y":32.27},{"x":36.21,"y":31.89},{"x":36.31,"y":31.48},{"x":36.42,"y":31.12},{"x":36.55,"y":30.75},{"x":36.7,"y":30.38},{"x":36.88,"y":30.03},{"x":37.07,"y":29.68},{"x":37.3,"y":29.34},{"x":37.54,"y":29.01},{"x":37.81,"y":28.7},{"x":38.12,"y":28.39},{"x":38.43,"y":28.11},{"x":38.78,"y":27.83},{"x":39.16,"y":27.57},{"x":39.57,"y":27.33},{"x":40,"y":27.11},{"x":40.49,"y":26.9},{"x":40.99,"y":26.71},{"x":41.53,"y":26.54},{"x":42.08,"y":26.4},{"x":42.71,"y":26.27},{"x":43.36,"y":26.17},{"x":44.03,"y":26.09},{"x":44.73,"y":26.04},{"x":45.49,"y":26.01},{"x":46.32,"y":26},{"x":47.34,"y":26},{"x":48.6,"y":26},{"x":50.12,"y":26},{"x":51.86,"y":26},{"x":53.85,"y":26},{"x":55.97,"y":26},{"x":58.3,"y":26},{"x":60.88,"y":26},{"x":63.77,"y":26},{"x":67.03,"y":26},{"x":69.84,"y":26},{"x":73.2,"y":26},{"x":76.55,"y":26},{"x":80.03,"y":26},{"x":83.7,"y":26},{"x":87.29,"y":26},{"x":91.78,"y":26},{"x":95.16,"y":26},{"x":99.45,"y":26},{"x":103.5,"y":26},{"x":107.94,"y":26},{"x":112.12,"y":26},{"x":116.42,"y":26},{"x":120.68,"y":26},{"x":125.67,"y":26},{"x":129.78,"y":26},{"x":134.18,"y":26},{"x":138.94,"y":26},{"x":143.27,"y":26},{"x":147.89,"y":26},{"x":152.33,"y":26},{"x":156.61,"y":26},{"x":161.36,"y":26},{"x":165.79,"y":26},{"x":169.94,"y":26},{"x":174.14,"y":26},{"x":178.56,"y":26},{"x":182.43,"y":26},{"x":186.31,"y":26},{"x":190.5,"y":26},{"x":194.05,"y":26},{"x":198.26,"y":26},{"x":201.95,"y":26},{"x":204.92,"y":26},{"x":208.06,"y":26},{"x":211.39,"y":26},{"x":214.21,"y":26},{"x":217.2,"y":26},{"x":219.86,"y":26},{"x":222.18,"y":26},{"x":224.46,"y":26},{"x":226.53,"y":26},{"x":228.26,"y":26},{"x":229.87,"y":26},{"x":231.16,"y":26},{"x":232.27,"y":26},{"x":233.13,"y":26},{"x":233.67,"y":26},{"x":233.96,"y":26}]
        if(this.arr.length == 0)
        {
            return;
        }

        this.initAngle();
        this.init();
    }

    // update (dt) {}

    //设置箭头方向（包括描摹过程中箭头的方向）
    initAngle() {
        let angle = this.getAngle(this.arr[0].x, this.arr[0].y, this.arr[2].x, this.arr[2].y);
        this.node.rotation = -angle;
    }
    
    init() {
        let node = this.node;
        node.x = this.arr[0].x;
        node.y = this.arr[0].y;

        this.gameOver = false;
        this.arrIndex = 0;


        node.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.touchBegin = true
        }, node);

        node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            if (!this.touchBegin) {
                return
            }

            let nodeWorldPos = this.node.parent.convertToWorldSpaceAR(cc.v2(this.node.x, this.node.y));
            let position = event.touch.getLocation();
            cc.log("position" + position.x, position.y);
            cc.log("nodeWorldPos" + nodeWorldPos.x, nodeWorldPos.y);

            this.move(cc.v2(position.x - nodeWorldPos.x, position.y - nodeWorldPos.y));
        }, node);

        node.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.touchBegin = false
        }, node);
    }




    //     this.flower.play();

    //     this.arrow.node.on(cc.Node.EventType.TOUCH_START, (event) => {
    //         this.touchBegin = true
    //         //this.userGraphics.getComponent("userGraphics").moveTo(event.touch.getLocation());
    //     }, this.arrow);

    //     this.arrow.node.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
    //         if (!this.touchBegin) {
    //             return true;
    //         }

    //         var touchPos = this.arrow.node.parent.convertToNodeSpaceAR(event.touch.getLocation());

    //         //移动位置
    //         if(!this.arrow.node.parent.getBoundingBox().contains(touchPos))
    //         {
    //             //this.touchBegin = false;
    //             return true;
    //         }
    //         var originalPos = this.arrow.node.getPosition();
    //         this.arrow.node.position = touchPos;

    //         //旋转角度
    //         var p1 = touchPos;
    //         var p2 = originalPos;
    //         //var  angle: number  = Math.atan2((p2.y-p1.y), (p2.x-p1.x))  //弧度  0.6435011087932844
    //         //var  theta: number  = angle*( 180 /Math.PI);  //角度  36.86989764584402
    //         //var  angle: number  = Math.atan2( (p1.y-p2.y) , (p2.x-p1.x))  //弧度 -0.6435011087932844, 即 2*Math.PI - 0.6435011087932844
    //         //var  theta: number  = angle*( 180 /Math.PI);   //角度 -36.86989764584402，即360 - 36.86989764584402 = 323.13010235415598
    //         var  angle: number  = Math.atan2((p2.x - p1.x), (p2.y - p1.y))  //弧度  0.9272952180016122
    //         var  theta: number  = angle*( 180 /Math.PI);  //角度  53.13010235415598
    //         this.arrow.node.rotation = theta;

    //         //同步绘画层
    //         //this.userGraphics.getComponent("userGraphics").lineTo(this.node.parent.convertToWorldSpaceAR(touchPos));
    //     }, this.arrow.node);

    //     this.arrow.node.on(cc.Node.EventType.TOUCH_END, (event) => {
    //         this.touchBegin = false
    //     }, this.arrow.node);

    // }

     //箭头复原动画
     interruptAnm(position) {
        let action = cc.sequence(
            cc.moveBy(0.2, position.x, position.y),
            cc.moveBy(0.2, -position.x, -position.y)
        );
        this.node.runAction(action);
    }

    //获取描摹过程中，箭头要跟着轨迹旋转的角度let
    getAngle(x1, y1, x2, y2) {
        // 直角的边长
        let x = Math.abs(x1 - x2);
        let y = Math.abs(y1 - y2);
        let z = Math.sqrt(x * x + y * y);
        let angle = Math.round((Math.asin(y / z) / Math.PI * 180));


        if (y2 > y1 && x2 < x1) {
            angle = 180 - angle
        } else if (y2 < y1 && x2 < x1) {
            angle = 180 + angle
        } else if (y2 < y1 && x2 > x1) {
            angle = 360 - angle
        }
        return angle;
    }

    //根据轨迹坐标点描摹
    move(position) {
        if (this.gameOver) {
            cc.log("游戏已经结束，顺利的描摹出来2了 !!!");
            return
        }
        let dx = position.x + this.node.x;
        let dy = position.y + this.node.y;

        let node_d = (position.x) * (position.x) + (position.y) * (position.y)
        if (node_d > 120 * 120) {
            cc.log(" Beyond the scope Beyond the scope Beyond the scope ")
            this.interruptAnm(position);
            this.touchBegin = false;
            return
        }

        let range = 20;
        let distance = 80;
        let max = this.arrIndex + range;
        if (max >= this.arr.length) {
            // this.touchBegin = false
            // this.gameOver = true
            // cc.log("game over ")
            // return
            max = this.arr.length
        }
        for (let index = this.arrIndex; index < max; index++) {
            // let index = max
            const element = this.arr[index];
            // cc.log("index  "+index)
            let d = (dx - element.x) * (dx - element.x) + (dy - element.y) * (dy - element.y)
            if (d < distance * distance) {
                this.userDarw.getComponent('mmGraphics').setPos(index);
                this.arrIndex = index;
                this.node.x = element.x;
                this.node.y = element.y;

                if (index === this.arr.length - 1) {
                    this.drawEnd()
                } else {
                    let angle = this.getAngle(this.arr[index].x, this.arr[index].y, this.arr[index + 1].x, this.arr[index + 1].y);
                    this.node.rotation = -angle;
                }
            }
        }
    }

    //描摹完成
    drawEnd() {
        this.touchBegin = false;
        this.gameOver = true;

        this.scheduleOnce(() => {

            this.userDarw.getComponent('mmGraphics').clearDraw();

            this.gameOver = false;
            this.arrIndex = 0;
            this.initAngle()


        }, 2);
    }

}
