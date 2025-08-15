// app/under-construction/page.jsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function UnderConstructionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          🚧 Page Under Construction
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          We’re working hard to bring you something amazing. This page will be
          available soon.
        </p>

        {/* Decorative element */}
        <div className="mt-8 inline-flex px-6 py-3 rounded-full bg-yellow-500 text-gray-900 font-semibold shadow-lg">
          Coming Soon
        </div>

        {/* Home Button */}
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg transition-colors"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}
