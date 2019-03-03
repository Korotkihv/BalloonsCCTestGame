import Dialog from "./Dialog";
import MainController from "../Controllers/MainController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PauseDialog extends Dialog {

    openDialog(cb = null) {
        let open = cc.callFunc(() => super.openDialog(cb))
        let pause = cc.callFunc(() => cc.game.pause())
        let seq = cc.sequence(open, cc.delayTime(0.2), pause)
        this.node.runAction(seq)
    }

    menuBtn() {
        cc.director.loadScene("Menu")
        cc.game.resume()
    }
    resumeBtn() {
        cc.game.resume()
        this.closeDialog()
    }
    restartBtn() {
        cc.game.resume()
        MainController.game.startGame()
        this.closeDialog()
    }
}
