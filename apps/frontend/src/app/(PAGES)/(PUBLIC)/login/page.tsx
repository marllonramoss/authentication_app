"use client";

import LoadingScreen from "@/components/shared/LoadingScreen";
import LoginForm from "@/components/tailwind/LoginForm";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {
  const auth = useAuthContext();
  const router = useRouter();

  const [googleData, setGoogleData] = useState<Object | null>(null);

  useEffect(() => {
    if (googleData !== null) {
      console.log(googleData);

      // router.push("/passou");
    }
  }, [googleData]);

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
      <LoginForm setGoogleData={setGoogleData} />
    </div>
  );
};

export default Login;
