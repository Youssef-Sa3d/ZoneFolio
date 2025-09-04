"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore"; // <-- Zustand store


const verificationSchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().min(6).max(6),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

export default function VerificationPageClient() {
  const { setUser } = useUserStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      email: emailParam || "",
    },
  });

  useEffect(() => {
    if (emailParam) setValue("email", emailParam);
  }, [emailParam, setValue]);

  const mutation = useMutation({
    mutationFn: async (data: VerificationFormData) => {
      const res = await axios.post(
        "https://zonefolio-backend.up.railway.app/auth/verify",
        { email: data.email, code: data.code },
        { withCredentials: true }
      );
      setUser(res.data.user); // Update global user state
      return res.data;
    },
    onSuccess: () => router.push("/"),
    onError: (error: unknown) => {
      alert(
        (error as { response?: { data?: { error?: string } } }).response?.data
          ?.error || "Verification failed. Please try again."
      );
    },
  });

  const resendMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await axios.post(
        "https://zonefolio-backend.up.railway.app/auth/resend-verification",
        { email },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => alert("New verification code sent!"),
    onError: () => alert("Failed to resend verification code."),
  });

  const onSubmit = (data: VerificationFormData) => mutation.mutate(data);
  const handleResend = () => emailParam && resendMutation.mutate(emailParam);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 sm:px-6 lg:px-8 relative">
      <Link
        href="/"
        className="absolute top-6 left-4 sm:left-6 text-sm font-medium text-indigo-600 hover:underline"
      >
        ← Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg"
      >
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            We&apos;ve sent a verification code to your email
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-5"
        >
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="you@example.com"
              readOnly={!!emailParam}
            />
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Code */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-gray-700 font-medium">
                Verification Code
              </label>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendMutation.isPending}
                className="text-sm font-medium text-indigo-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendMutation.isPending ? "Sending..." : "Resend Code"}
              </button>
            </div>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              {...register("code")}
              className={`w-full border ${
                errors.code ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Enter 6-digit code"
            />
            {errors.code && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.code.message}
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2.5 sm:py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition text-sm sm:text-base"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Verifying..." : "Verify Account"}
          </motion.button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Need to change your email?{" "}
          <Link
            href="/auth/register"
            className="text-indigo-600 hover:underline"
          >
            Register again
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
