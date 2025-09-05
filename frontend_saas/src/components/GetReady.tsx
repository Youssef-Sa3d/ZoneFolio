"use client";

import { motion } from "motion/react";
import { FaArrowRight, FaRocket, FaStar } from "react-icons/fa";
import Link from "next/link";
import { useAuthStore } from "../store/authStore";

const CallToAction = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="relative py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-600/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-12 text-center">
        {/* Floating icons */}
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-4 sm:left-10 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center opacity-80"
        >
          <FaStar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [10, -10, 10],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-20 right-4 sm:right-10 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center opacity-80"
        >
          <FaRocket className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight px-4 sm:px-0">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            Launch your professional portfolio today in just a few clicks. Choose
            a template, customize your colors, and get full control over your
            content.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-0"
        >
          {!isAuthenticated ? (
            <>
              <Link href="/auth/register">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-base sm:text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  <FaRocket className="w-4 h-4 sm:w-5 sm:h-5" />
                  Get Started Free
                  <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </Link>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="text-blue-200 text-xs sm:text-sm"
              >
                No credit card required
              </motion.div>
            </>
          ) : (
            <>
              <Link href="/templates">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-base sm:text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  <FaStar className="w-4 h-4 sm:w-5 sm:h-5" />
                  View Templates
                  <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </Link>
              <Link href="/dashboard">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-sm sm:text-base rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  Go to Dashboard
                </motion.button>
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
