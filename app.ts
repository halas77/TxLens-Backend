import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tnxRoutes from "./routes/tnx.r";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tx-data", tnxRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
