"use client";

import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const { user, logout } = useAuthContext();
  const router = useRouter();

  // Verificar se o usuário está logado
  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redireciona para a página de login se não estiver autenticado
    }
  }, [user, router]);

  // Se o usuário não estiver autenticado, a página de dashboard não será renderizada
  if (!user) {
    return null; // Ou você pode retornar um componente de loading enquanto verifica a autenticação
  }

  return (
    <div className="h-screen bg-indigo-600/60 flex justify-center items-center flex-col">
      <span className="text-zinc-50 bg-zinc-950 p-2">Welcome to Dashboard</span>
      <span>{user?.email}</span>
      <button
        className="bg-zinc-950 text-zinc-50 p-2 rounded-xl"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
