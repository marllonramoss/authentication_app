"use client";

import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const { user } = useAuthContext();
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
    <div>
      <span>Dashboard</span>
      <span>{user?.email}</span>
    </div>
  );
};

export default Dashboard;
