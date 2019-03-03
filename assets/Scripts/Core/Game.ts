import GameScene from "../Scenes/GameScene";

export default class Game {

    private _gameScene: GameScene = null

    private _score: number = 0
    private _balloonFlyTimeMin: number = 1
    private _balloonFlyTimeMax: number = 4
    private _balloonHitCount: number = 1
    private _isGame: boolean = false

    public get gameScene() { return this._gameScene }
    public set gameScene(gameScene) { this._gameScene = gameScene }

    public get isGame() { return this._isGame }
    public get balloonFlyTimeMax() { return this._balloonFlyTimeMin }
    public get balloonFlyTimeMin() { return this._balloonFlyTimeMax }
    public get balloonHitCount() { return this._balloonHitCount }

    startGame() {
        this._isGame = false
        this._score = 0
        this._balloonFlyTimeMin = 1
        this._balloonFlyTimeMax = 4
        this._balloonHitCount = 1
        this._gameScene.updateScoreLabel(this._score)
        this.runGenerator()
        this._gameScene.balloonsParent.removeAllChildren()
    }

    addScore() {
        this._gameScene.updateScoreLabel(++this._score)
    }

    endGame() {
        if (!this._isGame) {
            this._isGame = true
            this._gameScene.showFinish(this._score)
            this._gameScene.balloonsParent.removeAllChildren()          
        }
    }

    private runGenerator() {
        //генератор шаров
        this._gameScene.schedule(this._gameScene.createBalloon, (Math.random()* (1 - 0.5)) + 0.5)
    }
}
