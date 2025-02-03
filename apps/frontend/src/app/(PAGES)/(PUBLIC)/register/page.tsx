"use client";

import LoadingScreen from "@/components/shared/LoadingScreen";
import RegisterForm from "@/components/tailwind/RegisterForm";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Register = () => {
  const auth = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (auth.user) {
      router.push("/dashboard");
    }
  }, [auth.user]);

  if (auth?.loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-white">
      <RegisterForm />
    </div>
  );
};

export default Register;
