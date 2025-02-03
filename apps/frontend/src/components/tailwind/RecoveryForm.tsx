"use client";

import { useForm } from "react-hook-form";
import { useAuthContext } from "@/hooks/useAuthContext";
import Link from "next/link";
import {
  IconLockSquareRoundedFilled,
  IconCircleArrowLeftFilled,
} from "@tabler/icons-react";

export default function RecoveryForm() {
  const { register, handleSubmit } = useForm();

  const { login } = useAuthContext();

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
          Send Recovery Email
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

          <div className="flex justify-center items-center flex-col gap-5">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send recovery email
            </button>

            <Link href={"/login"}>
              <span className="text-gray-900 hover:text-gray-600 flex gap-2">
                <IconCircleArrowLeftFilled />
                Go back to Login
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
