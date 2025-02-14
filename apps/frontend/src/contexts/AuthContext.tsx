"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  loginOutDTO,
  registerInDTO,
  registerOutDTO,
} from "@authentication/core";
import cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Sankofa_Display } from "next/font/google";
import { addAbortSignal } from "stream";

const baseUrl = "http://localhost:4000";

interface AuthContextType {
  user: session["user"];
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<any>;
  register: (data: registerIn) => Promise<registerOutDTO | object>;
  recovery: (data: { email: string }) => Promise<void>;
  change_password: (token: string, newPassword: string) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => void;
}

type payloadProps = {
  exp: Date;
  iat: Date;
  id: string;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

type session = {
  token: string | null;
  user: {
    email: string;
    createdAt: Date;
  } | null;
};

type registerIn = {
  email: string;
  password: string;
  confirm_password: string;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const cookieName = "authentication_app_token";

  const obterSessao = (): session => {
    const token = cookie.get(cookieName);
    if (!token) return { token: null, user: null };

    try {
      const payload: any = jwtDecode(token);
      const valido = payload.exp && payload.exp > Date.now() / 1000;
      if (!valido) {
        cookie.remove(cookieName);
        return { token: null, user: null };
      }

      return {
        token,
        user: {
          email: payload.email ?? "Desconhecido",
          createdAt: payload.createdAt ?? new Date(),
        },
      };
    } catch (error) {
      console.error("Erro ao decodificar JWT:", error);
      return { token: null, user: null };
    }
  };

  const [sessao, setSessao] = useState<session>({ token: null, user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const atualizarSessao = () => {
      setLoading(true);
      setSessao(obterSessao());
      setLoading(false);
    };

    atualizarSessao();
    window.addEventListener("storage", atualizarSessao);

    return () => {
      window.removeEventListener("storage", atualizarSessao);
    };
  }, []);

  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<object> => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, credentials);

      // Verifica se o token está presente na resposta
      if (!response.data.token) throw new Error("Token not found!");

      // Armazena o token em cookies
      cookie.set(cookieName, response.data.token, { expires: 7 });
      setSessao(obterSessao());
      router.push("/dashboard");

      return response.data;
    } catch (error) {
      // Captura o erro e exibe a mensagem apropriada
      if (axios.isAxiosError(error) && error.response) {
        // Verifica se a resposta contém uma mensagem de erro
        alert(error.response.data.message || "Error on login."); // Exibe a mensagem de erro ao usuário
      } else {
        alert("Ocorreu um erro inesperado. Por favor, tente novamente."); // Mensagem genérica
      }

      return {
        statusCode: 400,
        message: "Credentials invalid",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    data: registerIn
  ): Promise<registerOutDTO | object> => {
    console.log("register context started");

    setLoading(true);

    const passwordsOk = data.confirm_password === data.password;

    if (!passwordsOk) {
      setLoading(false);
      alert("Password and Confirm Password needs to be equal!");
      return {
        message: "MESSAGE ERRO RETURNS",
      };
    }

    try {
      console.log(data);

      const response = await axios.post(`${baseUrl}/auth/register`, data);
      if (response.data.statusCode === 201) {
        await login(data);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        alert(error.response?.data.message || "Error on Register");
      }

      return {
        statusCode: 400,
        message: "Credentials invalid",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    cookie.remove(cookieName);
    setSessao({ token: null, user: null });
    router.push("/login");
    setLoading(false);
  };

  const recovery = async (data: { email: string }) => {
    try {
      console.log("start recovey context");

      const response = await axios.post(`${baseUrl}/auth/recovery`, {
        email: data.email,
      });

      alert(
        `If email ${data.email} is a valid email, we was sended a recovery mail!`
      );
    } catch (error) {
      alert(
        `If email ${data.email} is a valid email, we was sended a recovery mail!`
      );
    }
  };

  const change_password = async (token: string, newPassword: string) => {
    console.log("START CHANGE PASSORD METHOT OF CONTEXT");

    const payload: payloadProps = await jwtDecode(token);
    console.log("ante sdo payloay");

    const currentTime = Math.floor(Date.now() / 1000); // Obtém o tempo atual em segundos

    const isTokenValid = +payload.exp > currentTime;

    if (!isTokenValid) {
      console.log("Token invalid - Data expired");

      throw new Error("Token invalid - Data expired");
    }

    console.log(payload.id);

    const id = payload.id;

    const correctData = {
      id,
      newPassword,
    };

    console.log("LOG DO DATA DO CONTEXT");
    console.log(correctData);

    if (payload) {
      try {
        const response = await axios.post(
          `${baseUrl}/auth/change-password`,
          correctData
        );
        router.push("/login");
      } catch (error) {}
    }
  };

  const loginWithGoogle = () => {
    window.location.href = `${baseUrl}/auth/google`;
  };

  return (
    <AuthContext.Provider
      value={{
        user: sessao.user,
        loading,
        login,
        register,
        logout,
        recovery,
        change_password,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
