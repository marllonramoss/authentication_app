"use client";

import { useForm } from "react-hook-form";
import { useAuthContext } from "@/hooks/useAuthContext";
import Link from "next/link";
import {
  IconLockSquareRoundedFilled,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";

type LoginFormProps = {
  setGoogleData(data: object): void;
};

export default function LoginForm({ setGoogleData }: LoginFormProps) {
  const { register, handleSubmit } = useForm();

  const { login } = useAuthContext();

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => setGoogleData(tokenResponse),
  });

  const handleLoginWithGoogle = () => {
    googleLogin();
  };

  async function handleSignIn(data: any) {
    login(data);
    return;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center items-center -mb-2">
          <IconLockSquareRoundedFilled
            size={58}
            className="text-indigo-600"
            stroke={10}
          />
        </div>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <div className="">
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900  "
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                {...register("email")}
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ring-1 ring-gray-400"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="/recovery"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ring-1 ring-gray-400"
              />
            </div>
          </div>

          <div className="flex justify-center items-center flex-col gap-5">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 gap-2"
              onClick={() => handleLoginWithGoogle()}
            >
              <IconBrandGoogle size={24} /> Login with Google
            </button>

            <Link href={"/register"}>
              <span className="text-gray-900 hover:text-gray-600">
                Don't have an account? Create one
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
