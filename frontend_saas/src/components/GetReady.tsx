"use client";

import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useAuthStore } from "../store/authStore";

const CallToAction = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="bg-indigo-50 py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
        >
          Ready to Get Started?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Launch your professional portfolio today in just a few clicks. Choose
          a template, customize your colors, and get full control over your
          content.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {!isAuthenticated ? (
            <Link href="/auth/register">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition">
                Get Started <FaArrowRight className="w-4 h-4" />
              </button>
            </Link>
          ) : (
            <Link href="/templates">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition">
                View Templates <FaArrowRight className="w-4 h-4" />
              </button>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
