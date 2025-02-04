"use client";

import ResetPasswordForm from "@/components/tailwind/ResetPasswordForm";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string>("");

  const { change_password } = useAuthContext();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token"); // Obtém o valor do parâmetro "token"
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      console.log("Token capturado:", tokenFromUrl);
      change_password(tokenFromUrl);
    } else {
      console.error("Token não encontrado na URL");
    }
  }, [searchParams]);

  return (
    <div className="w-full h-screen bg-white">
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
