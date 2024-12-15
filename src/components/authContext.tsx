"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";

type AuthContext = {
  isAuthorized: boolean;
  onLogout: () => void;
};

export const AuthContext = createContext<AuthContext>({
  isAuthorized: false,
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
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BE_ORIGIN}/token/validate`,
        {
          withCredentials: true,
        },
      );

      console.log("result", result);

      if (result.status === 200) {
        const expiredAt = (result as unknown as responseData).data.expiredAt;

        setIsAuthorized(true);

        console.log(
          "expiredAt * 1000 - Date.now()",
          expiredAt * 1000 - Date.now(),
        );

        timeOut = setTimeout(
          () => {
            console.log("revalidate");
            validateToken();
          },
          expiredAt * 1000 - Date.now(),
        );
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
        onLogout: () => {
          setIsAuthorized(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
