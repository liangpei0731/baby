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

    @property(cc.Layout)
    gameOverNode: cc.Layout = null;

    isVictory: boolean = false;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.gameOverNode.node.active = false;
    }

    // update (dt) {}

    onButtonEventReturn(event, customEventData)
    {
        cc.director.loadScene("gameLevel");
    }

    onButtonEventVictory(event, customEventData)
    {
        if(this.isVictory) 
        {
            userData.unlockGameLevel();
        }
        cc.director.loadScene("gameLevel");
    }

    gameOver(isVictory: boolean)
    {
        this.gameOverNode.node.active = true;
        this.isVictory = isVictory;
    }
}
