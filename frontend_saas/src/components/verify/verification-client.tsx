"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
import { FaEnvelope, FaShieldAlt, FaArrowLeft } from "react-icons/fa";
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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-4 sm:left-6 z-10"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 font-medium rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 border border-white/60"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/60"
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg mb-6"
            >
              <FaEnvelope className="h-10 w-10 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3"
            >
              Verify Your Email
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-gray-600 text-base leading-relaxed"
            >
              We&apos;ve sent a verification code to your email address
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full border-2 ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  } rounded-xl px-4 py-3 text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-gray-50/50`}
                  placeholder="you@example.com"
                  readOnly={!!emailParam}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span>⚠️</span> {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Code */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 font-semibold">
                  Verification Code
                </label>
                <motion.button
                  type="button"
                  onClick={handleResend}
                  disabled={resendMutation.isPending}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {resendMutation.isPending ? "Sending..." : "Resend Code"}
                </motion.button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  {...register("code")}
                  className={`w-full border-2 ${
                    errors.code ? "border-red-400" : "border-gray-200"
                  } rounded-xl px-4 py-3 text-base focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-gray-50/50 text-center tracking-widest font-mono`}
                  placeholder="000000"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <FaShieldAlt className="w-5 h-5 text-gray-400" />
                </div>
                {errors.code && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <span>⚠️</span> {errors.code.message}
                  </p>
                )}
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FaShieldAlt className="w-5 h-5" />
                  Verify Account
                </span>
              )}
            </motion.button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 text-center text-gray-600"
          >
            Need to change your email?{" "}
            <Link
              href="/auth/register"
              className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Register again
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
