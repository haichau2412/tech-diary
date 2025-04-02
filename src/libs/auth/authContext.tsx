"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { User } from "./type";
import { validateToken, handleGoogleLogin, handleLogout } from "../api/auth";

type AuthContext = {
  isAuthorized: boolean | null;
  userInfo: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContext>({
  isAuthorized: null,
  userInfo: null,
  login: async () => {},
  logout: async () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let timeOut: ReturnType<typeof setTimeout>;
    const _validateToken = async () => {
      try {
        const result = await validateToken();

        if (result.message === "succeed") {
          const expiredAt = result.data.expiredAt;
          setIsAuthorized(true);
          timeOut = setTimeout(
            () => {
              _validateToken();
            },
            expiredAt * 1000 - Date.now(),
          );
          return;
        }

        if (result.message === "unauthorized") {
          setIsAuthorized(false);
          setUser(null); // set to guest user
        }
      } catch (err: unknown) {
        console.log("err", err);
      }
    };

    _validateToken();

    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, []);

  const _logout = useCallback(async () => {
    setIsAuthorized(false);
    handleLogout();
  }, []);

  const _login = useCallback(async () => {
    handleGoogleLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
        userInfo: user,
        logout: _logout,
        login: _login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside of a AuthProvider");
  }

  return context;
}
