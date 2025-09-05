"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useAuthStore } from "../store/authStore";
import { FaRocket, FaStar, FaArrowRight } from "react-icons/fa";

const Hero = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="relative min-h-screen flex items-center py-24 px-6 md:px-12 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-300/10 to-purple-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto text-center max-w-5xl relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 rounded-full text-xs sm:text-sm font-medium text-indigo-700 mb-6 sm:mb-8"
        >
          <FaStar className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
          <span>Professional Portfolio Builder</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight mb-4 sm:mb-6"
        >
          <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
            Create Stunning{" "}
          </span>
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Portfolios
          </span>
          <br />
          <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
            Effortlessly
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0"
        >
          Your all-in-one SaaS platform to instantly launch a professional portfolio. 
          Choose from stunning templates, customize colors, and get full control over your content 
          with our intuitive dashboard.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12 px-4 sm:px-0"
        >
          {!isAuthenticated && (
            <Link href="/auth/register">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 w-full sm:w-auto"
              >
                <FaRocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Get Started Free
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
          )}
          <Link href="/templates">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-indigo-200 text-indigo-700 rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl hover:bg-white hover:border-indigo-300 transition-all duration-300 w-full sm:w-auto"
            >
              View Templates
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Features highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto px-4 sm:px-0"
        >
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Easy</div>
            <div className="text-gray-600 text-xs sm:text-sm">Setup Process</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Fast</div>
            <div className="text-gray-600 text-xs sm:text-sm">Performance</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Modern</div>
            <div className="text-gray-600 text-xs sm:text-sm">Templates</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
