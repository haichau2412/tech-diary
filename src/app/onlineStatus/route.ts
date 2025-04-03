import Redis from "ioredis";
import { ApiResponse, Status } from "./type";
const _secret = `${process.env.NEXT_PUBLIC_ONLINE_SECRET}`;

const client = new Redis({
  username: "default",
  password: `${process.env.NEXT_PUBLIC_REDIS_PASSWORD}`,
  host: "redis-18938.c244.us-east-1-2.ec2.redns.redis-cloud.com",
  port: 18938,
});

client.on("error", (err) => console.log("Redis Client Error", err));

let _status: Status =
  ((await client.get("onlineStatus")) as Status) || "offline";
const lastSeenAsStr = (await client.get("lastSeen")) ?? "0";

let _lastSeen: number = parseInt(lastSeenAsStr);

const createStr = () => {
  const data: ApiResponse = {
    status: _status,
  };
  if (_lastSeen > 0) {
    data.lastSeen = _lastSeen;
  }
  return JSON.stringify(data);
};

export async function GET() {
  return new Response(createStr(), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  console.log("POST request received");

  const body = await request.json();
  const { secretCode, status } = body;

  if (_secret === secretCode) {
    _status = status ?? "online";
    if (_status === "offline") {
      _lastSeen = Date.now();
      await client.set("lastSeen", _lastSeen);
    }
  }
  await client.set("onlineStatus", _status);
  return new Response(createStr(), {
    headers: { "Content-Type": "application/json" },
  });
}
