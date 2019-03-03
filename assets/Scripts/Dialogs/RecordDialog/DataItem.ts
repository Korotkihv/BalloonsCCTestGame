
const {ccclass, property} = cc._decorator;

@ccclass
export default class DataItem extends cc.Component {

    @property(cc.Label)
    idLabel: cc.Label = null;
    @property(cc.Label)
    nameLabel: cc.Label = null; 
     @property(cc.Label)
    scoreLabel: cc.Label = null;
    
    init(id,name,score)
    {
        this.idLabel.string = id + "."
        this.nameLabel.string = name
        this.scoreLabel.string = score + ""
    }
}
