type Role = "guest" | "admin" | "user";

export interface NormalUser {
  id: string;
  username: string;
  email: string;
  role: Role;
  profile?: {
    name: string;
    avatarUrl: string;
  };
}

export interface Guest extends Omit<NormalUser, "profile"> {
  role: "guest";
  expiresAt: number;
}

export type User = NormalUser | Guest;
