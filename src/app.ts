import express from "express";
import router from "./routes/index.js";
import { connectDatabase } from "./config/database.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", router);

async function startServer() {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});

export default app;
