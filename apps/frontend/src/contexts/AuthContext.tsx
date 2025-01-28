"use client";

import { createContext, ReactNode } from "react";
import axios from "axios";
import { register } from "module";
import { useRouter } from "next/navigation";

const baseUrl = "http://localhost:4000";

interface AuthContextType {
  login: (credentials: { email: string; password: string }) => Promise<any>;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<object> => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, credentials);
      if (!response.data.token) {
        throw new Error("Token not founded on api response!");
      }

      localStorage.setItem("authentication_app_token", response.data.token);
      router.push("/dashboard");
      console.log("token armazenado: ", response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
}
