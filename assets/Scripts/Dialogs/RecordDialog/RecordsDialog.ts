import DataItem from "./DataItem";
import Dialog from "../Dialog";
import MainController from "../../Controllers/MainController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RecordsDialog extends Dialog {

    @property(cc.Prefab) item: cc.Prefab = null
    @property(cc.Node) content: cc.Node = null
    private dataItems: DataItem[] = []

    onLoad() {
        let gameData = MainController.gameData
        gameData.data.forEach((v, i) => {
            var newItem = cc.instantiate(this.item)
            this.content.addChild(newItem)
            newItem.getComponent(DataItem).init(i + 1, v.name, v.score)
            this.dataItems.push(newItem.getComponent(DataItem))
        })
    }

}
