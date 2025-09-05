"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "@/store/userStore"; // <-- Zustand store

const Header = () => {
  const { setUser } = useUserStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, checkAuth, setIsAuthenticated } = useAuthStore();

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => setIsMobileMenuOpen(false); // Close menu when clicked

  const handleLogout = async () => {
    try {
      await fetch("https://zonefolio-backend.up.railway.app/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
      setIsMobileMenuOpen(false);
      setUser(null); // Clear user state on logout
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100 z-50">
      <div className="container mx-auto px-6 md:px-8 py-4 flex items-center justify-between font-sans">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-lg">Z</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ZoneFolio
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-8 text-gray-700 font-medium">
            <li>
              <Link
                href="/"
                className="relative py-2 px-1 hover:text-indigo-600 transition-all duration-300 group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            {/* <li>
              <Link
                href="/portfolio"
                className="relative py-2 px-1 hover:text-indigo-600 transition-all duration-300 group"
              >
                Portfolio
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li> */}
            <li>
              <Link
                href="/templates"
                className="relative py-2 px-1 hover:text-indigo-600 transition-all duration-300 group"
              >
                Templates
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href="#pricing"
                className="relative py-2 px-1 hover:text-indigo-600 transition-all duration-300 group"
              >
                Pricing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            {/* <li>
              <Link
                href="/about"
                className="relative py-2 px-1 hover:text-indigo-600 transition-all duration-300 group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li> */}
            {/* <li>
              <Link
                href="/contact"
                className="relative py-2 px-1 hover:text-indigo-600 transition-all duration-300 group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li> */}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {!isAuthenticated ? (
            <>
              <Link href="/auth/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 text-indigo-600 font-semibold border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300"
                >
                  Sign In
                </motion.button>
              </Link>
              <Link href="/auth/register">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                >
                  Get Started
                </motion.button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 text-indigo-600 font-semibold border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300"
                >
                  Dashboard
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="px-6 py-2.5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300"
              >
                Logout
              </motion.button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            ref={menuButtonRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-indigo-600 transition-colors"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/98 backdrop-blur-lg shadow-xl border-t border-gray-100 overflow-hidden"
          >
            <nav className="px-6 py-6">
              <ul className="flex flex-col space-y-1">
                <li>
                  <Link
                    href="/"
                    className="flex items-center px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300"
                    onClick={handleLinkClick}
                  >
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="flex items-center px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300"
                    onClick={handleLinkClick}
                  >
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/templates"
                    className="flex items-center px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300"
                    onClick={handleLinkClick}
                  >
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="flex items-center px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300"
                    onClick={handleLinkClick}
                  >
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="flex items-center px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300"
                    onClick={handleLinkClick}
                  >
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="flex items-center px-4 py-3 text-gray-700 font-medium rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300"
                    onClick={handleLinkClick}
                  >
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    Contact
                  </Link>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200">
                {!isAuthenticated ? (
                  <div className="space-y-3">
                    <Link href="/auth/login" className="block">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLinkClick}
                        className="w-full px-4 py-3 text-indigo-600 font-semibold border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300 text-center"
                      >
                        Sign In
                      </motion.button>
                    </Link>
                    <Link href="/auth/register" className="block">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLinkClick}
                        className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-center"
                      >
                        Get Started
                      </motion.button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link href="/dashboard" className="block">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLinkClick}
                        className="w-full px-4 py-3 text-indigo-600 font-semibold border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300 text-center"
                      >
                        Dashboard
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogout}
                      className="w-full px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 text-center"
                    >
                      Logout
                    </motion.button>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
