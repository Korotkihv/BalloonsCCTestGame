export default class DialogsController {

    openDialog(type: string, ...parameter) {
        cc.loader.loadRes("Prefabs/Dialogs/" + type, (err, prefab) => {
            let dialog = cc.instantiate(prefab)
            cc.director.getScene().addChild(dialog)
            
            let cb = (type == "FinishDialog") ? (d) => d.getComponent(type).setScore(parameter) : () => { }
            dialog.getComponent(type).openDialog(cb)
        });
    }




}