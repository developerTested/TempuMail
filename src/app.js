import dotenv from "dotenv";
dotenv.config();

import express from "express";
import emailRouter from "./routes/emailr.js";
import redis from "./db/Redis.js";

async function testRadis() {
  try {
    await redis.set("testkey", "Hello from unstap radis ", { ex: 120 });
    const value = await redis.get("testkey");
    console.log("Radis value :", value);
  } catch (error) {
    console.error("Upstash Test Failed:", error);
  }
}

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
const port = process.env.PORT || 3001;
app.use("/api", emailRouter);

app.listen(port, () => console.log(`server running port ${port}`));
testRadis();

//
