import Redis from "ioredis";
import express from "express";
import emailRouter from "./routes/emailr.js";
const redis = new Redis();

async function testRadis() {
  await redis.set("testkey", "Hello from radis ", "EX", 120);
  const value = await redis.get("testkey");
  console.log("Radis value :", value);
}

const app = express();
const port = 3000;
app.use("/api/email", emailRouter);

app.listen(port, () => console.log(`server running port ${port}`));
testRadis();

//
