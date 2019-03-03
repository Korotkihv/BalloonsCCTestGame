const { ccclass, property } = cc._decorator;

@ccclass
export default class Dialog extends cc.Component {

    openDialog(cb) {
        let fadeIn = cc.fadeIn(0.2)
        this.node.runAction(fadeIn)
        cb(this)
    }

    closeDialog() {
        var fadeOut = cc.fadeOut(0.15)
        let remove = cc.removeSelf()
        let seq = cc.sequence(fadeOut, remove)
        this.node.runAction(seq)
    }
}
