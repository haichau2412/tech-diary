type Role = "guest" | "admin" | "user";

export interface NormalUser {
  id: string;
  username: string;
  email: string;
  name: string;
  role: Role;
}

export interface Guest extends Omit<NormalUser, "profile"> {
  role: "guest";
  expiresAt?: number;
}

export type User = NormalUser | Guest;
