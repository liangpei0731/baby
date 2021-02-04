// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class draw extends cc.Component {

    //描摹资源
    @property(cc.Prefab)
    mapRes:cc.Prefab = null;

    //临摹路径
    road_data_set: any[] = [];

    //描摹背景
    @property(cc.Graphics)
    bgGraphics: cc.Graphics = null;

    //绘画层
    @property(cc.Graphics)
    drawGraphics: cc.Graphics = null;

    //箭头
    @property(cc.Sprite)
    arrowSprite: cc.Sprite = null;
    
    //正在绘制
    is
    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        //加载地图数据
        this.loadingMapData();
        
        //初始化箭头
        this.arrowSprite.node.active = false;
        //this.miaoMoPaths[2] = [{"x":26,"y":45}];// ;;= [{x:26,y:287},{x:30,y:50}];
        //this.paths[2] = [{"x":26,"y":287},{"x":26,"y":287},{"x":29.82,"y":319.15},{"x":33.18,"y":332.37},{"x":34.7,"y":337.19},{"x":37.35,"y":344.55},{"x":38.34,"y":347.02},{"x":44.76,"y":360.52},{"x":48.43,"y":366.77},{"x":52.16,"y":372.35},{"x":57.72,"y":379.49},{"x":60.9,"y":383.08},{"x":62.23,"y":384.48},{"x":66.65,"y":388.78},{"x":68.13,"y":390.1},{"x":70.37,"y":392},{"x":72.83,"y":393.96},{"x":76.27,"y":396.49},{"x":79.19,"y":398.46},{"x":82.19,"y":400.33},{"x":85.58,"y":402.25},{"x":89.87,"y":404.45},{"x":93.25,"y":406},{"x":96.9,"y":407.5},{"x":100.9,"y":408.97},{"x":105.04,"y":410.3},{"x":109.52,"y":411.53},{"x":113.86,"y":412.55},{"x":118.55,"y":413.45},{"x":123.86,"y":414.25},{"x":128.12,"y":414.73},{"x":132.74,"y":415.09},{"x":143.79,"y":415.17},{"x":150.38,"y":414.66},{"x":152.7,"y":414.38},{"x":155.15,"y":414.02},{"x":163.86,"y":412.19},{"x":174.63,"y":408.59},{"x":177.88,"y":407.17},{"x":181.39,"y":405.44},{"x":186.88,"y":402.28},{"x":195.23,"y":396.22},{"x":199.49,"y":392.42},{"x":205.49,"y":386},{"x":208.55,"y":382.13},{"x":215.56,"y":370.97},{"x":217.27,"y":367.54},{"x":218.88,"y":363.94},{"x":220.18,"y":360.7},{"x":221.35,"y":357.44},{"x":222.47,"y":353.88},{"x":223.53,"y":350.02},{"x":224.37,"y":346.43},{"x":225.1,"y":342.69},{"x":225.68,"y":338.98},{"x":226.16,"y":335.01},{"x":226.47,"y":331.21},{"x":226.66,"y":327.32},{"x":226.71,"y":323.16},{"x":226.63,"y":319.43},{"x":226.41,"y":315.43},{"x":226.01,"y":311.12},{"x":225.51,"y":307.2},{"x":224.87,"y":303.24},{"x":224.05,"y":299.06},{"x":223.11,"y":294.97},{"x":221.94,"y":290.63},{"x":220.71,"y":286.62},{"x":219.36,"y":282.66},{"x":217.86,"y":278.71},{"x":216.09,"y":274.46},{"x":214.24,"y":270.43},{"x":212.31,"y":266.56},{"x":210.12,"y":262.5},{"x":207.88,"y":258.67},{"x":205.33,"y":254.61},{"x":202.79,"y":250.85},{"x":200.09,"y":247.11},{"x":197.02,"y":243.03},{"x":194.26,"y":239.38},{"x":191.24,"y":235.39},{"x":188,"y":231.14},{"x":184.88,"y":227.06},{"x":181.67,"y":222.87},{"x":178.43,"y":218.65},{"x":174.4,"y":213.43},{"x":171.71,"y":209.94},{"x":168.33,"y":205.58},{"x":164.78,"y":201.01},{"x":161.22,"y":196.44},{"x":157.59,"y":191.79},{"x":154.15,"y":187.38},{"x":150.75,"y":183.04},{"x":142.35,"y":172.36},{"x":138.7,"y":167.72},{"x":135.12,"y":163.17},{"x":131.55,"y":158.66},{"x":127.95,"y":154.11},{"x":124.36,"y":149.58},{"x":120.8,"y":145.1},{"x":117.29,"y":140.67},{"x":113.71,"y":136.17},{"x":110.23,"y":131.79},{"x":106.71,"y":127.38},{"x":103.3,"y":123.1},{"x":99.92,"y":118.87},{"x":96.57,"y":114.68},{"x":93.36,"y":110.67},{"x":90.05,"y":106.54},{"x":86.88,"y":102.57},{"x":83.67,"y":98.58},{"x":80.57,"y":94.71},{"x":77.65,"y":91.08},{"x":74.71,"y":87.42},{"x":71.75,"y":83.75},{"x":69.13,"y":80.49},{"x":66.47,"y":77.19},{"x":63.93,"y":74.03},{"x":61.44,"y":70.95},{"x":58.83,"y":67.72},{"x":56.71,"y":65.09},{"x":54.52,"y":62.38},{"x":52.57,"y":59.98},{"x":50.6,"y":57.53},{"x":48.77,"y":55.28},{"x":47.12,"y":53.24},{"x":45.56,"y":51.32},{"x":44.07,"y":49.48},{"x":42.82,"y":47.93},{"x":41.7,"y":46.55},{"x":40.7,"y":45.32},{"x":39.83,"y":44.26},{"x":39.15,"y":43.41},{"x":38.59,"y":42.72},{"x":38.24,"y":42.29},{"x":38.04,"y":42.05},{"x":38,"y":42},{"x":37.99,"y":41.98},{"x":37.97,"y":41.93},{"x":37.93,"y":41.86},{"x":37.88,"y":41.76},{"x":37.83,"y":41.64},{"x":37.77,"y":41.5},{"x":37.7,"y":41.34},{"x":37.62,"y":41.16},{"x":37.54,"y":40.96},{"x":37.45,"y":40.74},{"x":37.36,"y":40.51},{"x":37.26,"y":40.24},{"x":37.16,"y":39.97},{"x":37.07,"y":39.69},{"x":36.97,"y":39.4},{"x":36.87,"y":39.08},{"x":36.77,"y":38.77},{"x":36.67,"y":38.43},{"x":36.58,"y":38.08},{"x":36.49,"y":37.74},{"x":36.4,"y":37.37},{"x":36.32,"y":36.99},{"x":36.25,"y":36.62},{"x":36.19,"y":36.24},{"x":36.13,"y":35.85},{"x":36.08,"y":35.46},{"x":36.04,"y":35.06},{"x":36.02,"y":34.66},{"x":36,"y":34.24},{"x":36,"y":33.87},{"x":36.01,"y":33.47},{"x":36.04,"y":33.06},{"x":36.08,"y":32.67},{"x":36.14,"y":32.27},{"x":36.21,"y":31.89},{"x":36.31,"y":31.48},{"x":36.42,"y":31.12},{"x":36.55,"y":30.75},{"x":36.7,"y":30.38},{"x":36.88,"y":30.03},{"x":37.07,"y":29.68},{"x":37.3,"y":29.34},{"x":37.54,"y":29.01},{"x":37.81,"y":28.7},{"x":38.12,"y":28.39},{"x":38.43,"y":28.11},{"x":38.78,"y":27.83},{"x":39.16,"y":27.57},{"x":39.57,"y":27.33},{"x":40,"y":27.11},{"x":40.49,"y":26.9},{"x":40.99,"y":26.71},{"x":41.53,"y":26.54},{"x":42.08,"y":26.4},{"x":42.71,"y":26.27},{"x":43.36,"y":26.17},{"x":44.03,"y":26.09},{"x":44.73,"y":26.04},{"x":45.49,"y":26.01},{"x":46.32,"y":26},{"x":47.34,"y":26},{"x":48.6,"y":26},{"x":50.12,"y":26},{"x":51.86,"y":26},{"x":53.85,"y":26},{"x":55.97,"y":26},{"x":58.3,"y":26},{"x":60.88,"y":26},{"x":63.77,"y":26},{"x":67.03,"y":26},{"x":69.84,"y":26},{"x":73.2,"y":26},{"x":76.55,"y":26},{"x":80.03,"y":26},{"x":83.7,"y":26},{"x":87.29,"y":26},{"x":91.78,"y":26},{"x":95.16,"y":26},{"x":99.45,"y":26},{"x":103.5,"y":26},{"x":107.94,"y":26},{"x":112.12,"y":26},{"x":116.42,"y":26},{"x":120.68,"y":26},{"x":125.67,"y":26},{"x":129.78,"y":26},{"x":134.18,"y":26},{"x":138.94,"y":26},{"x":143.27,"y":26},{"x":147.89,"y":26},{"x":152.33,"y":26},{"x":156.61,"y":26},{"x":161.36,"y":26},{"x":165.79,"y":26},{"x":169.94,"y":26},{"x":174.14,"y":26},{"x":178.56,"y":26},{"x":182.43,"y":26},{"x":186.31,"y":26},{"x":190.5,"y":26},{"x":194.05,"y":26},{"x":198.26,"y":26},{"x":201.95,"y":26},{"x":204.92,"y":26},{"x":208.06,"y":26},{"x":211.39,"y":26},{"x":214.21,"y":26},{"x":217.2,"y":26},{"x":219.86,"y":26},{"x":222.18,"y":26},{"x":224.46,"y":26},{"x":226.53,"y":26},{"x":228.26,"y":26},{"x":229.87,"y":26},{"x":231.16,"y":26},{"x":232.27,"y":26},{"x":233.13,"y":26},{"x":233.67,"y":26},{"x":233.96,"y":26}];

    }

    start () {
        
        // var map = cc.instantiate(this.map);
        // this.node.addChild(map);
        // this.
        // var rot_set = this.map.currentClip.curveData;//;.get_road_set();
        // cc.log(rot_set);
        //this.road_data = rot_set;


        // this.bgGraphics.moveTo(30,30);
        // this.bgGraphics.lineTo(50,50);

        // if(this.miaoMoPaths.length <= 0)
        // {
        //     return;
        // }

        // cc.log(this.miaoMoPaths);

        // //自动在背景层描摹
        // //this.bgGraphics.moveTo(this.miaoMoPaths[0].x, this.miaoMoPaths[0].y);
        // this.bgGraphics.lineTo(this.miaoMoPaths[0].x, this.miaoMoPaths[0].y);
        // // for(var i = 1; i < this.miaoMoPaths.length; i++)
        // // {   
        // //     this.bgGraphics.lineTo(this.miaoMoPaths[i].x, this.miaoMoPaths[i].y);
        // //     this.bgGraphics.stroke();
        // // }

        // cc.log("成功");
        // this.bgGraphics.stroke();
        // this.bgGraphics.fill();
    }

    //update (dt) {}

    loadingMapData()
    {
        //加载地图节点
        var map = cc.instantiate(this.mapRes);
        this.node.addChild(map);
        var animation = map.getComponent(cc.Animation);
        var clips = animation.getClips();
        cc.log(clips);

        //获取路径
        //var paths:any[][] = [];
        for (const clipIndex in clips) {
            if (Object.prototype.hasOwnProperty.call(clips, clipIndex)) {   
                const clip = clips[clipIndex];
                //if(clip.name != "map2_1_2") continue;
                cc.log("动画%s路径：",clip.name); 
                for (const pathIndex in clip.curveData.paths) {
                    if (Object.prototype.hasOwnProperty.call(clip.curveData.paths, pathIndex)) {
                        const position = clip.curveData.paths[pathIndex].props.position;
                        if(position[0].motionPath)
                        {
                            this.gen_path_data(position);
                        }else{
                            
                        }
                        
                        // var startPos = this.bgGraphics.node.parent.convertToNodeSpaceAR(map.convertToWorldSpaceAR(new cc.Vec2(position[0].value[0],position[0].value[1])));
                        // var endPos = this.bgGraphics.node.parent.convertToNodeSpaceAR(map.convertToWorldSpaceAR(new cc.Vec2(position[1].value[0],position[1].value[1])));
                        // cc.log("起始坐标：",startPos.x,startPos.y);  
                        // cc.log("结束坐标：",endPos.x,endPos.y);  
                        // this.bgGraphics.moveTo(position[0].value[0],position[0].value[1]);
                        // if(position[0].motionPath)
                        // {
                        //     //获取贝塞尔曲线路径点
                        //     for (let motionPathIndex = 0; motionPathIndex < position[0].motionPath.length; motionPathIndex++) {
                        //         const arr = position[0].motionPath[motionPathIndex];
                        //         var bezierPos1 = this.bgGraphics.node.parent.convertToNodeSpaceAR(map.convertToWorldSpaceAR(new cc.Vec2(arr[0],arr[1])));
                        //         var bezierPos2 = this.bgGraphics.node.parent.convertToNodeSpaceAR(map.convertToWorldSpaceAR(new cc.Vec2(arr[2],arr[3])));
                        //         var bezierPos3 = this.bgGraphics.node.parent.convertToNodeSpaceAR(map.convertToWorldSpaceAR(new cc.Vec2(arr[4],arr[5])));
                        //         cc.log("贝塞尔点1：",bezierPos1.x,bezierPos1.y,"贝塞尔点2：",bezierPos2.x,bezierPos2.y,"贝塞尔点3：",bezierPos3.x,bezierPos3.y);     
                        //         this.bgGraphics.lineTo(bezierPos1.x,bezierPos1.y);
                        //         this.bgGraphics.lineTo(bezierPos2.x,bezierPos2.y);
                        //         this.bgGraphics.lineTo(bezierPos3.x,bezierPos3.y);              
                        //     } 
                        // }else
                        // {
                        //     //获取直线路径点
                        // }

                        // this.bgGraphics.lineTo(endPos.x,endPos.y);    
                        // this.bgGraphics.stroke();
                        //this.bgGraphics.fill();
                    }
                }
            }
        }

        cc.log("--------------------------");
        cc.log(this.road_data_set);
        for (const key in this.road_data_set) {
            if (Object.prototype.hasOwnProperty.call(this.road_data_set, key)) {
                const element = this.road_data_set[key];
                this.bgGraphics.moveTo(element[0].x,element[0].y);
                for (const key in element) {
                    if (Object.prototype.hasOwnProperty.call(element, key)) {
                        const pos = element[key];
                        this.bgGraphics.lineTo(pos.x,pos.y);
                    }
                }
                
            }
        }
        // this.bgGraphics.moveTo(this.road_data_set[0][0].x,this.road_data_set[0][0].y);
        // for (const key in this.road_data_set[0]) {
        //     if (Object.prototype.hasOwnProperty.call(this.road_data_set[0], key)) {
        //         const pos = this.road_data_set[0][key];
        //         this.bgGraphics.lineTo(pos.x,pos.y);
        //     }
        // }

        // this.bgGraphics.moveTo(0,0);
        // this.bgGraphics.lineTo(-410,155);

        this.bgGraphics.stroke();
        // for (let index = 0; index < this.road_data_set.length; index++) {
        //     const pos = this.road_data_set[index];
        //     this.bgGraphics.moveTo(this.road_data_set[0][index].x,this.road_data_set[0][index].y);
            
        // }
        // var pathIndex = 0;
        // for (let clipIndex = 0; clipIndex < clips.length; clipIndex++) {
        //     cc.log("动画clip%d路径：",clipIndex);  
        //     const clip = clips[clipIndex];
            
            
            
        // }

        // //循环播放所有的动画
        // var clipIndex = 0;
        // animation.on('finished', function(type,state)
        // {
        //     cc.log(type,state);
        //     if(clipIndex < clips.length)
        //     {
        //         animation.play(clips[clipIndex++].name);
        //     }
        // }, animation);
        // if(clipIndex < clips.length)
        // {
        //     animation.play(clips[clipIndex++].name);
        // }
    }

    get_road_set() {
        return this.road_data_set;
    }

    gen_path_data(road_data) {
        var ctrl1: cc.Vec2 = null;
        var start_point: cc.Vec2 = null;
        var end_point: cc.Vec2 = null;
        var ctrl2: cc.Vec2 = null;

        var road_curve_path = []; // [start_point, ctrl1, ctrl2, end_point],
        for (var i = 0; i < road_data.length; i++) {
            var key_frame = road_data[i];
            if (ctrl1 !== null) {
                road_curve_path.push([start_point, ctrl1, ctrl1, new cc.Vec2(key_frame.value[0], key_frame.value[1])]);
            }

            start_point = new cc.Vec2(key_frame.value[0], key_frame.value[1]);

            if(key_frame.motionPath)
            {
                for (var j = 0; j < key_frame.motionPath.length; j++) {
                    var end_point = new cc.Vec2(key_frame.motionPath[j][0], key_frame.motionPath[j][1]);
                    ctrl2 = new cc.Vec2(key_frame.motionPath[j][2], key_frame.motionPath[j][3]);
                    if (ctrl1 == null) {
                        ctrl1 = ctrl2;
                    }
                    // 贝塞尔曲线 start_point, ctrl1, ctrl2, end_point,
                    road_curve_path.push([start_point, ctrl1, ctrl2, end_point]);
                    ctrl1 = new cc.Vec2(key_frame.motionPath[j][4], key_frame.motionPath[j][5]);
                    start_point = end_point;
                }
            }
        }

        console.log(road_curve_path);

        var one_road = [road_curve_path[0][0]];

        for (var index = 0; index < road_curve_path.length; index++) {
            start_point = road_curve_path[index][0];
            ctrl1 = road_curve_path[index][1];
            ctrl2 = road_curve_path[index][2];
            end_point = road_curve_path[index][3];

            var len = this.bezier_length(start_point, ctrl1, ctrl2, end_point);
            var OFFSET = 16;
            var count = len / OFFSET;
            count = Math.floor(count);
            var t_delta = 1 / count;
            var t = t_delta;

            for (var i = 0; i < count; i++) {
                var x = start_point.x * (1 - t) * (1 - t) * (1 - t) + 3 * ctrl1.x * t * (1 - t) * (1 - t) + 3 * ctrl2.x * t * t * (1 - t) + end_point.x * t * t * t;
                var y = start_point.y * (1 - t) * (1 - t) * (1 - t) + 3 * ctrl1.y * t * (1 - t) * (1 - t) + 3 * ctrl2.y * t * t * (1 - t) + end_point.y * t * t * t;
                one_road.push(new cc.Vec2(x, y));
                t += t_delta;
            }
        }

        console.log(one_road);
        // if (this.is_debug) {
        //     this.new_draw_node.clear(); // 清除以前的

        //     for (var i = 0; i < one_road.length; i++) {
        //         this.new_draw_node.moveTo(one_road[i].x, one_road[i].y);
        //         this.new_draw_node.lineTo(one_road[i].x + 1, one_road[i].y + 1);
        //         this.new_draw_node.stroke();
        //         // this.draw_node.drawSegment(one_road[i],
        //         //     new cc.Vec2(one_road[i].x + 1, one_road[i].y + 1),
        //         //     1, cc.color(255, 0, 0, 255));
        //     }
        // }

        this.road_data_set.push(one_road);
    }

    bezier_length(start_point, ctrl1, ctrl2, end_point) 
    {
        // t [0, 1] t 分成20等分 1 / 20 = 0.05
        var prev_point = start_point;
        var length = 0;
        var t = 0.05;
        for (var i = 0; i < 20; i++) {
            var x = start_point.x * (1 - t) * (1 - t) * (1 - t) + 3 * ctrl1.x * t * (1 - t) * (1 - t) + 3 * ctrl2.x * t * t * (1 - t) + end_point.x * t * t * t;
            var y = start_point.y * (1 - t) * (1 - t) * (1 - t) + 3 * ctrl1.y * t * (1 - t) * (1 - t) + 3 * ctrl2.y * t * t * (1 - t) + end_point.y * t * t * t;
            var now_point = new cc.Vec2(x, y);
            var dir = now_point.sub(prev_point);
            prev_point = now_point;
            length += dir.mag();

            t += 0.05;
        }
        return length;
    }

}
