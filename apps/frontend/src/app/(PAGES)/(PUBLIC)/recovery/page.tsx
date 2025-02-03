"use client";

import LoadingScreen from "@/components/shared/LoadingScreen";
import RecoveryForm from "@/components/tailwind/RecoveryForm";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Recovery = () => {
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
      <RecoveryForm />
    </div>
  );
};

export default Recovery;
