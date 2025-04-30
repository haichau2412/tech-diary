"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updatePassword } from "@/app/actions/utube/actions";

type FormData = {
  password: string;
  confirmPassword: string;
};

function UpdatePasswordPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { error } = await updatePassword(data.password);

    if (error) {
      setError("errorr");
    } else {
      setSuccess(true);
      // Optional: Redirect after a small delay
      setTimeout(() => {
        router.push("/worknest/utube-note/account");
      }, 1500);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-6 text-2xl font-bold">Update Password</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col gap-4"
      >
        <input
          type="password"
          placeholder="New Password"
          {...register("password", { required: true })}
          className="rounded border p-2"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          {...register("confirmPassword", { required: true })}
          className="rounded border p-2"
        />

        <button
          type="submit"
          className="rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
        >
          Update Password
        </button>

        {error && <p className="text-red-500">{error}</p>}
        {success && (
          <p className="text-green-500">Password updated successfully!</p>
        )}
      </form>
    </div>
  );
}

export default UpdatePasswordPage;
