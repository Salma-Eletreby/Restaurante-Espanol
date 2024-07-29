import GameRepo from "./game/game-repo.js"
const repo = new GameRepo()

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const data = await repo.getGameData();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch game data' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}