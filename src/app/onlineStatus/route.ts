import { ApiResponse, Status } from "./type";
import redis from "./redis";
const _secret = `${process.env.NEXT_PUBLIC_ONLINE_SECRET}`;

let _status: Status =
  ((await redis.get("onlineStatus")) as Status) || "offline";
const lastSeenAsStr = (await redis.get("lastSeen")) ?? "0";

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
  const body = await request.json();
  const { secretCode, status } = body;

  if (_secret === secretCode) {
    _status = status ?? "online";
    if (_status === "offline") {
      _lastSeen = Date.now();
      await redis.set("lastSeen", _lastSeen);
    }
  }
  await redis.set("onlineStatus", _status);
  return new Response(createStr(), {
    headers: { "Content-Type": "application/json" },
  });
}
