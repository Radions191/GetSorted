import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import screenRoutes from "./routes/screens";
import driftsmeldingerRoutes from "./routes/driftsmeldinger";
import newsRoutes from "./routes/news";
import articlesRoutes from "./routes/articles";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api/news", newsRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/screens", screenRoutes);
app.use("/api/driftsmeldinger", driftsmeldingerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
