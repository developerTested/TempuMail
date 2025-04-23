import { Redis } from "@upstash/redis";
import dotenv from "dotenv"

dotenv.config();

// const client = createClient({
//   username: process.env.REDIS_USERNAME || 'default',
//   password: process.env.REDIS_PASSWORD,
//   socket: {
//     host: process.env.REDIS_HOST || "",
//     port: process.env.REDIS_PORT || 10648,
//   }
// });


// try {
//   await client.connect();
//   client.on('error', err => console.log('Redis Client Error', err));
// } catch (error) {
//   console.error(error);

// }

let redis;

try {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

} catch (error) {
  console.error(error);

  process.exit(1);
}

export default redis;