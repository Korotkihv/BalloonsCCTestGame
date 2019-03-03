interface RecordsData {
    name: string
    score: number
}

export default class GameData {

    recordItemCount: number = 20
    data: RecordsData[] = []

    constructor() {
        this.data = JSON.parse(cc.sys.localStorage.getItem('RecordsData'))
        if (this.data == null) { this.firstInit() }
    }

    public save() { cc.sys.localStorage.setItem('RecordsData', JSON.stringify(this.data)); }

    public checkScore(value) { return value > this.data[this.recordItemCount - 1].score }

    public newRecord(name, score) {
        this.data[this.recordItemCount - 1] = { name: name, score: score }
        this.data = this.data.sort((res1, res2) => res2.score - res1.score)
        this.save()
    }
    private firstInit() {
        this.data = new Array(this.recordItemCount).fill({name: "No Name", score: 0})
        this.save()
    }
}