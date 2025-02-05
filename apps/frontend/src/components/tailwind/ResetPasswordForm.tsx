"use client";

import { useForm } from "react-hook-form";
import { useAuthContext } from "@/hooks/useAuthContext";
import { IconLockSquareRoundedFilled } from "@tabler/icons-react";

type ResetPasswordFormProps = {
  token: string;
};

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const { register, handleSubmit } = useForm();

  const { change_password } = useAuthContext();

  async function handleChange_Password(data: any) {
    change_password(token, data.password);
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
          Create a new password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={handleSubmit(handleChange_Password)}
        >
          <div className="">
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900  "
            >
              Password
            </label>
            <div className="mt-2">
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ring-1 ring-gray-400"
              />
            </div>
          </div>
          <div className="">
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900  "
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                // {...register("password")}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ring-1 ring-gray-400"
              />
            </div>
          </div>

          <div className="flex justify-center items-center flex-col gap-5">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
