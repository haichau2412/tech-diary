import { getWithCredential, postWithCredential } from "@/utils/fetcher";

type TokenValidateRes =
  | {
      status: 200;
      message: "succeed";
      data: {
        expiredAt: number;
      };
    }
  | {
      status: 401;
      message: "unauthorized";
    };

export const validateToken = async () => {
  return getWithCredential<TokenValidateRes>(
    `${process.env.NEXT_PUBLIC_BE_ORIGIN}/auth/validate`,
  );
};

export const handleGoogleLogin = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_BE_ORIGIN}/auth/google`;
};

export const handleLogout = () => {
  return postWithCredential<{ status: 200 }>(
    `${process.env.NEXT_PUBLIC_BE_ORIGIN}/logout`,
  );
};
