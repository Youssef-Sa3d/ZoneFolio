"use client";

import { FaTwitter, FaLinkedinIn, FaGithub, FaHeart, FaRocket } from "react-icons/fa";
import { motion } from "motion/react";

const Footer = () => {
  const socialLinks = [
    { icon: <FaTwitter size={20} />, href: "#", label: "Twitter" },
    { icon: <FaLinkedinIn size={20} />, href: "#", label: "LinkedIn" },
    { icon: <FaGithub size={20} />, href: "#", label: "GitHub" },
  ];

  const links = [
    {
      title: "Product",
      items: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Templates", href: "/templates" },
        { name: "Dashboard", href: "/dashboard" },
      ],
    },
    {
      title: "Company",
      items: [
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Resources",
      items: [
        { name: "Help Center", href: "/help" },
        { name: "Terms", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Status", href: "/status" },
      ],
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Z</span>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                  Zonefolio
                </h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-8">
                Effortless, customizable portfolios with instant deployment and
                full data access. Build your professional presence in minutes.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <div className="text-white group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {links.map((section, sectionIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIdx * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/20 mt-12 sm:mt-16 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-0"
        >
          <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base text-center sm:text-left">
            <span>© {new Date().getFullYear()} Zonefolio. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
            <FaRocket className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Powered by modern web technologies</span>
            <span className="sm:hidden">Built with ❤️</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
