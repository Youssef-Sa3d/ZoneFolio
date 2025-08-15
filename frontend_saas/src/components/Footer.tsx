"use client";

import { FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { motion } from "motion/react";

const Footer = () => {
  const socialLinks = [
    // Future social links can be added here
    // { icon: <FaTwitter size={20} />, href: "https://twitter.com" },
    // { icon: <FaLinkedinIn size={20} />, href: "https://linkedin.com" },
    // { icon: <FaGithub size={20} />, href: "https://github.com" },
  ];

  const links = [
    {
      title: "Product",
      items: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#pricing" },
        { name: "Templates", href: "#" },
        { name: "Dashboard", href: "#" },
      ],
    },
    {
      title: "Resources",
      items: [
        { name: "Terms", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-2xl font-bold text-indigo-600"
            >
              Zonefolio
            </motion.h2>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed max-w-xs">
              Effortless, customizable portfolios with instant deployment and
              full data access.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {/* {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                >
                  {social.icon}
                </a>
              ))} */}
            </div>
          </div>

          {/* Links */}
          {links.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-600 hover:text-indigo-600 transition"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Zonefolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
