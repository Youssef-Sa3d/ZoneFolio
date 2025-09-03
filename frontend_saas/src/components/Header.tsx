"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuthStore } from "../store/authStore";
import { s } from "motion/react-client";

const Header = () => {
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
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-md shadow-md z-50">
      <nav className="container mx-auto px-6 md:px-4 py-4 flex items-center justify-between font-sans">
        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold text-indigo-600">
          ZoneFolio
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 text-gray-700 font-medium">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <Link
            href="#features"
            className="hover:text-indigo-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="hover:text-indigo-600 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#contact"
            className="hover:text-indigo-600 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link href="/auth/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-all rounded-md"
                >
                  Login
                </motion.button>
              </Link>
              <Link href="/auth/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
                >
                  Get Started
                </motion.button>
              </Link>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
            >
              Logout
            </motion.button>
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
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-3 text-gray-700 font-medium">
              <Link
                href="/"
                className="hover:text-indigo-600 transition-colors"
                onClick={handleLinkClick}
              >
                Home
              </Link>
              <Link
                href="#features"
                className="hover:text-indigo-600 transition-colors"
                onClick={handleLinkClick}
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="hover:text-indigo-600 transition-colors"
                onClick={handleLinkClick}
              >
                Pricing
              </Link>
              <Link
                href="#contact"
                className="hover:text-indigo-600 transition-colors"
                onClick={handleLinkClick}
              >
                Contact
              </Link>

              {!isAuthenticated ? (
                <>
                  <Link href="/auth/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLinkClick}
                      className="px-5 py-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-all rounded-md text-left"
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link href="/auth/register">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLinkClick}
                      className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all text-left"
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all text-left"
                >
                  Logout
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
