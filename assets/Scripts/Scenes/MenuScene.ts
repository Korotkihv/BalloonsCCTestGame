import MainController from "../Controllers/MainController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MenuScene extends cc.Component {

    playBtnClick() {
        cc.director.loadScene("Game")
    }

    openSettingsDialog() {
        MainController.dialogsController.openDialog("SettingsDialog")
    }

    openRecordsDialog() {
        MainController.dialogsController.openDialog("RecordsDialog")
    }
}
