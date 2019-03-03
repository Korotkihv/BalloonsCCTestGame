import Balloon from "../Core/Balloon";
import MainController from "../Controllers/MainController";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {

    @property(cc.Prefab) balloonPrefab: cc.Prefab = null
    @property(cc.Node) balloonsParent: cc.Node = null
    @property(cc.Label) scoreText: cc.Label = null

    private timer: number = 0;
    private speed: number = 0;

    onLoad() {

        MainController.game.gameScene = this
        MainController.game.startGame()
    }

    createBalloon(dt) {  

        this.timer += dt;
        
        if (!MainController.game.isGame) {
            this.timer = 0
            
            let screenWidth = cc.winSize.width
            let screenHeight = cc.winSize.height
            let badBalloon = Math.random() >= 0.9

            let balloon = cc.instantiate(this.balloonPrefab)
            badBalloon && (balloon.getComponent(Balloon).isBad = true)
            balloon.parent = this.balloonsParent

            let balloonPositionX = Math.floor(Math.random() * (screenWidth - balloon.width)) - screenWidth / 2 + balloon.width / 2
            balloon.setPosition(balloonPositionX, -screenHeight / 2 - balloon.height)


            if (Math.random() >= 0.7){
                if (MainController.game.balloonFlyTimeMax - Math.sqrt(this.timer) * 5 >= MainController.game.balloonFlyTimeMax){
                    this.speed = MainController.game.balloonFlyTimeMax - Math.sqrt(this.timer) * 5
                }
            }
            else {
                 this.speed = 2
            }

            let move = cc.moveTo(this.speed, balloonPositionX, screenHeight - balloon.height)
            let remove = cc.removeSelf()
            let finish = cc.callFunc(() => !badBalloon && MainController.game.endGame())
            let seq = cc.sequence(move, finish, remove)
            balloon.runAction(seq)
        }
    }

    public updateScoreLabel(score) {
        this.scoreText.string = "Score : " + score
    }

    public showFinish(score) {
        MainController.dialogsController.openDialog("FinishDialog", score)
    }

    openPauseDialog() {
        MainController.dialogsController.openDialog("PauseDialog")
    }
}
