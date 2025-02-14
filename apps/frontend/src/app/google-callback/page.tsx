// app/google-callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Importe useSearchParams

const GoogleCallback = () => {
  const router = useRouter(); // Use useRouter para redirecionar
  const searchParams = useSearchParams(); // Use useSearchParams para acessar os parâmetros da URL

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Pega o código da URL
        const code = searchParams.get("code"); // Use searchParams.get('code')

        if (code) {
          // Faz uma requisição para o backend para trocar o código pelo token
          const response = await fetch(
            `http://localhost:4000/auth/google/callback?code=${code}`
          );
          const data = await response.json();

          // Armazena o token
          localStorage.setItem("token", data.token);

          // Redireciona para o dashboard
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Erro ao obter o token:", error);
        router.push("/login");
      }
    };

    fetchToken();
  }, [router, searchParams]);

  return (
    <div>
      <h1>Autenticando...</h1>
    </div>
  );
};

export default GoogleCallback;
