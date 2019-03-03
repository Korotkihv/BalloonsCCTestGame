import Game from "../Core/Game";
import GameData from "../Core/GameData";
import DialogsController from "./DialogsController";

export default class MainController {

    private static _instance: MainController = null;
    
    public static get instance() { 
        return this._instance || (this._instance = new this()) 
    }

    private _game = new Game()
    static get game() { 
        return this.instance._game 
    }

    private _gameData = new GameData()
    static get gameData() { 
        return this.instance._gameData 
    }

    private _dialogsController = new DialogsController()
    static get dialogsController() { 
        return this.instance._dialogsController }
}
