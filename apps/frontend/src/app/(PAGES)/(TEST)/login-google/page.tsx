"use client";
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

const page = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div>
        <button
          className="bg-orange-400 flex p-2 rounded-full"
          onClick={() => login()}
        >
          Google Login
        </button>
      </div>
    </div>
  );
};

export default page;
