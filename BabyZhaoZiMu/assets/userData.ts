// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//全局变量
var unlockedGameLevelKey: string = "unlockedGameLevelKey";

class userData{
    //最大游戏关卡
    public maxGameLevel: number = 0;
    //已解锁的游戏关卡
    public unlockedGameLevel: number = 0;
    //是否有解锁动作
    public isUnlockAction: boolean = false;
    //当前选择的关卡
    public currentGameLevel: number = 0;

    //加载用户数据
    public loadUserData(maxGameLevel: number)
    {
        this.maxGameLevel = maxGameLevel;
        var unlockedGameLevel: number = cc.sys.localStorage.getItem(unlockedGameLevelKey)
        if(unlockedGameLevel)
        {
            unlockedGameLevel = Number(unlockedGameLevel);
            if(unlockedGameLevel <= 0 || unlockedGameLevel > this.maxGameLevel)
            {
                unlockedGameLevel = 1;
            }
        }else
        {
            unlockedGameLevel = 1;
        }
        this.unlockedGameLevel = unlockedGameLevel;
        if(this.currentGameLevel == 0)
        {
            this.currentGameLevel = this.unlockedGameLevel;
        }
    }

    //重置用户数据
    public resetUserData()
    {
        this.maxGameLevel = 0;
        this.unlockedGameLevel = 0;
        cc.sys.localStorage.removeItem(unlockedGameLevelKey)
        this.isUnlockAction = false;
        this.currentGameLevel = 0;
    }

    //解锁关卡
    public unlockGameLevel(): number
    {
        if(this.currentGameLevel <= 0) return 0;
        if(this.currentGameLevel > this.maxGameLevel) return 0;
        if(this.currentGameLevel != this.unlockedGameLevel) return 0;
        
        cc.sys.localStorage.setItem(unlockedGameLevelKey, ++this.unlockedGameLevel)
        this.isUnlockAction = true;

        return this.unlockedGameLevel;
    }
}

export default new userData();
