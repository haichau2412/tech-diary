import Redis from "ioredis";

const redis = new Redis({
  username: "default",
  password: `${process.env.NEXT_PUBLIC_REDIS_PASSWORD}`,
  host: "redis-18938.c244.us-east-1-2.ec2.redns.redis-cloud.com",
  port: 18938,
});

redis.on("error", (err) => console.log("Redis Client Error", err));

export default redis;
