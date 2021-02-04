// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import userData from "../userData";

@ccclass
export default class babyXieZiMuGame extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}


    onButtonEventReturn(event, customEventData)
    {
        this.gameOver(false);
    }

    onButtonEventVictory(event, customEventData)
    {
        this.gameOver(true);
    }

    gameOver(isVictory: boolean)
    {
        if(isVictory)
        {
            userData.unlockGameLevel()
        }
        cc.director.loadScene("gameLevel");
    }
}
