import MainController from "../Controllers/MainController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Balloon extends cc.Component {
    @property(cc.SpriteFrame) badBallon: cc.SpriteFrame = null
    isBad = false
    onLoad() {
        this.isBad && (this.node.getComponent(cc.Sprite).spriteFrame = this.badBallon)
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.node.stopAllActions()
            this.node.getComponent(cc.Animation).enabled = false

            let deathTime = 0.25                
            let position = this.node.getPosition()
            let winSize = cc.winSize
            let xDirection = position.x > 0 ? 1 : -1
            let yDirection = Math.random() > 0.5 ? -1 : 1
            let yEnd = position.y + this.node.height / 4 * yDirection

            let points = new Array(
                cc.p(position),
                cc.p(xDirection * (winSize.width / 2 - Math.abs(position.x)), yEnd),
                cc.p(xDirection * winSize.width / 2, yEnd))

            let bezier = cc.bezierTo(deathTime, points).easing(cc.easeOut(3))
            let rotate = cc.rotateBy(deathTime, xDirection * yDirection * 15).easing(cc.easeOut(3))
            let destroy = cc.callFunc(() => this.node.destroy())
            let scale = cc.scaleTo(deathTime, 0.0, 0)
            let seq = cc.sequence(cc.spawn(scale, bezier, rotate), destroy)
            this.node.runAction(seq)
            
            this.isBad ? MainController.game.endGame() : MainController.game.addScore()
        }, this)
    }
}
