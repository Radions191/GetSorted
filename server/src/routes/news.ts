
import { Router } from "express";
import axios from "axios";

const router = Router();

const NEWS_API = "https://hacker-news.firebaseio.com/v0";

router.get("/", async (req, res) => {
  try {
    const offset = Math.max(0, Number(req.query.offset) || 0);
    const limit = Math.min(
      30,
      Math.max(1, Number(req.query.limit) || 10)
    );

    // Get IDs of popular news stories
    const idsResponse = await axios.get(
      `${NEWS_API}/topstories.json`
    );

    const ids: number[] = idsResponse.data.slice(
      offset,
      offset + limit
    );

    // Get details for each news story
    const news = await Promise.all(
      ids.map(async (id) => {
        const response = await axios.get(
          `${NEWS_API}/item/${id}.json`
        );

        return response.data;
      })
    );

    res.json(news.filter(Boolean));
  } catch (error) {
    console.error("News API error:", error);

    res.status(500).json({
      error: "Failed to fetch news",
    });
  }
});

export default router;
