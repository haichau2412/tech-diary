export type Status = "online" | "offline" | "busy";

export interface ApiResponse {
  status: Status;
  lastSeen?: number;
}
