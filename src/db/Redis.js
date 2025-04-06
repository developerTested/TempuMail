import Redis from "ioredis";

const redis = new Redis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

redis.on("connect", () => {
  console.log("connect radis successfully!");
});

redis.on("error", (err) => {
  console.error("Radis error connection error  :", err);
});

// console.log("redis connection failed ",error);

export default redis;
