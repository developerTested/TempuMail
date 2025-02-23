import Radis from "ioredis";

const connectRedis = () => {
  try {
    const redis = new Radis({
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
  } catch (error) {
    console.log("redis connection failed ", error);
  }
};

export default connectRedis;
