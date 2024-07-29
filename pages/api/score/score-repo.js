import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'

export default class GameRepo {
    constructor() {
        this.path = path.join(process.cwd(), 'pages/data/scores.json')
    }

    async getScores(type) {
        const data = await fs.readJSON(this.path)
        return data;
    }

    async addScore(score) {
        const scores = await this.getScores()
        scores.push(score)
        await fs.writeJSON(this.path, scores)
        return score
    }
}