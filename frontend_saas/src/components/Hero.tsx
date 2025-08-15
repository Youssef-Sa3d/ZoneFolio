"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useAuthStore } from "../store/authStore";



const Hero = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="min-h-screen flex items-center px-6 md:px-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto text-center max-w-4xl">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 mb-6"
        >
          Create Stunning <span className="text-indigo-600">Portfolios</span>{" "}
          Effortlessly
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
        >
          Zonefolio is your all-in-one SaaS platform to instantly launch a
          professional portfolio. Choose from our stunning templates, customize
          the color palette to match your style, and let us handle deployment.
          Once your site is live, easily manage and update your content through
          your personal dashboard.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          
          {!isAuthenticated && (
            <Link href="/auth/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-indigo-600 text-white rounded-lg text-lg font-semibold shadow-lg hover:bg-indigo-700 transition"
              >
                Get Started
              </motion.button>
            </Link>
          )}
          <Link href="/templates">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg text-lg font-semibold shadow-sm hover:border-gray-400 hover:bg-gray-50 transition"
            >
              View Templates
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
