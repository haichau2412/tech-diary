"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";

type AuthContext = {
  isAuthorized: boolean;
  onLogout: () => void;
  name: string;
};

export const AuthContext = createContext<AuthContext>({
  isAuthorized: JSON.parse(
    typeof window !== "undefined"
      ? window.sessionStorage.getItem("isAuthorized") || "false"
      : "false",
  ),
  name: "",
  onLogout: () => {},
});

type responseData = {
  status: number;
  data: {
    expiredAt: number;
  };
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [name, setName] = useState("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(
    JSON.parse(
      typeof window !== "undefined"
        ? window.sessionStorage.getItem("isAuthorized") || "false"
        : "false",
    ),
  );

  useEffect(() => {
    let timeOut: ReturnType<typeof setTimeout>;
    const validateToken = async () => {
      try {
        const result = await axios.get<{
          message: string;
          name: string;
          expiredAt: number;
        }>(`${process.env.NEXT_PUBLIC_BE_ORIGIN}/token/validate`, {
          withCredentials: true,
        });

        if (result.status === 200) {
          const expiredAt = (result as unknown as responseData).data.expiredAt;

          setIsAuthorized(true);
          setName(result.data.name || "");
          window.sessionStorage.setItem("isAuthorized", "true");

          timeOut = setTimeout(
            () => {
              validateToken();
            },
            expiredAt * 1000 - Date.now(),
          );
        }
      } catch (err: unknown) {
        console.log("err", err);
        window.sessionStorage.setItem("isAuthorized", "false");
      }
    };

    validateToken();

    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
        name,
        onLogout: () => {
          setIsAuthorized(false);
          window.sessionStorage.setItem("isAuthorized", "false");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
