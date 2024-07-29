import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'

export default class GameRepo {
    constructor() {
        this.path = path.join(process.cwd(), 'pages/data/spanishFood.json')
    }

    async getGameData(type) {
        const data = await fs.readJSON(this.path)
        return data;
    }
}