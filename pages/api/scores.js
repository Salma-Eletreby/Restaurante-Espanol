import ScoreRepo from "./score/score-repo.js";
const repo = new ScoreRepo();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await repo.getScores();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch score data" });
    }
  } else if (req.method === "POST") {
    try {
      const requestData = req.body;
      await repo.addScore(requestData);
      res.status(201).json({ message: "Data saved successfully" });
    } catch (error) {
      res.status(500).json({ error: `${error}` });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
