import Redis from "ioredis";
import express from "express";
import emailRouter from "./routes/emailr.js";

import dotenv from "dotenv";
dotenv.config();
const redis = new Redis();

async function testRadis() {
  await redis.set("testkey", "Hello from radis ", "EX", 120);
  const value = await redis.get("testkey");
  console.log("Radis value :", value);
}

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
const port = 3000;
app.use("/api", emailRouter);

app.listen(port, () => console.log(`server running port ${port}`));
testRadis();

//
